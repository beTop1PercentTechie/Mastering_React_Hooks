import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [notification, setNotification] = useState('');
  
  const handleLike = () => {
    setLikeCount(prevCount => prevCount + 1);
    setNotification('Your like has been successfully recorded!');
  };

  useEffect(() => {
    if (!notification) return;
    
    const timer = setTimeout(() => {
      setNotification('');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="like-container">
      <button 
        onClick={handleLike}
        className="like-button"
        aria-label="Like"
      >
        Like
      </button>
      <p className="like-count">Likes: {likeCount}</p>
      {notification && (
        <div className="notification" role="alert">
          {notification}
        </div>
      )}
    </div>
  );
};

export default App;
