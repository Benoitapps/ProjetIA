import React, {useState} from 'react'
import { postComment } from '../../hook/Comment/postComment.js';

function CommentAdd({addComment}) {
    const [messages, setMessage] = useState('');
    const   [notes, setNote] = useState(0);
    const [stars, setStars] = useState([
        {
            id: 1,
            selected: false
        },
        {
            id: 2,
            selected: false
        },
        {
            id: 3,
            selected: false
        },
        {
            id: 4,
            selected: false
        },
        {
            id: 5,
            selected: false
        }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        if(messages === '' || notes === 0) return;
        addComment(messages,notes );
        setMessage('');
    };

    function handleStarClick(starId) {
        const newStars = stars.map((star) => {
            if (star.id <= starId) {
                return {
                    ...star,
                    selected: true
                };
            } else {
                return {
                    ...star,
                    selected: false
                };
            }
        });
        setStars(newStars);
        setNote(starId);
    }

    return (
        <form className="recipe__details__comments__form" onSubmit={handleSubmit}>
            <ul className="recipe__details__comments__form__stars">
                {
                    stars.map((star, index) => {
                        return (
                            <li
                                key={index}
                                data-note={index}
                                className="coach-review__stars__item"
                                onClick={() => {
                                    handleStarClick(star.id)
                                }}
                            >
                                {
                                    star.selected ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27"
                                             viewBox="0 0 28 27" fill="none">
                                            <path
                                                d="M13.8 0L9.53375 8.64375L0 10.0225L6.9 16.7525L5.26875 26.25L13.8 21.7688L22.3313 26.25L20.7 16.7525L27.6 10.0312L18.0663 8.64375L13.8 0Z"
                                                fill="var(--primary)"/>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="27"
                                             viewBox="0 0 28 27" fill="none">
                                            <path
                                                d="M13.8 4.2375L16.3875 9.46875L16.8188 10.4062L17.7563 10.5475L23.5312 11.3812L19.425 15.4125L18.7213 16.0963L18.8913 17.0338L19.875 22.7812L14.7087 20.0712L13.8 19.6875L12.9288 20.1463L7.7625 22.8187L8.7 17.0725L8.86875 16.135L8.175 15.4125L4.03125 11.335L9.80625 10.5L10.7438 10.3587L11.175 9.42125L13.8 4.2375ZM13.8 0L9.53375 8.64375L0 10.0225L6.9 16.7525L5.26875 26.25L13.8 21.7688L22.3313 26.25L20.7 16.7525L27.6 10.0312L18.0662 8.64375L13.8 0Z"
                                                fill="var(--primary)"/>
                                        </svg>
                                }
                            </li>
                        )
                    })
                }
            </ul>
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
