import React, {useEffect, useState} from 'react'
import CommentList from './CommentList.jsx'
import CommentAdd from './CommentAdd.jsx'
import {getComment} from "../../hook/Comment/getComment.js";
import {postComment} from "../../hook/Comment/postComment.js";

function CommentPage({recipeId}) {

    const [comments, setComment] = useState([]);

    const fetchComment = async () => {
        const data = await getComment(recipeId);
        setComment(data.comment);
    }

    useEffect(() => {
        fetchComment();

    }, [])

    const addComment = async (messages,notes) => {
        try {
            await postComment(recipeId,messages,notes);
            fetchComment();
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux commentaire:', error);
        }
    }



    return (
        <>
            <h1>  Commentaires </h1>

            <div > <CommentAdd addComment={addComment}/></div>
            <div > <CommentList comments={comments}/> </div>

        </>
    )
}

export default CommentPage
