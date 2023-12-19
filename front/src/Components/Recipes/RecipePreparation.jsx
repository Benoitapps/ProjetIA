import React from "react";

function RecipeRes( {preparation}) {

    const stepsArray = preparation.split(/\d+\./).filter(step => step.trim() !== "");

    return (
        <section className="recipe__details__preparation">
            <h3>Préparation</h3>
            <ul>
                {stepsArray.map((etape, index) => (
                    <li key={index}>{index + ". " + etape}</li>
                ))}
            </ul>
            <input
                type="button"
                className="recipe__details__generation"
                value="Proposer des accompagnements"
            />
        </section>
    )
}

export default RecipeRes