import { useState } from 'react';
import { Link } from 'react-router-dom';

function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Check if title is empty
    if (!title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    // Check if ingredients is empty
    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      // Check if there are at least 2 ingredients (assuming each line is an ingredient)
      const ingredientList = ingredients.split('\n').filter(item => item.trim() !== '');
      if (ingredientList.length < 2) {
        newErrors.ingredients = 'Please provide at least two ingredients';
      }
    }

    // Check if preparation steps is empty
    if (!steps.trim()) {
      newErrors.steps = 'Preparation steps are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (validate()) {
      // Form is valid - process the data
      const newRecipe = {
        title,
        ingredients: ingredients.split('\n').filter(item => item.trim() !== ''),
        steps: steps.split('\n').filter(item => item.trim() !== ''),
      };

      console.log('New Recipe Submitted:', newRecipe);
      
      // Show success message
      alert('Recipe submitted successfully!');

      // Clear form
      setTitle('');
      setIngredients('');
      setSteps('');
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-block mb-6 text-blue-500 hover:text-blue-700 font-medium"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Add New Recipe
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipe Title */}
            <div>
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Recipe Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter recipe title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Ingredients */}
            <div>
              <label 
                htmlFor="ingredients" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ingredients
              </label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows="6"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.ingredients ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter each ingredient on a new line&#10;Example:&#10;2 cups flour&#10;1 cup sugar&#10;3 eggs"
              />
              {errors.ingredients && (
                <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Enter each ingredient on a new line (minimum 2 ingredients)
              </p>
            </div>

            {/* Preparation Steps */}
            <div>
              <label 
                htmlFor="steps" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Preparation Steps
              </label>
              <textarea
                id="steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                rows="8"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.steps ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter each step on a new line&#10;Example:&#10;Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients"
              />
              {errors.steps && (
                <p className="mt-1 text-sm text-red-500">{errors.steps}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Enter each step on a new line
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Submit Recipe
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle('');
                  setIngredients('');
                  setSteps('');
                  setErrors({});
                }}
                className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;