import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  // Store data
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [hasCheese, setHasCheese] = useState(true)
  // Define how to fetch data
  const fetchRecipes = async (searchTerm = '') => {
    try {
      let endpoint = 'http://localhost:5005/api/recipes'
      if (searchTerm || hasCheese) {
        endpoint += '?'
      }
      if (searchTerm) {
        endpoint += `search=${searchTerm}`
      }
      if (hasCheese) {
        if (searchTerm) {
          endpoint += `&`
        }
        endpoint += 'cheese=true'
      }
      const response = await fetch(endpoint)
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

  useEffect(() => {
    fetchRecipes(searchTerm)
  }, [searchTerm, hasCheese])

  return (
    <>
      <h1>All recipes</h1>
      <Link to='/create'>Create a new recipe</Link>
      <div>
        <label>
          Search
          <input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        </label>
        <label>
          Has cheese ?
          <input
            type='checkbox'
            checked={hasCheese}
            onChange={event => setHasCheese(event.target.checked)}
          />
        </label>
      </div>
      {recipes.map(recipe => (
        <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
          {recipe.title}
        </Link>
      ))}
    </>
  )
}

export default HomePage
