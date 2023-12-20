
import '@css/Recipe/RecipeDetails.css';
import RecommendationItem from "./RecommendationItem.jsx";
import {useEffect, useState} from "react";
import {getRecommendation} from "../../hook/recommendation/getRecommendation.js";

function RecommendationList({recipeId}) {
    const [recipes, setRecipe] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRecipe = async () => {
        window.scrollTo(0, 0);

        setIsLoading(true);
        const data = await getRecommendation(recipeId);
        setRecipe(data.answer)
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRecipe();
    }, [recipeId])



    return (
        <ul className="recommendations__list">
            {isLoading 
                ? <p>Chargement...</p> 
                : recipes.map((recipe, index) => (
                    <RecommendationItem name={recipe.name} id={recipe.id} src={recipe.src} description={recipe.description} key={index} />
                ))
            }
        </ul>
    )
}

export default RecommendationList
