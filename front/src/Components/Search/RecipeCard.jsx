import React from 'react';
import '../../assets/css/RecipeCard.css';

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <div className="recipe-header">
                <h2 className="recipe-title">{recipe.name}</h2>
                <p className="recipe-time">{recipe.time}</p>
            </div>
            <p className="recipe-description">{recipe.description}</p>
        </div>
    );
}

export default RecipeCard;