import React, {useEffect, useState} from 'react';
import RecipeNote from "../RecipeNote.jsx";
import {getComment} from "../../hook/Comment/getComment.js";

function FavorisRecipe({ name, description, id, handleStarClick }) {
    const [notes, setNotes] = useState([]);

    function getNotes() {
        getComment(id)
            .then(data => {
                setNotes(data.comment.map(comment => comment.note));
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des commentaires :', error);
            });
    }

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div className="favorites__card__content">
            <p className="favorites__card__content__name">{name}</p>
            <RecipeNote notes={notes} starSize="small"/>
            <p className="favorites__card__content__description">{description}</p>
        </div>
    );
}

export default FavorisRecipe;