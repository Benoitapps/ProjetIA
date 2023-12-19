
import '@css/Recipe/RecipeDetails.css';
import RecommendationItem from "./RecommendationItem.jsx";
import {useEffect, useState} from "react";
import {getRecommendation} from "../../hook/recommendation/getRecommendation.js";

function RecommendationList({recipeId}) {

    const [recipes, setRecipe] = useState([]);

    const fetchRecipe = async () => {
        const data = await getRecommendation(recipeId);
        setRecipe(data.answer)
    }

    useEffect(() => {
        fetchRecipe();
    }, [])



    return (
        <ul className="recommendations__list">
            {
                recipes.map((recipe, index) => (
                    <RecommendationItem name={recipe.name} id={recipe.id} src={recipe.src} description={recipe.description} key={index} />
                ))
            }
        </ul>
    )
}

export default RecommendationList
