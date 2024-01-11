import React, { useState, useEffect} from 'react';
import Switcher from "../Switcher.jsx";
import '@css/Preference/Preferences.css';

function SearchConfigPage() {
    const [disabledSeason, setDisabledSeason] = useState(true);
    const [disabledCalories, setDisabledCalories] = useState(true);
    const [showInputCalories, setShowInputCalories] = useState(false);
    const [caloriesLimit, setCaloriesLimit] = useState(null);

    const links = [
        {
            id: 1,
            title: 'Mes recettes',
            href: '/favoris',
            active: false
        },
        {
            id: 2,
            title: 'Preférences alimentaire',
            href: '/pref',
            active: false
        },
        {
            id: 3,
            title: 'Paramètres de recherche',
            href: '/search-config',
            active: true
        },
    ];

    useEffect(() => {
        fetch('http://localhost:3000/calories', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.calorieLimit) {
                setDisabledCalories(false);
                setShowInputCalories(true);
                setCaloriesLimit(data.calorieLimit);
            }
        })
    }, []);

    const handleClickSeason = () => {
        setDisabledSeason(!disabledSeason);
    }

    const handleClickCalories = () => {
        setDisabledCalories(!disabledCalories);
        setShowInputCalories(!showInputCalories);

        if (!disabledCalories) {
            fetch('http://localhost:3000/calories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    calories: null
                }),
                credentials: 'include'
            })
            .then(() => {
                setShowInputCalories(false);
                let input = document.querySelector('input[type="number"]');
                input.value = '';
            })
        }
    }

    const handleClickSaveCalories = () => {
        let calories = document.querySelector('input[type="number"]').value;

        fetch('http://localhost:3000/calories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                calories
            }),
            credentials: 'include'
        })
    }

    return (
        <div className='preferences'>
            <Switcher
                links={links}
            />
            <div>
                Parametre de recherche
            </div>
            <div>
                <div>
                    {/* <span>
                        Saisonnalité des aliments dans la recherche
                    </span>
                    <button onClick={() => handleClickSeason()}>
                        {
                            disabledSeason ? 'désactivé' : 'activé'
                        }
                    </button> */}
                </div>

                <div>
                    <span>
                        Recherche de recette pas nombre de calories
                    </span>
                    <button onClick={() => handleClickCalories()}>
                        {
                            disabledCalories ? 'désactivé' : 'activé'
                        }
                    </button>
                    {
                        !disabledCalories &&
                        <div>
                            <span>
                                Nombre de calories
                            </span>
                            <input type="number" value={caloriesLimit}/>
                            <button onClick={() => handleClickSaveCalories()}>
                                Sauvegarder le nombre de calories
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchConfigPage;
