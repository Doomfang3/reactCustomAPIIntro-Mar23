import { useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import CreatePage from './pages/CreatePage'

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
    <>
      <Link to='/'>Home</Link>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipes/:recipeId' element={<DetailsPage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/update/:recipeId' element={<CreatePage isUpdating />} />
      </Routes>
    </>
  )
}

export default App
