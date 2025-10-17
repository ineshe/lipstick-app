import { REVIEWS_DATA } from '../utils/reviews-data';
import './CustomerReviews.css';
import { useRef, useState, useEffect } from 'react';
import CustomerReview from './CustomerReview';

function CustomerReviews() {

    const reviews = REVIEWS_DATA;
    const [index, setIndex] = useState(2);
    const containerRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {        
        const el = itemRefs.current[index];
        el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, [index]);

    return (
        <div className="reviews-container viewport-content">
            <div
                className="reviews-grid"
                ref={containerRef}
            >
                {reviews.map(review => (
                    <div
                        key={review.id}
                        ref={el => (itemRefs.current[review.id] = el)}
                        className="review-box glowing-border"
                    >
                        <CustomerReview review={review} />
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => setIndex(i => Math.max(2, i - 1))} aria-label="previous review">Prev</button>
                <button onClick={() => setIndex(i => Math.min(reviews.length - 1, i + 1))} aria-label="next review" style={{ marginLeft: 8 }}>Next</button>
            </div>
        </div>
    );

}

export default CustomerReviews
