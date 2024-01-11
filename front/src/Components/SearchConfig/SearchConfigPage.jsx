import React, { useState, useEffect} from 'react';
import Switcher from "../Switcher.jsx";
import '@css/SearchConfig/SearchConfig.css';

function SearchConfigPage() {
    const [disabledSeason, setDisabledSeason] = useState(true);
    const [disabledCalories, setDisabledCalories] = useState(true);
    const [showInputCalories, setShowInputCalories] = useState(false);
    const [caloriesLimit, setCaloriesLimit] = useState(0);

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
            })
        }
    }

    const handleClickSaveCalories = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/calories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                calories: caloriesLimit
            }),
            credentials: 'include'
        })
    }

    return (
        <div className='search-config'>
            <Switcher
                links={links}
            />
            <ul className='search-config__options'>
                {/*<li>
                     <span>
                        Saisonnalité des aliments dans la recherche
                    </span>
                    <button onClick={() => handleClickSeason()}>
                        {
                            disabledSeason ? 'désactivé' : 'activé'
                        }
                    </button>
                </li>*/}

                <li className='search-config__options__item'>
                    <div className='search-config__options__item__option'>
                        <label>
                            Recherche de recettes par nombre de calories

                            <div className='switch'>
                                <input type="checkbox"
                                    onChange={() => {handleClickCalories()}}
                                    checked={!disabledCalories}
                                />
                                <span className="slider"></span>
                            </div>
                        </label>
                    </div>
                    {
                      !disabledCalories &&
                      <div className='search-config__options__item__more'>
                          <span>
                              Nombre de calories
                          </span>
                          <form className='search-config__options__item__more__field' onSubmit={handleClickSaveCalories}>
                              <input type="number" value={caloriesLimit} onChange={(e) => setCaloriesLimit(e.target.value)}/>
                              <button>
                                  Sauvegarder
                              </button>
                          </form>
                      </div>
                    }
                </li>
            </ul>
        </div>
    );
}

export default SearchConfigPage;
