import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { render, screen, waitFor } from '@testing-library/react'
import Products from '../components/Products'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { CarouselProvider } from '../hooks/useCarousel'
import userEvent from '@testing-library/user-event'

export const testProducts = [
  {
    id: 1,
    title: 'testName',
    binomialName: 'testBinomialName',
    order: 3,
    description: 'test description',
    price: 1.99,
    backgroundColor: '#ffffff',
    accentColor: '#ffffff',
    textColor: '#ffffff',
    ukOnly: true,
    image1: 'image1Url',
    image2: 'image2Url',
  },
  {
    id: 2,
    title: 'testName2',
    binomialName: 'testBinomialName2',
    order: 2,
    description: 'test description2',
    price: 1.99,
    backgroundColor: '#ffffff',
    accentColor: '#ffffff',
    textColor: '#ffffff',
    ukOnly: false,
    image1: 'image1Url',
    image2: 'image2Url',
  },
]

const server = setupServer(
  rest.get('https://demo1087320.mockable.io/products', (_req, res, ctx) => {
    return res(ctx.json(testProducts))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const Wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <Router>
      <CarouselProvider>{children}</CarouselProvider>
    </Router>
  </QueryClientProvider>
)

test('Should render loading state initally then the product list and renders all products', async () => {
  render(<Products />, { wrapper: Wrapper })

  const loadingIndicator = screen.getByTestId('loading')
  expect(loadingIndicator).toBeInTheDocument()

  await waitFor(() => screen.getByTestId('product-list'))

  testProducts.forEach((product) => {
    expect(screen.getByText(product.binomialName)).toBeInTheDocument()
  })
})

test('Should render products sorted by the "order" property', async () => {
  const expectedOrder = testProducts
    .map((product) => ({ ...product }))
    .sort((a, b) => {
      return a.order - b.order
    })
    .map((product) => product.binomialName)

  render(<Products />, { wrapper: Wrapper })

  await waitFor(() => screen.getByTestId('product-list'))

  const elements = screen.getAllByTestId('product-name')
  const actualOrder = elements.map((element) => element.textContent)

  expect(expectedOrder).toEqual(actualOrder)
})

test('Should initially use the list view, and on clicking, switch to carousel view', async () => {
  render(<Products />, { wrapper: Wrapper })

  await waitFor(() => screen.getByTestId('product-list'))

  const toggleBtn = screen.getByTestId('view-toggle-btn')
  expect(toggleBtn).toHaveTextContent('Carousel View')

  userEvent.click(toggleBtn)
  expect(toggleBtn).toHaveTextContent('List View')
  expect(screen.getByTestId('product-carousel')).toBeInTheDocument()

  userEvent.click(toggleBtn)
  expect(toggleBtn).toHaveTextContent('Carousel View')
  expect(screen.getByTestId('product-list')).toBeInTheDocument()
})

test('Should render the error message on network error', async () => {
  server.use(
    rest.get('https://demo1087320.mockable.io/products', (_req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  // Turning off the react query error logging for testing failing requests, by passing it a no-op, otherwise it appears in the test output
  setLogger({
    log: console.log,
    warn: console.log,
    error: () => {},
  })

  render(<Products />, { wrapper: Wrapper })

  await waitFor(() => screen.getByTestId('error-message'))

  expect(
    screen.getByText('Please refresh the page, or try again later'),
  ).toBeInTheDocument()
})
