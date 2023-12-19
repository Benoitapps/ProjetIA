import React, { useEffect, useState } from 'react';
import { getAccompagnement } from '../../hook/Accompagenement/getAcc.js';
function Accompagnement({ recipeName }) {

    const [acc, setAcc] = useState('');

    const fetchAccompagnement = async () => {
        const data = await getAccompagnement(recipeName);
        setAcc(data.answer);
    };

    useEffect(() => {
        setAcc('');
    }, [recipeName]);

    return (
        <>
            <input
                type="button"
                className="recipe__details__generation"
                value="Proposer des accompagnements"
                onClick={fetchAccompagnement}
            />
            <div className="Accompagnement">
                <p>{acc}</p>
            </div>
        </>
    );
}

export default Accompagnement;
