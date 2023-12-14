
import '@css/RecipeDetails.css';
import RecomendationItem from "./RecomendationItem.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRecomendation} from "../../hook/recomendation/getRecomendation.js";

function RecomendationList({recipeId}) {

    const [recipes, setRecipe] = useState([]);

    const fetchRecipe = async () => {
        const data = await getRecomendation(recipeId);
        setRecipe(data.answer)
        console.log(data.answer)
    }

    useEffect(() => {
        fetchRecipe();

    }, [])



    return (
        <>
            {
                recipes.map((recipe, index) => (
                    <RecomendationItem name={recipe.name} id={recipe.id} src={recipe.src} description={recipe.description} key={index} />
                ))
            }
        </>
    )
}

export default RecomendationList
