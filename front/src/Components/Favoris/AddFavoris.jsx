// import jwt_decode from "jwt-decode";
// import {getUser} from "../../hook/user/getConnect.js";
import {addFavoris} from "../../hook/favoris/addFavoris.js";
import {deleteFavoris} from "../../hook/favoris/deleteFavoris.js";
import {getStatsFavoris} from "../../hook/favoris/getStatFavoris.js";

import {useEffect, useState} from "react";

function AddFavoris({ name,id, handleClick }) {
    const [favoris, setFavoris] = useState();
    const refresh = useState(false)
    const [isFavorite, setIsFavorite] = useState(false);

    const getFavoris = async () => {
        const data = await getStatsFavoris(id);
        setFavoris(data.isFavorite);
    }

    useEffect(() => {
        const res = getFavoris()
    }, [refresh])

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
            setIsFavorite(true)
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux favoris :', error);
        }
    };
    const deletefavoris = async () => {
        try {
            await deleteFavoris(id);
            setIsFavorite(false)
        } catch (error) {
            console.error('Erreur lors de la supr des favoris :', error);
        }
    };

    return (
         <button className="favorite-button" onClick={clickStar}>
             {
                 !isFavorite ? (
                         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="27" viewBox="0 0 30 27" fill="none">
                             <path
                                 d="M21.9094 2.14245C22.6892 2.14192 23.4613 2.29704 24.1804 2.59871C24.8994 2.90037 25.5511 3.34252 26.0971 3.89925C27.2224 5.04158 27.8531 6.58068 27.8531 8.18414C27.8531 9.78759 27.2224 11.3267 26.0971 12.469L14.9993 23.7054L3.90143 12.469C2.7762 11.3267 2.14547 9.78759 2.14547 8.18414C2.14547 6.58068 2.7762 5.04158 3.90143 3.89925C4.44785 3.3428 5.09967 2.90082 5.81882 2.5991C6.53797 2.29738 7.31003 2.14199 8.08991 2.14199C8.86978 2.14199 9.64184 2.29738 10.361 2.5991C11.0801 2.90082 11.732 3.3428 12.2784 3.89925L14.9993 6.68443L17.7102 3.92067C18.2546 3.35719 18.9071 2.90929 19.6286 2.60376C20.3501 2.29822 21.1258 2.14132 21.9094 2.14245ZM21.9094 3.13381e-06C20.8442 -0.000939588 19.7895 0.210821 18.8072 0.622865C17.8249 1.03491 16.9348 1.63894 16.1891 2.39954L14.9993 3.59931L13.8109 2.39954C13.0642 1.64043 12.1738 1.03755 11.1917 0.62602C10.2096 0.214491 9.15545 0.00255134 8.09062 0.00255134C7.02579 0.00255134 5.9716 0.214491 4.98951 0.62602C4.00741 1.03755 3.11704 1.64043 2.3703 2.39954C0.851174 3.94598 0 6.02708 0 8.19485C0 10.3626 0.851174 12.4437 2.3703 13.9902L14.9993 26.7805L27.6297 13.9902C29.1488 12.4437 30 10.3626 30 8.19485C30 6.02708 29.1488 3.94598 27.6297 2.39954C26.8832 1.63997 25.9929 1.03662 25.0108 0.624647C24.0287 0.212677 22.9744 0.00033575 21.9094 3.13381e-06Z"
                                 fill="var(--primary)"/>
                         </svg>
                     )
                     : (
                         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="27" viewBox="0 0 30 27" fill="none">
                             <path
                                 d="M21.9396 5.58991e-05C19.8043 5.58991e-05 17.7758 0.854157 16.2812 2.34883L15 3.62999L13.8256 2.4556C10.7295 -0.747283 5.60489 -0.747282 2.50877 2.34883L2.40201 2.4556C1.6409 3.21043 1.03678 4.1085 0.62452 5.098C0.212255 6.0875 0 7.14883 0 8.22078C0 9.29272 0.212255 10.3541 0.62452 11.3436C1.03678 12.3331 1.6409 13.2311 2.40201 13.986L15 26.6907L27.598 13.986C28.3591 13.2311 28.9632 12.3331 29.3755 11.3436C29.7877 10.3541 30 9.29272 30 8.22078C30 7.14883 29.7877 6.0875 29.3755 5.098C28.9632 4.1085 28.3591 3.21043 27.598 2.4556C26.8758 1.67741 26.0001 1.05742 25.0261 0.634773C24.0522 0.212127 23.0012 -0.00399463 21.9396 5.58991e-05Z"
                                 fill="var(--primary)"/>
                         </svg>
                     )
             }
         </button>
    )
}

export default AddFavoris