import React, { useEffect, useState } from 'react';

function RecipeIngredients({ ingredients }) {
    return (
        <>
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </>
    )
}

export default RecipeIngredients