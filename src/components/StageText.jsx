import { motion } from 'motion/react';

function Stage() {
    return (
        <div 
            style={{
                position: 'absolute',
                inset: '0px',
                height: '100vh',
                width: '100vw',
                fontFamily: 'Panchang, Arial, sans-serif',
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
                        fontSize: '6rem',
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