import { useProducts } from '../hooks/useProducts'
import { useCarousel } from '../hooks/useCarousel'
import ProductCarousel from './ProductCarousel'
import ProductList from './ProductList'
import Loading from './Loading'
import ViewToggleButton from './ViewToggleButton'
import ErrorMessage from './ErrorMessage'

function Products() {
  const { isActive, toggleIsActive } = useCarousel()
  const { data: products, isLoading, isError } = useProducts()

  return (
    <main data-testid="products">
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      {products && (
        <>
          <ViewToggleButton onClick={toggleIsActive}>
            {isActive ? 'List View' : 'Carousel View'}
          </ViewToggleButton>
          {isActive ? (
            <ProductCarousel products={products} />
          ) : (
            <ProductList products={products} />
          )}
        </>
      )}
    </main>
  )
}

export default Products
