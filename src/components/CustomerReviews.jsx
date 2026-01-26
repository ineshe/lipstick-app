import { REVIEWS_DATA } from '../utils/reviews-data';
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

    // Get the visible slice of reviews
    const visibleReviews = reviews.slice(currentIndex, currentIndex + visibleCount);

    const cardVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: 'easeOut'
            }
        },
        exit: (direction) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.3,
                ease: 'easeIn'
            }
        })
    };

    return (
        <div className="reviews-container viewport-content">
            <h2>Lass dich inspirieren von den Meinungen unserer Kunden.</h2>
            <div className="reviews-grid">
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    {visibleReviews.map((review) => (
                        <motion.div
                            key={review.id}
                            className="review-box"
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            layout
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

export default CustomerReviews
