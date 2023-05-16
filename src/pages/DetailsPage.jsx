import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailsPage = () => {
  const { recipeId } = useParams()
  const [recipe, setRecipe] = useState()

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:5005/api/recipes/${recipeId}`)
      if (response.status === 200) {
        const parsed = await response.json()
        setRecipe(parsed)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [])

  useEffect(() => {
    console.log(recipe)
  }, [recipe])

  return recipe ? (
    <>
      <h1>Details of {recipe.title}</h1>
      <h2>{recipe.cookingTime}</h2>
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default DetailsPage
