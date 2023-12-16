import React from 'react'

function CommentItem({data}) {

    return (
        <>
            <div className="commentaireItem">
            De:{data.name}:
            Note:{data.note}
            Commentaires:{data.commentaire}
            </div>

        </>
    )
}

export default CommentItem
