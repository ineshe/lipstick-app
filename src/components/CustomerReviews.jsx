import './CustomerReviews.css';

function CustomerReviews() {
    return (
        <div className="customer-reviews-container viewport-content">
            <div className="review-box glowing-border">
                <div className="review-image">
                    <img src="https://placehold.co/50x50/orange/white?text=C" alt="Foto Person" />
                </div>
                <p className="review-title">Hält super gut :D</p>
                <p className="review-content">Ich trage sie täglich im Büro – und selbst nach dem Mittagessen sitzt die Farbe noch perfekt.</p>
                <p className="review-author">Sophie M., (29), Marketing Managerin aus München</p>
            </div>
            <div className="review-box glowing-border">
                <div className="review-image">
                    <img src="https://placehold.co/50x50/orange/white?text=C" alt="Foto Person" />
                </div>
                <p className="review-title">Mein Geheimnis für diesen "Wow"-Moment.</p>
                <p className="review-content">Seit ich Luminous Color Crush verwende, bekomme ich oft Komplimente. Die Farbe hält stundenlang, fühlt sich federleicht an und lässt meinen Teint strahlen. Bei jedem Anlass.</p>
                <p className="review-author">Clara R., (34), Visagistin</p>
            </div>
            <div className="review-box glowing-border">
                <div className="review-image">
                    <img src="https://placehold.co/50x50/orange/white?text=C" alt="Foto Person" />
                </div>
                <p className="review-title">Sofort verliebt!</p>
                <p className="review-content">Die Farbe macht jedes Outfit komplett – Einmal aufgetragen, und ich bin ready für den Tag.</p>
                <p className="review-author">Mira K., (26), Content Creatorin</p>
            </div>
        </div>
    );
}

export default CustomerReviews
