import { useState, useEffect } from 'react';
import RecipeIngredients from './RecipeIngredients.jsx';
import RecipePreparation from './RecipePreparation.jsx';
import AddFavoris from '../Favoris/AddFavoris.jsx';
import {getRecipe} from '../../hook/recipeDetails/RecipeDetails.js';
import CommentPage from "../Comment/CommentPage.jsx";
import Accompagnement from "./Accompagnement.jsx";
import RecipeNote from "../RecipeNote.jsx";
import '@css/Recipe/RecipeDetails.css';


function RecipeDes({recipeId}) {
    const [recipeDes, setRecipeDes] = useState("");
    const [recipeIng, setRecipeIng] = useState([]);
    const [recipeName, setRecipeName] = useState(null);
    const [recipeImg, setRecipeImag] = useState("");
    const [recipePrep, setRecipePrep] = useState("");
    const [notes, setNotes] = useState([]);

    const fetchRecipe = async () => {
        const data = await getRecipe(recipeId);
        setRecipeDes(data.description);
        setRecipeName(data.name);
        setRecipeIng(data.ingredients);
        setRecipeImag(data.image);
        setRecipePrep(data.preparation);
    }

    function commentsNote (notes) {
        setNotes(notes);
    }

    useEffect(() => {
        fetchRecipe();
    }, [recipeId])

    return (
        <div className="recipe__details">
            <div className="recipe__details__head">
                <h2>{recipeName}</h2>
                {/* <AddFavoris name={recipeName} id={recipeId}/> */}
            </div>
            <RecipeNote notes={notes} starSize="big" />
            <div className="recipe__details__image">
                <img src={recipeImg} alt="image de la recette" />
            </div>
            <p className="recipe__details__description">{recipeDes}</p>
            <RecipeIngredients ingredients={recipeIng} recipeId={recipeId} />
            <RecipePreparation preparation={recipePrep} />
            <Accompagnement recipeName={recipeName}/>

            <CommentPage recipeId={recipeId} commentsNote={commentsNote}/>
        </div>
    )
}

export default RecipeDes
