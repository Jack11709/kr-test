import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useProduct } from '../hooks/useProducts'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { ProductPrice } from './ProductList'

function ProductDetails() {
  const { productId } = useParams()
  const { data: product, isLoading, isError } = useProduct(productId)
  useDocumentTitle(product?.title ? `Seeds - ${product.title}` : '', 'Seeds')

  return (
    <main>
      {isLoading && <Loading />}
      {isError && <ErrorMessage />}
      {product && (
        <div data-testid="product-detail">
          <ProductDetailsHeader>
            <ProductDetailsImage>
              <img src={product.image1} alt={product.title} />
            </ProductDetailsImage>
            <ProductDetailsTitle
              bgColor={product.backgroundColor}
              textColor={product.textColor}>
              <h2>
                {product.title} {product.ukOnly ? '🇬🇧' : '🌎'}
              </h2>
              <h3>{product.binomialName}</h3>
              <ProductPrice
                price={product.price}
                accentColor={product.accentColor}>
                {product.price
                  ? `£${product.price}`
                  : 'Not Currently Available'}
              </ProductPrice>
            </ProductDetailsTitle>
          </ProductDetailsHeader>
          <ProductDetailsInfo>
            <p>{product.description}</p>
          </ProductDetailsInfo>
        </div>
      )}
    </main>
  )
}

export default ProductDetails

const ProductDetailsHeader = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ProductDetailsImage = styled.div`
  flex: 1;
  img {
    width: 100%;
    vertical-align: bottom;
    object-fit: cover;
    height: 400px;
  }
`

const ProductDetailsTitle = styled.div`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  flex: 1;
  padding: 10px;
  h3 {
    font-style: italic;
  }
`

const ProductDetailsInfo = styled.div`
  padding: 10px;
  p {
    line-height: 1.5;
  }
`
