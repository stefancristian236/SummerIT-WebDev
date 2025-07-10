import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Allroutes } from './Routes/allroutes'

function App() {
  return (
    <>
      <RouterProvider router = {Allroutes} />
    </>
  )
}

export default App