import React from 'react'
import CommentList from './CommentList.jsx'
import CommentAdd from './CommentAdd.jsx'

function CommentPage({recipeId}) {

    return (
        <>
            <h1> Mes Commentaire </h1>

            <div > <CommentAdd recipeId={recipeId}/></div>
            <div > <CommentList recipeId={recipeId}/> </div>

        </>
    )
}

export default CommentPage
