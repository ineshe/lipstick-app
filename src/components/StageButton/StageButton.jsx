import './StageButton.css';
import ChevronRight from '../../assets/icons/chevron-right.svg';

function StageButton() {
    return (
        <button className="stage-button glow-on-hover">
            Jetzt sichern
            <ChevronRight size={50} />
        </button>
    );
}

export default StageButton
