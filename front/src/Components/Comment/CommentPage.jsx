import React, {useEffect, useState} from 'react'
import CommentList from './CommentList.jsx'
import CommentAdd from './CommentAdd.jsx'
import {getComment} from "../../hook/Comment/getComment.js";
import {postComment} from "../../hook/Comment/postComment.js";

function CommentPage({recipeId, commentsNote, isLogged}) {

    const [comments, setComment] = useState([]);

    const fetchComment = async () => {
        const data = await getComment(recipeId);
        setComment(data.comment);
        commentsNote(data.comment.map(comment => comment.note));
    }

    useEffect(() => {
        fetchComment();

    }, [recipeId])

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

           {isLogged? <h3>Poster un commentaire</h3>:null}
           {isLogged?<CommentAdd addComment={addComment}/>:null}

            <CommentList comments={comments}/>
        </section>
    )
}

export default CommentPage
