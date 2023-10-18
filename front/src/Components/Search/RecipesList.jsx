import React from 'react';
import RecipeCard from './RecipeCard';

function RecipesList({ recipes }) {
    return (
        <>
            { 
                recipes.map((recipe, index) => {
                    return <RecipeCard key={index} recipe={recipe} />
                }) 
            }
        </>
    );
}

export default RecipesList;