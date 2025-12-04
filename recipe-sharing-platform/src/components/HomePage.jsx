import { useState, useEffect } from 'react';
import recipeData from '../data.json';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load recipe data when component mounts
    setRecipes(recipeData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Recipe Sharing Platform
        </h1>
        <p className="text-center text-gray-600">
          Discover and share amazing recipes from around the world
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            {/* Recipe Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            {/* Recipe Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {recipe.summary}
              </p>
              <button className="text-blue-500 hover:text-blue-700 font-medium text-sm">
                View Recipe →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;