import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Container from '@mui/material/Container'

import { Header } from './components'
import { AddPost, FullPost, Home, Login, Registration } from './pages'

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
    path: '/add-post',
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
  return (
    <RouterProvider router={router} />
  )
}

export default App
