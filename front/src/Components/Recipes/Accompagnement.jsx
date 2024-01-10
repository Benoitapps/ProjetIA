import React, { useEffect, useState } from 'react';
import { getAccompagnement } from '../../hook/Accompagenement/getAcc.js';
import '@css/Recipe/RecipeDetails.css';
function Accompagnement({ recipeName }) {
    const [isLoading, setIsLoading] = useState(false);
    const [acc, setAcc] = useState('');

    const fetchAccompagnement = async () => {
        setIsLoading(true);
        const data = await getAccompagnement(recipeName);
        setAcc(data.answer);
        setIsLoading(false);
    };

    useEffect(() => {
        setAcc('');
    }, [recipeName]);

    return (
        <>
            <input
                type="button"
                className="recipe__details__generation"
                value={isLoading ? "Chargement..." : "Proposer des accompagnements"}
                {...(isLoading ? {disabled: true} : {}) }
                onClick={fetchAccompagnement}
            />
            {
                acc &&
                <div className="accompagnements">
                    <p>{acc}</p>
                </div>
            }
        </>
    );
}

export default Accompagnement;
