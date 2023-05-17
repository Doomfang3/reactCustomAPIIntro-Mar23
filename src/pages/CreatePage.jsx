/* title
cookingTime
ingredients
type */

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CreatePage = ({ isUpdating = false }) => {
  const navigate = useNavigate()
  const { recipeId } = useParams()

  const [title, setTitle] = useState('')
  const [cookingTime, setCookingTime] = useState(0)
  const [ingredients, setIngredients] = useState([])
  const [type, setType] = useState('Omnivore')

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { title, cookingTime, ingredients, type }

    try {
      const response = await fetch(
        `http://localhost:5005/api/recipes/${isUpdating ? recipeId : ''}`,
        {
          method: isUpdating ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )
      if (response.status === 201 || response.status === 200) {
        const newRecipe = await response.json()
        navigate(`/recipes/${newRecipe._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRecipe = async () => {
    const response = await fetch(`http://localhost:5005/api/recipes/${recipeId}`)
    if (response.status === 200) {
      const recipe = await response.json()
      console.log(recipe)
      setTitle(recipe.title)
      setCookingTime(recipe.cookingTime)
      setIngredients(recipe.ingredients)
      setType(recipe.type)
    }
  }

  useEffect(() => {
    if (isUpdating) {
      fetchRecipe()
    }
  }, [isUpdating])

  return (
    <>
      <h1>{isUpdating ? 'Update a recipe' : 'Create a new recipe'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input value={title} onChange={event => setTitle(event.target.value)} />
        </label>
        <label>
          Cooking Time
          <input
            type='number'
            value={cookingTime}
            onChange={event => setCookingTime(event.target.value)}
          />
        </label>
        <label>
          Ingredients
          <input
            value={ingredients.join(' ')}
            onChange={event => setIngredients(event.target.value.split(' '))}
          />
        </label>
        <label>
          Type
          <select value={type} onChange={event => setType(event.target.value)}>
            {['Omnivore', 'Vegetarian', 'Vegan'].map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button type='submit'>{isUpdating ? 'Update' : 'Create'}</button>
      </form>
    </>
  )
}

export default CreatePage
