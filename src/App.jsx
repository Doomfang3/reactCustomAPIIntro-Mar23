import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'

function App() {
  /*   const APITestConnection = async () => {
    const response = await fetch('http://localhost:5005/api')
    const parsed = await response.json()
    console.log(parsed)
  } */

  useEffect(() => {
    // APITestConnection()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/recipes/:recipeId' element={<DetailsPage />} />
    </Routes>
  )
}

export default App
