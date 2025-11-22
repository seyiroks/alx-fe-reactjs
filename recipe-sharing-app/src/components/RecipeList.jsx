import { useRecipeStore } from '../src/components/recipeStore';
import { Link } from 'react-router-dom';
<Link to={`/recipes/${recipe.id}`}>View Details</Link>
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const recipes = useRecipeStore((state) =>
    state.filteredRecipes.length > 0 || state.searchTerm
      ? state.filteredRecipes
      : state.recipes
  );

  return (
    <div>
      {recipes.length === 0 && <p>No recipes added yet.</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
    <div>
      {recipes.length === 0 && <p>No recipes found.</p>}
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: '1px solid #ddd',
            padding: '0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <Link to={`/recipes/${recipe.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};


export default RecipeList;
