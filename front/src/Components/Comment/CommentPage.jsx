import React from 'react'
import CommentList from './CommentList.jsx'

function CommentPage({recipeId}) {

    return (
        <>
            <h1> Mes Commentaire </h1>

            <div > <CommentList recipeId={recipeId}/> </div>

        </>
    )
}

export default CommentPage
