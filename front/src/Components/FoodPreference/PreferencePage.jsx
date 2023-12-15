import React, {useEffect, useState} from 'react';
import PreferenceItem from "./PreferenceItem.jsx";
import PreferenceInput from "./PreferenceInput.jsx";
import '@css/Preference/Preferences.css';
import {addFoodPreference} from "../../hook/foodPreference/addFoodPreference.js";
import {getFoodPreference} from "../../hook/foodPreference/getFoodPreference.js";
import {deleteFoodPreference} from "../../hook/foodPreference/deleteFoodPreference.js";

function PreferencePage() {
    const [prefs, setPref] = useState([]);

    const addfood = async (foodname) => {
        if (foodname) {
            const result = await addFoodPreference(foodname);
            getFood();
        }

    };

    const getFood = async () => {
        const result = await getFoodPreference();
        setPref(result.foodPreference)
    };

    const deleteFood = async (id) => {
        await deleteFoodPreference(id);
        getFood();
    }

    useEffect(() => {
        getFood();
    }, []);


    const addFoodName = (food) => {
        addfood(food.name);
    };
    return (
        <>
            <div className='preferences'>
                <PreferenceInput addFoodName={addFoodName} />
                <div className='preferences__list'>
                    {
                        prefs?.length>0 ?
                        prefs.map((pref, index) => (
                            <PreferenceItem name={pref.name} key={index} id={pref.id} deleteFood={deleteFood} />
                        )):<p>Pas de preferences</p>
                    }
                    </div>
                </div>
        </>
    );
}

export default PreferencePage;
