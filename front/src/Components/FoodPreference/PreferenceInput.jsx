import React, { useState } from "react";

function PreferenceInput({ addFoodName }) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        addFoodName({ name });
        setName('');
    };

    return (
        <div className='inputText'>
        <form onSubmit={handleSubmit}>
            <input className="leinput" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {/*<button type="submit">Ajouter</button>*/}
        </form>
        </div>
    );
}

export default PreferenceInput;
