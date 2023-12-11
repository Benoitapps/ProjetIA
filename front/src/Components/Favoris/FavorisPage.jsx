import React from 'react'
import FavorisItem from './FavorisItem'

function FavorisPage() {

    return (
        <>
            <h1> Mes Recettes </h1>
                {/*Ajouter plus tard le truc qui slide de melvin*/}
                <div className="detailsFavoris"> <FavorisItem /> </div>

        </>
    )
}

export default FavorisPage
