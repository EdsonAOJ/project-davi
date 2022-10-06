
import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api/api'
import { Context } from './authContext';


const Contexts = createContext()

function ProductsProvider({ children }) {
  const { user } = useContext(Context)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [productsAux, setProductsAux] = useState([])

  const handleGetAllProducts = async () => {
    setLoading(true)
    try {
      const response = await api.get(`products/user/${user.id}`)
      setProducts(response.data.data)
      setProductsAux(response.data.data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }



  useEffect(() => {
    handleGetAllProducts()
  }, [user])



  return (
    <Contexts.Provider value={{ products, loading, setProducts, setProductsAux, productsAux, handleGetAllProducts }}>
      {children}
    </Contexts.Provider>
  )
}

export { Contexts, ProductsProvider }

