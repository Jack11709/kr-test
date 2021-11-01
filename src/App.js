import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CarouselProvider } from './hooks/useCarousel'
import GlobalCss from './styles/global'
import ProductDetails from './components/ProductDetails'
import Products from './components/Products'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalCss />
      <CarouselProvider>
        <Router>
          <Switch>
            <Route path="/products/:productId">
              <ProductDetails />
            </Route>
            <Route path="/">
              <Products />
            </Route>
          </Switch>
        </Router>
      </CarouselProvider>
    </QueryClientProvider>
  )
}

export default App
