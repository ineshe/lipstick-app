import StageButton from './StageButton';
import './StageText.css';

function Stage() {
    return (
        <div className='stage-wrapper viewport-content'>
            <div className='stage-content'>
                <h1 className='stage-headline'>
                    Lumines Lips Color Crush
                </h1>
                <p className='stage-subline'>
                    Mauris sit amet risus faucibus, pharetra arcu
                </p>
                <StageButton />
            </div>
        </div>
    );
}

export default Stage