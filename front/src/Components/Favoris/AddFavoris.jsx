// import jwt_decode from "jwt-decode";
// import {getUser} from "../../hook/user/getConnect.js";
import {addFavoris} from "../../hook/favoris/addFavoris.js";
import {deleteFavoris} from "../../hook/favoris/deleteFavoris.js";
import {getStatsFavoris} from "../../hook/favoris/getStatFavoris.js";
import isFavoriteBig from "@img/is-favorite.svg";
import isNotFavoriteBig from "@img/is-not-favorite.svg";
import isFavoriteSmall from "@img/is-favorite-small.svg";
import isNotFavoriteSmall from "@img/is-not-favorite-small.svg";

import {useEffect, useState} from "react";

function AddFavoris({ name, id, iconSize, handleClick }) {
    const [favoris, setFavoris] = useState();
    const refresh = useState(false)
    const [putOnFavorite, setPutOnFavorite] = useState(isNotFavoriteBig);
    const [iconFavorite, setIconFavorite] = useState(isFavoriteBig);
    const [iconNotFavorite, setIconNotFavorite] = useState(isNotFavoriteBig);

    const getFavoris = async () => {
        const data = await getStatsFavoris(id);
        setFavoris(data.isFavorite)
        data.isFavorite ? setPutOnFavorite(iconFavorite) : setPutOnFavorite(iconNotFavorite)
    }

    useEffect(() => {
        if(iconSize === "small") {
            setIconFavorite(isFavoriteSmall)
            setIconNotFavorite(isNotFavoriteSmall)
        } else {
            setIconFavorite(isFavoriteBig);
            setIconNotFavorite(isNotFavoriteBig);
        }

        const res = getFavoris();
    }, [refresh,id])

    const clickIcon = () => {
        if (favoris === false) {
            addfavoris()
        } else {
            deletefavoris()
        }
    }

    const addfavoris = async () => {
        try {
            await addFavoris(id);
            setPutOnFavorite(iconFavorite)
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux favoris :', error);
        }

    };
    const deletefavoris = async () => {
        try {
            await deleteFavoris(id);
            setPutOnFavorite(iconNotFavorite)
        } catch (error) {
            console.error('Erreur lors de la supr des favoris :', error);
        }
    };

    return (
        <>
            <img src={putOnFavorite} alt="Ajouter aux favoris" onClick={clickIcon} />
        </>
    )
}

export default AddFavoris