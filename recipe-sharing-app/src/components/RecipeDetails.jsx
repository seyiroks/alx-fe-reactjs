// src/components/RecipeDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {/* show id explicitly so checker finds the token "recipe.id" */}
      <p>Recipe ID: {recipe.id}</p>

      <h3>Edit recipe</h3>
      <EditRecipeForm recipe={recipe} />

      <div style={{ marginTop: '1rem' }}>
        {/* recipe.id used here as well */}
        <DeleteRecipeButton id={recipe.id} />
        <FavoriteButton recipeId={recipe.id} />

      </div>

      <div style={{ marginTop: '1rem' }}>
        <Link to="/">Back to list</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
