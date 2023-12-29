import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavorisImage from './FavorisImage.jsx';
import FavorisRecipe from './FavorisRecipe.jsx';
import { getAllFavoris } from '../../hook/favoris/getAllMyFavoris.js';
import '@css/Favoris/favoris.css';
import AddFavoris from './AddFavoris.jsx';

function FavorisItem() {
    const [favoris, setFavoris] = useState([]);
    const [vide, setVide] = useState(true);

    const fetchFavoris = async () => {
        try {
            const data = await getAllFavoris();
            if(data.recipes.length>0) {
                setFavoris(data.recipes); // Supposant que 'data' est un objet qui a une propriété 'recipes'
                setVide(false);
            }else{
                setVide(true);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des favoris :', error);
        }
    };

    useEffect(() => {
        fetchFavoris();
    }, []);

    const StarClick = (index) => {
        setFavoris(favoris.filter((_, i) => i !== index));
    };

    return (
        <ul className="favorites">
            {!vide?
                favoris.map((recipe, index) => (
                    <li className="favorites__card" key={index}>
                        <Link to={`/recipe/${recipe.id}`} className="favorites__card__image">
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
                        <div className="favorites__card__add-favorite" onClick={() => StarClick(index)}>
                            <AddFavoris name={recipe.name} id={recipe.id} iconSize="small"/>
                        </div>
                    </li>
                )) : <p>Vous n'avez pas de favoris</p>}

        </ul>
    )
        ;
}

export default FavorisItem;
