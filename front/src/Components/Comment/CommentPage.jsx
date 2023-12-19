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
        <section className="recipe__details__comments">
            <h3>Poster un commentaire</h3>

            <CommentAdd addComment={addComment}/>
            <CommentList comments={comments}/>
        </section>
    )
}

export default CommentPage
