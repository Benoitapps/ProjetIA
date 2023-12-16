
import RecipeDes from './RecipeDes.jsx';
import RecomendationPage from '../Recomendations/RecomendationPage.jsx';
import '@css/RecipeDetails.css';
import {useParams } from "react-router-dom";

function RecipePageDetails() {
    const { recipeId } = useParams();

    return (
        <>

            <div className="recette">
                <div className="details"> <RecipeDes recipeId={recipeId}/> </div>
                <div className="recomendations"> <RecomendationPage recipeId={recipeId} /> </div>
            </div>

        </>
    )
}

export default RecipePageDetails
