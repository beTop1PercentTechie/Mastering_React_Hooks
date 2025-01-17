import React, { useState } from "react";
import './App.css';

function Post() {
  // State for likes and like status
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Handle like/unlike functionality
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  // Add new comment with timestamp
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const commentToAdd = {
        text: newComment,
        timestamp: new Date()
      };
      setComments([...comments, commentToAdd]);
      setNewComment("");
    }
  };

  // Format timestamp to relative time (e.g., "2 minutes ago")
  const formatTimestamp = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
      return 'Just now';
    }
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="post-container">
      <h3 className="post-title">My Awesome Post</h3>
      <p className="post-content">Some interesting content here...</p>

      <div>
        <button 
          onClick={handleLike} 
          className={`like-button ${isLiked ? 'liked' : ''}`}
        >
          {isLiked ? "❤️ Liked" : "🤍 Like"} ({likes})
        </button>
      </div>

      <div className="comments-section">
        <h4 className="comments-title">Comments</h4>
        
        {comments.length > 0 ? (
          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <div className="comment-text">{comment.text}</div>
                <div className="comment-timestamp">
                  {formatTimestamp(comment.timestamp)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        )}

        <div className="comment-input-container">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="comment-input"
          />
          <button 
            onClick={handleAddComment}
            className="post-button"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
