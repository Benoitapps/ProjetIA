import React from 'react';
import StarFavoris from '../Favoris/StarFavoris.jsx';

function FavorisRecipe({ name, description, id, handleStarClick }) {
    return (
        <>
            <p>{name}</p>
            {/*<StarFavoris name={name} id={id} onClick={handleStarClick} /> /!* Utilisez onStarClick ici *!/*/}
            <p>{description}</p>
        </>
    );
}

export default FavorisRecipe;