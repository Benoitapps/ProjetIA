import React, {useState} from 'react'
import { postComment } from '../../hook/Comment/postComment.js';

function CommentAdd({recipeId}) {

    const [messages, setMessage] = useState('');
    const   [notes, setNote] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        if(messages === '') return;
        addComment(messages,notes );
        setMessage('');
        setNote('1')
    };

    const addComment = async (messages,notes) => {
        try {
            await postComment(recipeId,messages,notes);
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux commentaire:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className="commentMessage__input" type="text" value={messages} onChange={(e) => setMessage(e.target.value)} />
            <input className="commentNote" type="number" min="1" max="5"  value={notes} onChange={(e) => setNote(e.target.value)} />

            <button type="submit">Ajouter</button>
        </form>
    );
}

export default CommentAdd
