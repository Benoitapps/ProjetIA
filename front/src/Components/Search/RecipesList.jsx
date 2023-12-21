import React from 'react';
import RecipeCard from './RecipeCard';
import '@css/Search/RecipesList.css';
import {Link} from "react-router-dom";
import FavorisImage from "../Favoris/FavorisImage.jsx";
import FavorisRecipe from "../Favoris/FavorisRecipe.jsx";

function RecipesList({ recipes, isLoading }) {
  return (
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
                                  return <li className="recipes__card" key={index}>
                                      <Link to={`/recipe/${recipe.id}`} className="recipes__card__image">
                                          <FavorisImage img={recipe.src}/>
                                      </Link>
                                      <Link to={`/recipe/${recipe.id}`}>
                                          <FavorisRecipe
                                              name={recipe.name}
                                              description={recipe.description}
                                              id={recipe.id}
                                              notes={recipe.notes}
                                          />
                                      </Link>
                                  </li>
                              })
                          }
                      </ul>
          }
      </section>
  );
}

export default RecipesList;