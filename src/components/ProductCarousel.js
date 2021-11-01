import { Link } from 'react-router-dom'
import { useCarousel } from '../hooks/useCarousel'
import styled from 'styled-components'

function ProductCarousel({ products }) {
  const { currentIndex, handlePrevious, handleNext } = useCarousel()
  const currentProduct = products[currentIndex]
  return (
    <section data-testid="product-carousel">
      <Link to={`/products/${currentProduct.id}`}>
        <CarouselContainer>
          <CarouselTitle
            bgColor={currentProduct.backgroundColor}
            textColor={currentProduct.textColor}>
            {currentProduct.title}
          </CarouselTitle>
          <CarouselImageContainer accentColor={currentProduct.accentColor}>
            <img src={currentProduct.image1} alt={currentProduct.title} />
            <img src={currentProduct.image2} alt={currentProduct.title} />
          </CarouselImageContainer>
          <CarouselContent>
            <p>{currentProduct.description.substring(0, 200) + '...'}</p>
          </CarouselContent>
        </CarouselContainer>
      </Link>
      <CarouselButton
        data-testid="carousel-prev"
        onClick={() => handlePrevious(products.length)}>
        Previous
      </CarouselButton>
      <CarouselButton
        data-testid="carousel-next"
        onClick={() => handleNext(products.length)}>
        Next
      </CarouselButton>
    </section>
  )
}

export default ProductCarousel

const CarouselContainer = styled.div`
  padding: 20px 0;
`

const CarouselImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  position: relative;
  img {
    object-fit: cover;
    width: 50%;
    height: auto;
  }
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 30px 30px 0;
    border-color: ${(props) =>
      `transparent transparent ${props.accentColor} transparent`};
    left: 0;
    bottom: 0;
    position: absolute;
  }
  &::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 30px 30px;
    border-color: ${(props) =>
      `transparent transparent ${props.accentColor} transparent`};
    right: 0;
    bottom: 0;
    position: absolute;
  }
  @media (max-width: 768px) {
    img:first-of-type {
      display: none;
    }
    img {
      width: 100%;
    }
  }
`
const CarouselTitle = styled.h2`
  text-align: center;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  margin: 0;
  padding: 10px;
`

const CarouselContent = styled.div`
  font-size: 14px;
`

const CarouselButton = styled.button`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid grey;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`
