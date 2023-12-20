
import RecipeDes from './RecipeDes.jsx';
import RecommendationPage from '../Recommendations/RecommendationPage.jsx';
import '@css/Recipe/RecipeDetails.css';
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
        <div className="recipe">
            <RecipeDes recipeId={recipeId}  data={data}/>
            <RecommendationPage recipeId={recipeId}/>
        </div>
    )
}

export default RecipePageDetails
