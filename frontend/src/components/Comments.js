// frontend/src/components/Comments.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CommentsContainer = styled.div`
    margin-top: 2rem;
`;

const CommentItem = styled.div`
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
`;

const Comments = ({ profileId }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');

    const fetchComments = async () => {
        const res = await axios.get(`/api/comments/${profileId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        setComments(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`/api/comments/${profileId}`, { content }, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        setComments([...comments, res.data]);
        setContent('');
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <CommentsContainer>
            <h3>Comments</h3>
            {comments.map(comment => (
                <CommentItem key={comment.id}>
                    <p><strong>{comment.User.name}</strong>: {comment.content}</p>
                </CommentItem>
            ))}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Add Comment</button>
            </form>
        </CommentsContainer>
    );
};

export default Comments;
