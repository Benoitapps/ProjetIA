import React, { useEffect, useState } from 'react';
import FavorisImage from './FavorisImage.jsx';
import FavorisRecipe from './FavorisRecipe.jsx';
import { getAllFavoris } from '../../hook/favoris/getAllMyFavoris.js';
import '@css/Favoris/favoris.css';
import StarFavoris from '../Favoris/StarFavoris.jsx';



function FavorisItem() {

    const [favoris, setFavoris] = useState([]);

    const fetchFavoris = async () => {
        try {
            const data = await getAllFavoris();
            setFavoris(data.recipes); // Supposant que 'data' est un objet qui a une propriété 'recipes'
            console.log(data.recipes);
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris :', error);
        }
    };

    useEffect(() => {
        fetchFavoris();
    }, []);

    const StarClick = () => {
        console.log('clique ok plus que recharge')
        fetchFavoris();
    };

    return (
        <>
            {favoris.map((recipe, index) => (
                <div className="CardRecipe" key={index}>
                    <div className="imageFavoris"><FavorisImage /></div>
                    <div className="recipeFavrois">
                        <FavorisRecipe
                            name={recipe.name}
                            description={recipe.description}
                            id={recipe.id}
                        />
                    </div>
                    <div onClick={StarClick}>
                        <div style={{ width: '4em' }}> <StarFavoris name={recipe.name} id={recipe.id} /></div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default FavorisItem;
