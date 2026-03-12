import './CustomerReviews.css';

function CustomerReview({ review }) {
    
    return (
        <>
            <div className="review-header">
                <div className="review-icon"></div>
                <div>
                    <p className="author-name">{review.authorName}, {review.authorAge}</p>
                    {/* <p className="author-city">aus {review.authorCity}</p> */}
                </div>
            </div>
            <hr className='line'/>
            <p className="review-title">{review.title}</p>
            <p className="review-content">{review.content}</p>
        </>
    );
}

export default CustomerReview;
