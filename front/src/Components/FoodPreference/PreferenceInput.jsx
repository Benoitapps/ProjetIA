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
        <form onSubmit={handleSubmit}>
            <input className="preferences__input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {/*<button type="submit">Ajouter</button>*/}
        </form>
    );
}

export default PreferenceInput;
