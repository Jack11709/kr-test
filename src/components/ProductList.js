import { Link } from 'react-router-dom'
import styled from 'styled-components'

function ProductList({ products }) {
  return (
    <section data-testid="product-list">
      {products.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <ProductCard accentColor={product.accentColor}>
            <ProductCardImageContainer>
              <img src={product.image2} alt={product.title} loading="lazy" />
            </ProductCardImageContainer>
            <ProductInfoContainer>
              <ProductTitle>
                {product.title} {product.ukOnly ? '🇬🇧' : '🌎'}
              </ProductTitle>
              <ProductSubTitle
                titleColor={product.accentColor}
                data-testid="product-name">
                {product.binomialName}
              </ProductSubTitle>
              <ProductDescription>
                {product.description.substring(0, 200) + '...'}
              </ProductDescription>
              <ProductPrice
                price={product.price}
                accentColor={product.accentColor}>
                {product.price
                  ? `£${product.price}`
                  : 'Not Currently Available'}
              </ProductPrice>
            </ProductInfoContainer>
          </ProductCard>
        </Link>
      ))}
    </section>
  )
}

export default ProductList

const ProductCard = styled.div`
  border: solid 1px darkgray;
  margin: 20px 0;
  display: flex;
  height: 300px;
  position: relative;
  p {
    font-size: 14px;
  }
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 30px 30px 0;
    border-color: ${(props) =>
      `transparent ${props.accentColor} transparent transparent`};
    right: 0;
    top: 0;
    position: absolute;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    height: 100%;
  }
`

const ProductTitle = styled.h2`
  margin-bottom: 0;
`

const ProductCardImageContainer = styled.div`
  height: 100%;
  flex: 1;
  img {
    width: 100%;
    height: 100%;
  }
`

const ProductInfoContainer = styled.div`
  flex: 2;
  padding: 15px 25px;
`

const ProductSubTitle = styled.p`
  font-style: italic;
  color: ${(props) => props.titleColor};
`

const ProductDescription = styled.p`
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ProductPrice = styled.p`
  display: inline-block;
  color: ${(props) => (props.price ? 'inherit' : 'gray')};
  line-height: 1.8;
  border-bottom: 1px solid
    ${(props) => (props.price ? props.accentColor : 'gray')};
`
