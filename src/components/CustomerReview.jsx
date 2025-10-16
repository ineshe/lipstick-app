import './CustomerReviews.css';

import { useScroll } from 'motion/react';
import { title } from 'motion/react-client';
import { useRef } from 'react';

function CustomerReview({ review }) {
    
    return (
        <>
            <div>
                <div className="review-image">
                    <img src="https://placehold.co/50x50/orange/white?text=C" alt={`Foto von ${review.author}`} />
                </div>
                <p className="review-title">{review.title}</p>
                <p className="review-content">"{review.content}"</p>
            </div>
                <p className="review-author">- {review.author}</p>
        </>
    );
}

export default CustomerReview;
