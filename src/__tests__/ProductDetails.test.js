import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { render, screen, waitFor } from '@testing-library/react'
import ProductDetails from '../components/ProductDetails'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const testProduct = {
  id: 1,
  title: 'testName',
  binomialName: 'testBinomialName',
  order: 1,
  description: 'test description',
  price: 1.99,
  backgroundColor: '#ffffff',
  accentColor: '#ffffff',
  textColor: '#ffffff',
  ukOnly: true,
  image1: 'image1Url',
  image2: 'image2Url',
}

/*
TODO  Had issues mocking "useParams" from react-router-dom,
tried a few things with jest.mock but not solved yet,
need to fix and update this to not have url undefined
*/

const server = setupServer(
  rest.get(
    'https://demo1087320.mockable.io/products/undefined',
    (_req, res, ctx) => {
      return res(ctx.json(testProduct))
    },
  ),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const Wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <Router>{children}</Router>
  </QueryClientProvider>
)

test('Should render loading state initally then the returned product details', async () => {
  render(<ProductDetails />, { wrapper: Wrapper })

  const loadingIndicator = screen.getByTestId('loading')
  expect(loadingIndicator).toBeInTheDocument()

  await waitFor(() => screen.getByTestId('product-detail'))

  expect(screen.getByText(testProduct.binomialName)).toBeInTheDocument()
})

test('Should render the error message on network error', async () => {
  server.use(
    rest.get(
      'https://demo1087320.mockable.io/products/undefined',
      (_req, res, ctx) => {
        return res(ctx.status(500))
      },
    ),
  )

  setLogger({
    log: console.log,
    warn: console.log,
    error: () => {},
  })

  render(<ProductDetails />, { wrapper: Wrapper })

  await waitFor(() => screen.getByTestId('error-message'))

  expect(
    screen.getByText('Please refresh the page, or try again later'),
  ).toBeInTheDocument()
})
