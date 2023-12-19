
import RecipeDes from './RecipeDes.jsx';
import RecomendationPage from '../Recomendations/RecomendationPage.jsx';
import '@css/RecipeDetails.css';
import {useParams } from "react-router-dom";
import {getRecipe} from "../../hook/recipeDetails/RecipeDetails.js";
import {useEffect, useState} from "react";

function RecipePageDetails() {
    const { recipeId } = useParams();
    const [data, setData] = useState([]);

    const fetchRecipe = async () => {
        const data = await getRecipe(recipeId);
       setData(data);
    }

    useEffect(() => {
        fetchRecipe();

    }, [])

    return (
        <>

            <div className="recette">
                <div className="details"> <RecipeDes recipeId={recipeId} data={data}/> </div>
                <div className="recomendations"> <RecomendationPage recipeId={recipeId} /> </div>
            </div>

        </>
    )
}

export default RecipePageDetails
