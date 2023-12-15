import React from 'react'
import close from "@img/close.png";


function PreferenceItem({name,id,deleteFood}) {

    return (
        <>
            <div className='prefcube'>
                <div className="flexDelete">
                    <p>{name}</p>
                    <img className="imagePref" src={close} alt="supprimer" onClick={() => deleteFood(id)}/>
                </div>

            </div>

        </>
    )
}

export default PreferenceItem
