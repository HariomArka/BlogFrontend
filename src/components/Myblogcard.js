import React, { useState, useEffect } from 'react';

const MyBlogcard = ({
    _id,
    image,
    title,
    description,
    author,
    timestamp,
    onReadMore,
    onEdit,
    onDelete,
    showActions = true // Controls whether to show edit/delete buttons
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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


    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onEdit) {
            onEdit(_id);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isDeleting) return;

        // Show confirmation dialog
        const confirmed = window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.');

        if (!confirmed) return;

        setIsDeleting(true);

        if (onDelete) {
            try {
                await onDelete(_id);
            } catch (error) {
                console.error('Error deleting blog:', error);
            } finally {
                setIsDeleting(false);
            }
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

                {/* Action Buttons - Top Right Corner */}
                {/* {showActions && (
                    <div className="absolute top-4 right-4 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={handleEdit}
                            className="bg-white/90 backdrop-blur-sm text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            aria-label="Edit post"
                            title="Edit post"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={`bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 ${isDeleting
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                                }`}
                            aria-label="Delete post"
                            title="Delete post"
                        >
                            {isDeleting ? (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                )} */}

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
                        <div className="text-gray-500 flex items-center space-x-2 text-xs">
                            <span className="truncate max-w-[120px] font-medium">By {author}</span>
                            <span>•</span>
                            <span className="truncate max-w-[120px]">{timestamp}</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MyBlogcard;