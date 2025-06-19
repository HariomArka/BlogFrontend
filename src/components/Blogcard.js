import React, { useState, useEffect } from 'react';

const Blogcard = ({ _id, image, title, description, likes: initialLikes, author, timestamp, onReadMore  }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  
const handleLike = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (isLiking) return;

  setIsLiking(true);

  try {
    console.log(_id);
    const response = await fetch(`/api/blogs/${_id}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const updatedBlog = await response.json();
      // Backend returns the full blog object, so extract likes from it
      setLikes(updatedBlog.likes);
    } else if (response.status === 404) {
      // Handle invalid ID or blog not found
      const errorData = await response.json();
      console.error('Blog not found or invalid ID:', errorData.error);
      // Optionally show user feedback here
    } else if (response.status === 500) {
      // Handle server errors
      const errorData = await response.json();
      console.error('Server error:', errorData.error);
      // Optionally show user feedback here
    } else {
      // Handle other HTTP errors
      console.error('Failed to update likes. Status:', response.status);
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Network error updating likes:', error);
    // Optionally show user feedback here
  } finally {
    setIsLiking(false);
  }
};

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <>
      {/* Blog Card */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 max-w-sm mx-auto overflow-hidden transform hover:-translate-y-2 group">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
            <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-indigo-700 transition-colors duration-300 cursor-pointer"
              onClick={toggleModal}>
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed font-light">
            {description}
          </p>
          
          <div className="flex items-center justify-between text-sm mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded-full p-1 ${
                  isLiking 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50'
                }`}
                aria-label="Like post"
              >
                <svg 
                  className="w-5 h-5" 
                  fill={isLiking ? "none" : "currentColor"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ opacity: isLiking ? 0.5 : 1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <span className="text-gray-700 font-medium">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
            </div>
            
            <div className="text-gray-500 flex items-center space-x-2 text-xs">
              <span className="truncate max-w-[80px] font-medium">By {author}</span>
              <span className="hidden sm:inline">•</span>
              <span className="truncate max-w-[80px]">{timestamp}</span>
            </div>
          </div>
          
          <button
            onClick={onReadMore}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
          >
            Read More
          </button>
        </div>
      </div>
    </>
  );
};

export default Blogcard;