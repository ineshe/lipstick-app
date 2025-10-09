import './StageButton.css';

function StageButton() {
    return (
        <button
            className="background"
            style={{
                color: 'white',
                marginTop: '1.5rem',
                borderRadius: '2px',
                fontWeight: '600',
                fontSize: '1.2rem',
                padding: '1rem',
            }}
        >Jetzt sichern</button>
    );
}

export default StageButton