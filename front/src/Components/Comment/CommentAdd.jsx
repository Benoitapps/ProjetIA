import React, {useState} from 'react'
import { postComment } from '../../hook/Comment/postComment.js';

function CommentAdd({addComment}) {

    const [messages, setMessage] = useState('');
    const   [notes, setNote] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        if(messages === '') return;
        addComment(messages,notes );
        setMessage('');
        setNote('1')
    };



    return (
        <form className="recipe__details__comments__form" onSubmit={handleSubmit}>
            <input className="commentNote" type="number" min="1" max="5" value={notes}
                   onChange={(e) => setNote(e.target.value)}/>
            <textarea
                className="commentMessage__input"
                value={messages}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ce plat est délicieux !"
            />

            <button type="submit">Poster</button>
        </form>
    );
}

export default CommentAdd
