import React, { useEffect, useState } from 'react';

function RecipeIngredients({ ingredients }) {
    return (
        <section className="recipe__details__ingredients">
            <h3>Ingredients</h3>
            <ul className="recipe__details__ingredients__list">
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <input
                type="button"
                className="recipe__details__generation"
                value="Générer ma liste de course"
            />
        </section>
    )
}

export default RecipeIngredients