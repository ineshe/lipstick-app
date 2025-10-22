import { REVIEWS_DATA } from '../utils/reviews-data';
import './CustomerReviews.css';
import { useRef, useState, useEffect } from 'react';
import CustomerReview from './CustomerReview';
import { motion } from 'motion/react';

function CustomerReviews() {

    const reviews = REVIEWS_DATA;
    const [currentIndex, setCurrentIndex] = useState(2);
    const scrollRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        const el = itemRefs.current[currentIndex];
        el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, [currentIndex]);

    return (
        <div className="reviews-container viewport-content">
            <div
                className="reviews-grid"
                ref={scrollRef}
            >
                {reviews.map(review => (
                    <motion.div
                        key={review.id}
                        ref={el => (itemRefs.current[review.id] = el)}
                        className="review-box glowing-border"
                        viewport={{ root: scrollRef, amount: 0.2 }}
                    >
                        <CustomerReview review={review} />
                    </motion.div>
                ))}
            </div>
            <div className="review-buttons">
                <button className="glowing-border" onClick={() => setCurrentIndex(i => Math.max(2, i - 1))} aria-label="previous review">Prev</button>
                <button className="glowing-border" onClick={() => setCurrentIndex(i => Math.min(reviews.length - 1, i + 1))} aria-label="next review">Next</button>
            </div>
        </div>
    );

}

export default CustomerReviews
