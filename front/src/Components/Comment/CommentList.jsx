import React, {useEffect, useState} from 'react'
import CommentItem from './CommentItem.jsx';
import {getComment} from "../../hook/Comment/getComment.js";

function CommentList({comments}) {



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
