import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainPage from './pages/MainPage'
import SignUp from './components/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {path: '', element: <Home /> },
      { path: 'signup', element: <SignUp /> } // <-- yaha comma ka dhyan rakho
    ]
  }
])

function App() { 
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
