import React from 'react';
import RecipeCard from './RecipeCard';
import '@css/Search/RecipesList.css';

function RecipesList({ recipes, isLoading }) {
  return (
    <>
      <section className="recipes-list">
        <h2 className="recipes-list-title">Résultats de la recherche</h2>
        {
          isLoading
            ? <p className="recipes-list-loading">Chargement des recettes...</p>
            : recipes.length === 0
              ? <p className="recipes-list-empty">Aucune recette ne correspond à votre recherche...</p>
              :
              <ul className="recipes-list-container">
                {
                  recipes.map((recipe, index) => {
                    return <li key={index}>
                      <RecipeCard recipe={recipe} />
                    </li>
                  })
                }
              </ul>
        }
      </section>
    </>
  );
}

export default RecipesList;