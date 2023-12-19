import '@css/Recipe/RecipeDetails.css';
import RecommendationList from "./RecommendationList.jsx";

function RecommendationPage({recipeId}) {
    return (
        <div className="recommendations">
            <h4>Recommandations</h4>

            <RecommendationList recipeId={recipeId}/>
        </div>
    )
}

export default RecommendationPage
