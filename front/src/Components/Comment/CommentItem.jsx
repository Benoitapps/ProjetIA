import React, {useEffect, useState} from 'react'

function CommentItem({data}) {
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

    useEffect(() => {
        const newStars = stars.map((star) => {
            if (star.id <= data.note) {
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
    }, [data.note]);

    return (
        <li className="comment">
            <div className="comment__head">
                <img className="comment__head__avatar" src="https://thispersondoesnotexist.com/" alt="avatar"/>
                <div>
                    <p className="comment__head__name">{data.name}</p>
                    <ul className="comment__head__note">
                        {
                            stars.map((star, index) => {
                                return (
                                    <li
                                        key={index}
                                    >
                                        {
                                            star.selected ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18"
                                                     viewBox="0 0 19 18" fill="none">
                                                    <path
                                                        d="M9.79998 0L6.95581 5.7625L0.599976 6.68167L5.19998 11.1683L4.11248 17.5L9.79998 14.5125L15.4875 17.5L14.4 11.1683L19 6.6875L12.6441 5.7625L9.79998 0Z"
                                                        fill="var(--primary)"/>
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18"
                                                     viewBox="0 0 19 18" fill="none">
                                                <path
                                                        d="M9.2 2.825L10.925 6.3125L11.2125 6.9375L11.8375 7.03167L15.6875 7.5875L12.95 10.275L12.4808 10.7308L12.5942 11.3558L13.25 15.1875L9.80583 13.3808L9.2 13.125L8.61917 13.4308L5.175 15.2125L5.8 11.3817L5.9125 10.7567L5.45 10.275L2.6875 7.55667L6.5375 7L7.1625 6.90583L7.45 6.28083L9.2 2.825ZM9.2 0L6.35583 5.7625L0 6.68167L4.6 11.1683L3.5125 17.5L9.2 14.5125L14.8875 17.5L13.8 11.1683L18.4 6.6875L12.0442 5.7625L9.2 0Z"
                                                        fill="var(--primary)"/>
                                                </svg>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <p className="comment__body">{data.commentaire}</p>
        </li>
    )
}

export default CommentItem
