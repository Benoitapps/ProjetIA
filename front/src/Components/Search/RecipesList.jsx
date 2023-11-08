import React from 'react';
import RecipeCard from './RecipeCard';
import '@css/Search/RecipesList.css';

function RecipesList({ recipes }) {
    return (
        <>
          <section className="recipes-list">
            <h2 className="recipes-list-title">Résultats de la recherche</h2>
            <ul className="recipes-list-container">
              {
                recipes.map((recipe, index) => {
                  return <li><RecipeCard key={index} recipe={recipe} /></li>
                })
              }
            </ul>
          </section>
        </>
    );
}

export default RecipesList;