import { motion } from 'motion/react';

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
                className='viewport-content'
                style={{
                    // marginTop: '20vh',
                    position: 'relative',
                    top: '30%',
                }}
            >
                <h1
                    style={{
                        color: '#000',
                        WebkitTextStroke: '0.15rem #fff',
                        fontSize: '5rem',
                    }}
                >
                    Velvet Lips Color Crush
                </h1>
                <p>Mauris sit amet risus faucibus, pharetra arcu.</p>
            </div>

        </div>
    );
}

export default Stage