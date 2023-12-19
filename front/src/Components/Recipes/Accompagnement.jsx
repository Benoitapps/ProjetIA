import React, { useEffect, useState } from 'react';
import { getAccompagnement } from '../../hook/Accompagenement/getAcc.js';
function Accompagnement({ recipeName }) {

    const [acc, setAcc] = useState('');

    const fetchAccompagnement = async () => {
        const data = await getAccompagnement(recipeName);
        setAcc(data.answer);
    };

    return (
        <>
            <button type="button" onClick={fetchAccompagnement}>Proposer Accompagnement</button>
            <div className="Accompagnement">
                <p>{acc}</p>
            </div>
        </>
    );
}

export default Accompagnement;
