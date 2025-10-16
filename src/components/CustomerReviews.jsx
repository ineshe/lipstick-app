import { REVIEWS_DATA } from '../utils/reviews-data';
import './CustomerReviews.css';
import { useRef, useState } from 'react';
import CustomerReview from './CustomerReview';

function CustomerReviews() {

    const reviews = REVIEWS_DATA;
    const firstSlide = reviews[0];
    const secondSlide = reviews[1];
    const thirdSlide = reviews[2];

    const carouselRef = useRef(null);

    // array of refs for each review DOM node (must be direct children of .reviews-grid)
    const itemRefs = useRef([]);

    const [rvIndex, setRvIndex] = useState(1);

    const onClickNext = () => {
        const next = (rvIndex + 1) % reviews.length;
        setRvIndex(next);
        scrollToIndex(next);
    };

    const onClickPrev = () => {
        const prev = (rvIndex - 1 + reviews.length) % reviews.length;
        setRvIndex(prev);
        scrollToIndex(prev);
    };

    const scrollToIndex = (index) => {
        const el = itemRefs.current[index];
        if (!el) return;
        // center the item in the horizontal scroll container; scroll-snap will help final alignment
        el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };

    return (
        <div className="reviews-container viewport-content">
            <div ref={carouselRef} className="reviews-grid">
                {reviews.map((review, idx) => (
                    // direct child of .reviews-grid — attach ref here so scrollIntoView targets whole grid item
                    <div
                        key={review.id}
                        ref={el => (itemRefs.current[idx] = el)}
                        // wrapper class is optional — grid sizing comes from the child (.review-box)
                        className="review-box glowing-border">
                        <CustomerReview review={review} />
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 12 }}>
                <button onClick={onClickPrev} aria-label="previous review">Prev</button>
                <button onClick={onClickNext} aria-label="next review" style={{ marginLeft: 8 }}>Next</button>
            </div>
        </div>
    );

}

export default CustomerReviews
