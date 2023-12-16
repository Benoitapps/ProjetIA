import React from 'react'

function CommentItem({data}) {

    return (
        <>
            <div className="commentaireItem">
            {data.name}:
            {data.note}
            {data.commentaire}
            </div>

        </>
    )
}

export default CommentItem
