import React from 'react'
import FavorisItem from './FavorisItem'
import Switcher from "../Switcher.jsx";

function FavorisPage() {
    const links = [
        {
            id: 1,
            title: 'Mes recettes',
            href: '/favoris',
            active: true
        },
        {
            id: 2,
            title: 'Preférences alimentaire',
            href: '/pref',
            active: false
        }
    ];

    return (
        <>
            <Switcher
                links={links}
            />
            <h1> Mes Recettes </h1>
                {/*Ajouter plus tard le truc qui slide de melvin*/}
                <div className="detailsFavoris"> <FavorisItem /> </div>

        </>
    )
}

export default FavorisPage
