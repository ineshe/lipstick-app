import './CustomerReviews.css';

import { useScroll } from 'motion/react';
import { title } from 'motion/react-client';
import { useRef } from 'react';

function CustomerReview({ review }) {
    
    return (
        <>
            <div className="review-header">
                <div className="review-image">
                    <img src="https://placehold.co/50x50/orange/white?text=C" alt={`Foto von ${review.authorName}`} />
                </div>
                <div>
                    <p className="author-name">{review.authorName}</p>
                    <p className="author-city">{review.authorAge} Jahre aus {review.authorCity}</p>
                </div>
            </div>
            <hr className='line'/>
            <p className="review-title">{review.title}</p>
            <p className="review-content">"{review.content}"</p>
        </>
    );
}

export default CustomerReview;
