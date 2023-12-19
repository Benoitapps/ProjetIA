import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeResume from './RecipeResume.jsx';
import RecipeIngredients from './RecipeIngredients.jsx';
import RecipePreparation from './RecipePreparation.jsx';
import StarFavoris from '../Favoris/StarFavoris.jsx';
import {getRecipe} from '../../hook/recipeDetails/RecipeDetails.js';
import CommentPage from "../Comment/CommentPage.jsx";
import Accompagnement from "./Accompagnement.jsx";
import '@css/RecipeDetails.css';

function RecipeDes({recipeId}) {
    const [recipeDes, setRecipeDes] = useState("");
    const [recipeIng, setRecipeIng] = useState([]);
    const [recipeName, setRecipeName] = useState(null);
    const [recipeImg, setRecipeImag] = useState("");
    const [recipePrep, setRecipePrep] = useState("");

    const fetchRecipe = async () => {
        const data = await getRecipe(recipeId);
        setRecipeDes(data.description);
        setRecipeName(data.name);
        setRecipeIng(data.ingredients);
        setRecipeImag(data.image);
        setRecipePrep(data.preparation);
    }

    useEffect(() => {
        fetchRecipe();

    }, [recipeId])


    return (
        <>
            <div className="flexStar">
                <div><RecipeResume name={recipeName}/></div>
               <div> <StarFavoris name={recipeName} id={ recipeId}/></div>

            </div>
            <div className="imgRecipe">
                <img src={recipeImg} alt="image de la recette" />
            </div>
            <div className="description">
                <p>{recipeDes}</p>
            </div>
            <RecipeIngredients ingredients={recipeIng} />
            <RecipePreparation preparation={recipePrep} />
            <Accompagnement recipeName={recipeName}/>

            <CommentPage recipeId={recipeId} />

        </>
    )
}

export default RecipeDes
