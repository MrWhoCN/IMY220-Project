import React, { useState } from 'react';
import './CommentsSection.css';

const CommentsSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment(''); // Clear input field after adding the comment
        }
    };

    return (
        <div className="commentSection">
            <h3>Comments</h3>
            <div className="commentInput">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Leave a comment..."
                />
                <button onClick={handleAddComment}>Submit</button>
            </div>
            <div className="commentsList">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="commentItem">
                            {comment}
                        </div>
                    ))
                ) : (
                    <div className="noCommentsMessage">No comments yet. Be the first to comment!</div>
                )}
            </div>
        </div>
    );
};

export default CommentsSection;