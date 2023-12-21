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
            <FavorisItem />
        </>
    )
}

export default FavorisPage
