import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  // Store data
  const [recipes, setRecipes] = useState([])
  // Define how to fetch data
  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/recipes')
      if (response.status === 200) {
        const parsed = await response.json()
        setRecipes(parsed)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Fetch at the right time
  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <>
      <h1>All recipes</h1>
      {recipes.map(recipe => (
        <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
          {recipe.title}
        </Link>
      ))}
    </>
  )
}

export default HomePage
