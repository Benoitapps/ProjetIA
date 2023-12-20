import React from 'react';
import '@css/Search/RecipeCard.css';
import { Link } from "react-router-dom";

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
              <div className="recipe-footer">
                <Link to={`/recipe/${recipe.id}`} className="recipe-link">Voir la recette</Link>
              </div>
            </div>
        </div>
    );
}

export default RecipeCard;