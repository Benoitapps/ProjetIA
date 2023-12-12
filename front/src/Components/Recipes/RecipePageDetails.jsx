
import RecipeDes from './RecipeDes.jsx';
import Recomendation from './Recomendation.jsx';
import '@css/RecipeDetails.css';
import {useParams} from "react-router-dom";

function RecipePageDetails() {
    const { recipeId } = useParams();
    return (
        <>

            <div className="recette">
                <div className="details"> <RecipeDes recipeId={recipeId}/> </div>
                <div className="recomendations"> <Recomendation /> </div>
            </div>

        </>
    )
}

export default RecipePageDetails
