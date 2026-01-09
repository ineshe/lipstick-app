import StageButton from './StageButton';
import './StageText.css';

function Stage() {
    return (
        <div>
            <div className='stage-wrapper viewport-content'>
                <div className='stage-content'>
                    <div className='stage-text'>
                        <h1 className='stage-headline'>
                            Lumines Lips Color<wbr />Crush&reg;
                        </h1>
                        <p className='stage-subline'>
                            Mauris sit amet risus faucibus, pharetra arcu
                        </p>
                    </div>
                    <StageButton />
                </div>
            </div>            
        </div>
    );
}

export default Stage