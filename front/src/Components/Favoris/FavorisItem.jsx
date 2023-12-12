import React, { useEffect, useState } from 'react';
import FavorisImage from './FavorisImage.jsx';
import FavorisRecipe from './FavorisRecipe.jsx';
import { getAllFavoris } from '../../hook/favoris/getAllMyFavoris.js';
import '@css/Favoris/favoris.css';
import StarFavoris from '../Favoris/StarFavoris.jsx';
import { useNavigate} from 'react-router-dom';


function FavorisItem() {

    const navigate = useNavigate();
    const [favoris, setFavoris] = useState([]);
    const [img , setImg] = useState("");
    const [vide, setVide] = useState(true);

    const fetchFavoris = async () => {
        try {
            const data = await getAllFavoris();
            if(data.recipes.length>0) {
                setFavoris(data.recipes); // Supposant que 'data' est un objet qui a une propriété 'recipes'
                setImg(data.img);
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

    const StarClick = () => {
        fetchFavoris();
    };
    const redirect = (id) => {
        const route = `/recipe/${id}`;

        navigate(route);
    }

    return (
        <>
            {!vide?
                favoris.map((recipe, index) => (
                <div className="CardRecipe" key={index} >
                    <div className="textFavoris" onClick={() => redirect(recipe.id)}>
                    <div className="imageFavoris">
                        <FavorisImage  img={img[index].src}/>
                    </div>
                    <div className="recipeFavrois">
                        <FavorisRecipe
                            name={recipe.name}
                            description={recipe.description}
                            id={recipe.id}
                        />
                    </div>
                    </div>
                    <div onClick={StarClick}>
                        <div style={{ width: '4em' }}> <StarFavoris name={recipe.name} id={recipe.id} /></div>
                    </div>
                </div>
            )) : <div>Vous n'avez pas de favoris</div>}
        </>
    );
}

export default FavorisItem;
