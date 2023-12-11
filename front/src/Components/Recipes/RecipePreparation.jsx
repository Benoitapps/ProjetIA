import React from "react";

function RecipeRes( {preparation}) {

    const stepsArray = preparation.split(/\d+\./).filter(step => step.trim() !== "");

    return (
        <>
            <h2>Préparation</h2>
            <ul>
                {stepsArray.map((etape, index) => (
                    <li key={index}>{index + ". " + etape}</li>
                ))}
            </ul>
        </>
    )
}

export default RecipeRes