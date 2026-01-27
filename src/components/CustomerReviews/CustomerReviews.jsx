import { REVIEWS_DATA } from '../../utils/reviews-data';
import './CustomerReviews.css';
import { useState } from 'react';
import CustomerReview from './CustomerReview';
import { motion, AnimatePresence } from 'motion/react';

function CustomerReviews() {
    const reviews = REVIEWS_DATA;
    const visibleCount = 3; // Number of cards visible at once
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

    const maxIndex = Math.max(0, reviews.length - visibleCount);

    function handleClick(targetIndex) {
        const newIndex = Math.max(0, Math.min(maxIndex, targetIndex));
        
        // Set direction based on navigation
        setDirection(newIndex > currentIndex ? 1 : -1);
        setCurrentIndex(newIndex);
    }

    // Get the visible slide of reviews
    const visibleReviews = reviews.slice(currentIndex, currentIndex + visibleCount);

    const cardVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '105%' : '-105%',
            opacity: 1,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.36,
                ease: 'easeOut'
            }
        },
        exit: (direction) => ({
            x: direction > 0 ? '-105%' : '105%',
            opacity: 0,
            transition: {
                duration: 0.36,
                ease: 'easeIn'
            }
        })
    };

    return (
        <div className="reviews-container viewport-content">
            <h2 className="reviews-title">Lass dich inspirieren von den Meinungen unserer Kunden.</h2>
            <div className="reviews-grid">
                <AnimatePresence mode="sync" custom={direction} initial={false}>
                    {visibleReviews.map((review, index) => (
                        <motion.div
                            key={`${currentIndex}-${index}`}
                            className="review-box"
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <CustomerReview review={review} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className="review-buttons">
                <button 
                    className="review-button background" 
                    onClick={() => handleClick(currentIndex - 1)} 
                    aria-label="previous review"
                    disabled={currentIndex === 0}
                >
                    Prev
                </button>
                <button 
                    className="review-button background" 
                    onClick={() => handleClick(currentIndex + 1)} 
                    aria-label="next review"
                    disabled={currentIndex >= maxIndex}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default CustomerReviews;
