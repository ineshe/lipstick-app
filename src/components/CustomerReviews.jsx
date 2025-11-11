import { REVIEWS_DATA } from '../utils/reviews-data';
import './CustomerReviews.css';
import { useRef, useState, useEffect } from 'react';
import CustomerReview from './CustomerReview';
import { motion } from 'motion/react';

function CustomerReviews() {

    const reviews = REVIEWS_DATA;
    const [currentIndex, setCurrentIndex] = useState(1);
    const scrollRef = useRef(null);
    const itemRefs = useRef([]);

    function handleClick(targetIndex) {
        setCurrentIndex(targetIndex);
        const el = itemRefs.current[targetIndex];
        if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    return (
        <div className="reviews-container viewport-content">
            <div
                className="reviews-grid"
                ref={scrollRef}
            >
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        ref={el => (itemRefs.current[index] = el)}
                        className="review-box"
                        viewport={{ root: scrollRef, amount: 0.2 }}
                    >
                        <CustomerReview review={review} />
                    </motion.div>
                ))}
            </div>
            <div className="review-buttons">
                <button className="background" onClick={() => handleClick(Math.max(1, currentIndex - 1))} aria-label="previous review">Prev</button>
                <button className="background" onClick={() => handleClick(Math.min(reviews.length - 2, currentIndex + 1))} aria-label="next review">Next</button>
            </div>
        </div>
    );
}

export default CustomerReviews
