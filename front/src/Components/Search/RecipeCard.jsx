import React from 'react';
import '@css/Search/RecipeCard.css';

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <div className="recipe-picture"></div>
            <div className="recipe-content">
              <div className="recipe-header">
                <h2 className="recipe-title">{recipe.name}</h2>
              </div>
              <div className="recipe-body">
                <p className="recipe-description">{recipe.description}</p>
              </div>
            </div>
        </div>
    );
}

export default RecipeCard;