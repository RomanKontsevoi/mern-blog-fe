import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Container from '@mui/material/Container'

import { Header } from './components'
import { AddPost, FullPost, Home, Login, Registration } from './pages'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchAuthMe } from './redux/slices/auth'

const layout = (Component) => (
  <>
    <Header />
    <Container maxWidth="lg">
      <Component />
    </Container>
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: layout(Home),
  },
  {
    path: '/posts/:id',
    element: layout(FullPost),
  },
  {
    path: '/posts/:id/edit',
    element: layout(AddPost),
  },
  {
    path: '/posts/create',
    element: layout(AddPost),
  },
  {
    path: '/login',
    element: layout(Login),
  },
  {
    path: '/register',
    element: layout(Registration),
  },
])

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return (
    <RouterProvider router={router} />
  )
}

export default App
