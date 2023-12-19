import React from 'react'

function CommentItem({data}) {

    return (
        <li className="comment">
            <div className="comment__head">
                <img className="comment__head__avatar" src="https://thispersondoesnotexist.com/" alt="avatar"/>
                <div>
                    <p className="comment__head__name">{data.name}</p>
                    <p className="comment__head__note">{data.note}</p>
                </div>
            </div>
            <p className="comment__body">{data.commentaire}</p>
        </li>
    )
}

export default CommentItem
