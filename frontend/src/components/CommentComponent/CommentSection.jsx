import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


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
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
            <div className="flex items-center space-x-4 mb-6">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Leave a comment..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    Submit
                </button>
            </div>
            <div>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="mb-4">
                            <strong className="font-semibold text-gray-700">{comment.userId.username}</strong>: {comment.content}
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">No comments yet. Be the first to comment!</div>
                )}
            </div>
        </div>
    );

};

export default CommentsSection;
