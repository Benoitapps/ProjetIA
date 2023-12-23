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
            {
                shoppingList == null
                    ? ''
                    :
                    <div className="recipe__details__shopping-list">
                        <h4>Votre liste de course</h4>
                        <ul className="recipe__details__shopping-list__list">
                            {
                                shoppingList.map((ingredient, index) => {
                                    return (
                                        <li key={index}>
                                            <p><span>{ingredient.name}</span> : {ingredient.quantity}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="recipe__details__shopping-list__share">
                            <p>Partager:</p>
                            <ul className="recipe__details__shopping-list__share__icons">
                                <li>
                                    <img src={twitter} alt="" title="Partager sur Twitter" onClick={shareOnTwitter} style={{cursor: "pointer"}}/>
                                </li>
                                <li>
                                    <img src={whatsapp} alt="" title="Partager sur Whatsapp" onClick={shareOnWhatsapp} style={{cursor: "pointer"}}/>
                                </li>
                                <li>
                                    <img src={mail} alt="" title="Envoyer par mail" onClick={shareOnMail} style={{cursor: "pointer"}}/>
                                </li>
                                <li>
                                    <img src={clipboard} alt="" title="Copier la liste" onClick={copyToClipboard} style={{cursor: "pointer"}}/>
                                </li>
                            </ul>
                        </div>
                    </div>
            }
        </section>
    )
}

export default RecipeIngredients