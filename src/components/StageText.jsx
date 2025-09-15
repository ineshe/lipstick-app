import StageButton from './StageButton';

function Stage() {
    return (
        <div 
            style={{
                position: 'absolute',
                inset: '0px',
                height: '100vh',
                width: '100vw',
            }}
        >
            <div 
                style={{
                    position: 'relative',
                    marginTop: '14%',
                    marginLeft: '5%',
                }}
            >
                <h1
                    style={{
                        textShadow: '0 4px 16px rgba(0,0,0,0.15)',
                        fontSize: '5rem',
                        textTransform:'lowercase',
                        fontFamily: 'Panchang, Arial, sans-serif',
                        marginBlock: '0.75em',
                    }}
                >
                    Velvet Lips Color Crush
                </h1>
                <p
                    style={{
                        marginBlock: '1.5rem',
                    }}
                >Mauris sit amet risus faucibus, pharetra arcu</p>
                <StageButton />
            </div>

        </div>
    );
}

export default Stage