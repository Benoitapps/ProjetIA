// import jwt_decode from "jwt-decode";
// import {getUser} from "../../hook/user/getConnect.js";
import {addFavoris} from "../../hook/favoris/addFavoris.js";
import {deleteFavoris} from "../../hook/favoris/deleteFavoris.js";
import {getStatsFavoris} from "../../hook/favoris/getStatFavoris.js";
import isFavorite from "@img/is-favorite.svg";
import isNotFavorite from "@img/is-not-favorite.svg";

import {useEffect, useState} from "react";

function AddFavoris({ name,id, handleClick }) {
    const [favoris, setFavoris] = useState();
    const refresh = useState(false)
    const [putOnFavorite, setPutOnFavorite] = useState(isNotFavorite)


    const getFavoris = async () => {
        const data = await getStatsFavoris(id);
        setFavoris(data.isFavorite)
        data.isFavorite ? setPutOnFavorite(isFavorite) : setPutOnFavorite(isNotFavorite)
    }

    useEffect(() => {
        const res = getFavoris()
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
            setPutOnFavorite(isFavorite)
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux favoris :', error);
        }

    };
    const deletefavoris = async () => {
        try {
            await deleteFavoris(id);
            setPutOnFavorite(isNotFavorite)
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