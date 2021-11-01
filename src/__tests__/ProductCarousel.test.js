import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import { CarouselProvider } from '../hooks/useCarousel'
import { testProducts } from './Products.test'

test('Should render carousel with first product selected', () => {
  const firstProduct = testProducts[0]
  render(
    <Router>
      <CarouselProvider>
        <ProductCarousel products={testProducts} />
      </CarouselProvider>
    </Router>,
  )

  expect(screen.getByText(firstProduct.title)).toBeInTheDocument()
})

test('should cycle through products when clicking next and previous buttons', () => {
  const [firstProduct, secondProduct] = testProducts
  render(
    <Router>
      <CarouselProvider>
        <ProductCarousel products={[firstProduct, secondProduct]} />
      </CarouselProvider>
    </Router>,
  )

  const nextBtn = screen.getByTestId('carousel-next')
  const prevBtn = screen.getByTestId('carousel-prev')

  userEvent.click(nextBtn)
  expect(screen.getByText(secondProduct.title)).toBeInTheDocument()
  userEvent.click(nextBtn)
  expect(screen.getByText(firstProduct.title)).toBeInTheDocument()
  userEvent.click(prevBtn)
  expect(screen.getByText(secondProduct.title)).toBeInTheDocument()
  userEvent.click(prevBtn)
  expect(screen.getByText(firstProduct.title)).toBeInTheDocument()
})
