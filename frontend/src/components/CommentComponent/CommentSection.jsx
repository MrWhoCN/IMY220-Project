import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import './CommentsSection.css';

const CommentsSection = ({ playlistId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userId = Cookies.get('userId'); // 获取保存的 userId

    // Fetch comments when the component mounts
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/playlists/${playlistId}/comments`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();
                setComments(data); // Set comments data
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [playlistId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`/playlists/${playlistId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, content: newComment }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            const newCommentData = await response.json();

            // Update comments state to include the new comment
            setComments([...comments, newCommentData]);
            setNewComment(''); // Clear input field
        } catch (error) {
            console.error('Error adding comment:', error);
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
                            <strong>{comment.userId.username}</strong>: {comment.content}
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
