import React, {useEffect, useState} from 'react'
import CommentItem from './CommentItem.jsx';

function CommentList({comments}) {
return (
        <section className="recipe__details__comments__allcomments">
            <h3>Commentaires</h3>
            <ul>
                {
                    comments.map((comment, index) => (
                        <CommentItem key={index} data={comment} />
                    ))
                }
            </ul>
        </section>
    )
}

export default CommentList
