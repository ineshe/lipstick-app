import { motion } from 'motion/react';

function UspList() {
    const usps = [{
        id: 0,
        headline: 'Pflegend',
        content: 'Intensive Farbe trifft auf pflegende Inhaltsstoffe – für samtweiche Lippen mit jedem Auftrag.'
    }, {
        id: 1,
        headline: 'Langanhaltend',
        content: 'Strahlende Lippenfarbe, die den ganzen Tag hält – ohne Nachschminken, ohne Kompromisse.'
    }, {
        id: 2,
        headline: 'Glanz-Effekt',
        content: 'Spieglein, Glanz – unwiderstehlich strahlende Lippen mit nur einem Auftrag.'
    }];

    const uspList = usps.map((usp) => {
        const start = 50;
        const step = 100;
        const top = `${start + (usp.id + 1) * step}vh`;
        const right = usp.id % 2 === 1 ? '0px' : 'undefined';

        return (
            <motion.div 
                style={{
                    position: 'absolute',
                    maxWidth: '35%',
                    padding: '1rem',
                    top,
                    right,
                }}
                key={usp.id}
                initial= {{ opacity: 0 }}
                whileInView={{ 
                    opacity: 1,
                    transition: { 
                        duration: 0.1,
                        default: { ease: 'easeOut' }
                    }
                }}
                viewport={{ margin: '-30% 0px -30% 0px' }}
            >
                <h2 
                    style={{
                        fontSize: '2.5rem',
                        marginBlock: '0',
                        fontFamily: 'Panchang',
                        textTransform:'lowercase',
                    }}
                >{usp.headline}</h2>
                <p
                    style={{
                        fontSize: '1.2rem',
                        color: '#999',
                        marginBlock: '0.5rem',
                    }}
                >{usp.content}</p>
            </motion.div>
        );
    });

    return uspList;
}

export default UspList