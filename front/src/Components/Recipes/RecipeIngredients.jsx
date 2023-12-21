import React, { useEffect, useState } from 'react';
import mail from "@img/mail.svg";
import clipboard from "@img/clipboard.svg";
import twitter from "@img/twitter.svg";
import whatsapp from "@img/whatsapp.svg";
import {fetchShoppingList} from '../../hook/recipeDetails/RecipeDetails.js';

function RecipeIngredients({ ingredients, recipeId }) {
    const [shoppingList, setShoppingList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getShoppingList = async () => {
        setIsLoading(true);
        let result = await fetchShoppingList(recipeId);
        setShoppingList(result.ingredients);
        setIsLoading(false);
    }

    const shareOnMail = () => {
        // TODO: To implement
        window.open(`mailto:?body=${setFormatedShoppingList()}`);
    }

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${setFormatedShoppingList()}`);
    }

    const shareOnWhatsapp = () => {
        window.open(`https://wa.me/?text=${setFormatedShoppingList()}`);
    }

    const copyToClipboard = async () => {
        navigator.clipboard.writeText(setFormatedShoppingList());
    }

    const setFormatedShoppingList = () => {
        let text = "";
        shoppingList.forEach((ingredient, index) => {
            text += `${index}.${ingredient.name} : ${ingredient.quantity}, \n`;
        });
        return text;
    }

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
                onClick={() => getShoppingList()}
                className="recipe__details__generation"
                value={isLoading ? "Chargement..." : "Générer ma liste de course"}
                {...(isLoading ? {disabled: true} : {}) }
            />
            <div>
                {
                    shoppingList == null 
                    ? '' 
                    : 
                    <>
                        {
                            shoppingList.map((ingredient, index) => {
                                return (
                                    <div key={index}>
                                        <p>{index}. {ingredient.name} : {ingredient.quantity}</p>
                                    </div>
                                )
                            })
                        }
                        Partager: 
                        <img src={twitter} alt="" onClick={shareOnTwitter} style={{cursor: "pointer"}}/>
                        <img src={whatsapp} alt="" onClick={shareOnWhatsapp} style={{cursor: "pointer"}}/>
                        <img src={mail} alt="" onClick={shareOnMail} style={{cursor: "pointer"}}/>
                        <img src={clipboard} alt="" onClick={copyToClipboard} style={{cursor: "pointer"}}/>
                    </>
                }
            </div>
        </section>
    )
}

export default RecipeIngredients