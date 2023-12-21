import React, { useState, useEffect} from "react";
import starEmptySmall from '../assets/img/star-empty-small.svg';
import starFullSmall from '../assets/img/star-full-small.svg';
import starEmptyBig from '../assets/img/star-empty-big.svg';
import starFullBig from '../assets/img/star-full-big.svg';
import '@css/RecipeNote.css';

function RecipeNote({notes, starSize}) {
    const [note, setNote] = useState(0);
    const [stars, setStars] = useState([
        {
            id: 1,
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        },
        {
            id: 2,
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        },
        {
            id: 3,
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        },
        {
            id: 4,
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        },
        {
            id: 5,
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        }
    ]);
    const [srcEmpty, setSrcEmpty] = useState(null);
    const [srcFull, setSrcFull] = useState(null);

    function getClipPath(percent) {
        return `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
    }

    function initStars() {
        const note= notes.reduce((a, b) => a + b, 0) / notes.length;
        const unit = Math.floor(note)
        const decimal = note.toFixed(1) - unit;

        if(starSize === 'small') {
            setSrcEmpty(starEmptySmall);
            setSrcFull(starFullSmall);
        } else {
            setSrcEmpty(starEmptyBig);
            setSrcFull(starFullBig);
        }

        // Permet de mettre à jour les étoiles en fonction de la note
        setStars(
            stars.map(star => {
                if(star.id <= unit) {
                    return {
                        ...star,
                        clipPath: getClipPath(100)
                    }
                } else if(star.id === unit + 1) {
                    return {
                        ...star,
                        clipPath: getClipPath(decimal * 100)
                    }
                } else {
                    return {
                        ...star,
                        clipPath: getClipPath(0)
                    }
                }
            })
        );
        setNote(note);
    }

    useEffect(() => {
        initStars();
    }, [notes]);

    return (
        <ul className={`recipe-note recipe-note--${starSize}`} title={`Cette recette est notée ${note.toFixed(1)}/5`}>
            {
                stars.map((star, index) => {
                    return (
                        <li
                            key={index}
                            className="recipe-note__star"
                        >
                            <img
                                className="recipe-note__star--full"
                                style={{clipPath: star.clipPath}}
                                src={srcFull}
                                alt=""
                            />
                            <img
                                src={srcEmpty}
                                alt=""
                            />
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default RecipeNote;