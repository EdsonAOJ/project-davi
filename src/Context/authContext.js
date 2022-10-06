
import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api/api'
import history from '../services/history'



const Context = createContext()

function AuthProvider({ children }) {


  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const [loadingButton, setLoadingButton] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')



    if (token) {

      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
      setUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])


  const handleLogin = async (users) => {

    setLoadingButton(true)
    // const { data: { token, user } } = await api.post('/user/login', users)

    try {
      const reponse = await api.post('/login', users)

      console.log(reponse)
      const user = reponse.data.user
      const token = reponse.data.token

      if (!token) {
        return setLoadingButton(false)
      }

      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user', JSON.stringify(user))


      api.defaults.headers.Authorization = `Bearer ${token}`
      setLoadingButton(false)

      setAuthenticated(true)
      history.push('/usuarios')
      return true
    } catch (err) {

      setLoadingButton(false)
      return false
    }


  }



  if (loading) {
    return <h1>loading</h1>
  }

  const handleLogOut = () => {
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    history.push('/')

  }



  return (
    <Context.Provider value={{ authenticated, handleLogin, user, setUser, loadingButton, handleLogOut }}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider }

