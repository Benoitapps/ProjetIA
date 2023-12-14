import React, {useEffect, useState} from 'react'
import CommentItem from './CommentItem.jsx';
import {getComment} from "../../hook/Comment/getComment.js";

function CommentList({recipeId}) {

    const [comments, setComment] = useState([]);

    const fetchComment = async () => {
        const data = await getComment(recipeId);
        setComment(data.comment);
        console.log("comment", data.comment)
    }

    useEffect(() => {
        fetchComment();

    }, [])

    return (
        <>
            {
                comments.map((comment, index) => (
                    <CommentItem key={index} data={comment} />
                ))
            }
            <div ></div>

        </>
    )
}

export default CommentList
