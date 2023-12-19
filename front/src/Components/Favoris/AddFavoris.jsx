// import jwt_decode from "jwt-decode";
// import {getUser} from "../../hook/user/getConnect.js";
import {addFavoris} from "../../hook/favoris/addFavoris.js";
import {deleteFavoris} from "../../hook/favoris/deleteFavoris.js";
import {getStatsFavoris} from "../../hook/favoris/getStatFavoris.js";
import starTrue from "@img/start_true.png";
import starFalse from "@img/start_false.png";

import {useEffect, useState} from "react";

function StarFavoris({ name,id, handleClick }) {

    const [favoris, setFavoris] = useState();
    const refresh = useState(false)
    const [star, setStar] = useState(starFalse)


    const getFavoris = async () => {
        const data = await getStatsFavoris(id);
        setFavoris(data.isFavorite)
        data.isFavorite ? setStar(starTrue) : setStar(starFalse)
    }

    useEffect(() => {
        const res = getFavoris()
    }, [refresh,id])

    const clickStar = () => {
        if (favoris === false) {
            addfavoris()
        } else {
            deletefavoris()
        }

    }

    const addfavoris = async () => {
        try {
            await addFavoris(id);
            setStar(starTrue)
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux favoris :', error);
        }

    };
    const deletefavoris = async () => {
        try {
            await deleteFavoris(id);
            setStar(starFalse)
        } catch (error) {
            console.error('Erreur lors de la supr des favoris :', error);
        }
    };

    return (
        <>
            <img src={star} alt="star" onClick={clickStar} />
        </>
    )
}

export default StarFavoris