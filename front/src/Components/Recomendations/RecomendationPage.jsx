
import '@css/RecipeDetails.css';
import RecomendationList from "./RecomendationList.jsx";
import {useParams} from "react-router-dom";

function RecomendationPage({recipeId}) {
    return (
        <>
            <h4>Recomendation</h4>

            <RecomendationList  recipeId={recipeId}/>

        </>
    )
}

export default RecomendationPage
