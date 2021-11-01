import React from 'react'

const CarouselContext = React.createContext(null)

export function CarouselProvider({ children }) {
  const [isActive, setIsActive] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const toggleIsActive = React.useCallback(() => {
    setIsActive((isActive) => !isActive)
  }, [])

  const handlePrevious = React.useCallback((length) => {
    setCurrentIndex((currentIndex) => {
      return currentIndex === 0 ? length - 1 : currentIndex - 1
    })
  }, [])

  const handleNext = React.useCallback((length) => {
    setCurrentIndex((currentIndex) => {
      return currentIndex === length - 1 ? 0 : currentIndex + 1
    })
  }, [])

  return (
    <CarouselContext.Provider
      value={{
        isActive,
        currentIndex,
        toggleIsActive,
        handlePrevious,
        handleNext,
      }}>
      {children}
    </CarouselContext.Provider>
  )
}

export function useCarousel() {
  const ctx = React.useContext(CarouselContext)

  if (!ctx) {
    throw new Error('Must be used withing Carousel Provider')
  }

  return ctx
}
