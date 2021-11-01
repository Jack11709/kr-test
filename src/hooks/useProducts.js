import axios from 'axios'
import { useQuery } from 'react-query'
import { baseUrl } from '../config'

export function useProducts() {
  return useQuery(
    'products',
    () => axios.get(`${baseUrl}/products`).then((res) => res.data),
    {
      select: (products) => {
        return products.sort((a, b) => a.order - b.order)
      },
      retry: false,
    },
  )
}

export function useProduct(productId) {
  return useQuery(
    ['product', productId],
    () => axios.get(`${baseUrl}/products/${productId}`).then((res) => res.data),
    {
      retry: false,
    },
  )
}
