import React from 'react';
import AddFavoris from './AddFavoris.jsx';

function FavorisRecipe({ name, description, id, handleStarClick }) {
    return (
        <>
            <p>{name}</p>
            {/*<AddFavoris name={name} id={id} onClick={handleStarClick} /> /!* Utilisez onStarClick ici *!/*/}
            <p>{description}</p>
        </>
    );
}

export default FavorisRecipe;