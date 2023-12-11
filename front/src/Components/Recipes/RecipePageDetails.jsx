
import RecipeDes from './RecipeDes.jsx';
import Recomendation from './Recomendation.jsx';
import '@css/RecipeDetails.css';

function RecipePageDetails() {

    return (
        <>

            <div className="recette">
                <div className="details"> <RecipeDes /> </div>
                <div className="recomendations"> <Recomendation /> </div>
            </div>

        </>
    )
}

export default RecipePageDetails
