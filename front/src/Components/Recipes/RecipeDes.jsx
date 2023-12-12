import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeResume from './RecipeResume.jsx';
import RecipeIngredients from './RecipeIngredients.jsx';
import RecipePreparation from './RecipePreparation.jsx';
import StarFavoris from '../Favoris/StarFavoris.jsx';
import {getRecipe} from '../../hook/recipeDetails/RecipeDetails.js'
import '@css/RecipeDetails.css';

function RecipeDes({recipeId}) {
    const [recipeDes, setRecipeDes] = useState("");
    const [recipeIng, setRecipeIng] = useState([]);
    const [recipeName, setRecipeName] = useState(null);
    const [recipeImg, setRecipeImag] = useState("");

    const fetchRecipe = async () => {
        const data = await getRecipe(recipeId);
        setRecipeDes(data.description);
        setRecipeName(data.name);
        setRecipeIng(data.ingredients);
        setRecipeImag(data.image);
    }

    useEffect(() => {
        fetchRecipe();

    }, [])


    return (
        <>
            <div className="flexStar">
                <div><RecipeResume name={recipeName}/></div>
               <div> <StarFavoris name={recipeName} id={ 11}/></div>

            </div>
            <div className="imgRecipe">
                <img src={recipeImg} alt="image de la recette" />
            </div>
            <RecipeIngredients ingredients={recipeIng} />
            <RecipePreparation preparation={recipeDes} />

        </>
    )
}

export default RecipeDes
