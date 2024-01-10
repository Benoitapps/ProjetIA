import React, { useState } from "react";
import '@css/Preference/PreferencesInput.css';


function PreferenceInput({ addFoodName }) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        addFoodName({ name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="preferences__form">
            <input className="preferences__input" type="text" 
                value={name} onChange={(e) => setName(e.target.value)} 
                placeholder="Vos préférences alimentaires (Allergènes: soja, blé..., Intolérances: lactose, gluten...)" />
            <button type="submit" className="preferences__button">Ajouter</button>
        </form>
    );
}

export default PreferenceInput;
