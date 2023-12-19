
import RecipeDes from './RecipeDes.jsx';
import RecommendationPage from '../Recommendations/RecommendationPage.jsx';
import '@css/Recipe/RecipeDetails.css';
import {useParams } from "react-router-dom";

function RecipePageDetails() {
    const { recipeId } = useParams();

    return (
        <div className="recipe">
            <RecipeDes recipeId={recipeId}/>
            <RecommendationPage recipeId={recipeId}/>
        </div>
    )
}

export default RecipePageDetails
