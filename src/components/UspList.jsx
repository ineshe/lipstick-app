import { motion } from 'motion/react';
import './UspList.css';

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
        const right = usp.id % 2 === 1 ? '0px' : 'undefined';
        const step = 25;
        const top = `${(usp.id + 1) * step}%`;

        return (
            <motion.div 
                className='usp-animation'
                style={{
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
                <h2 className='usp-headline'>{usp.headline}</h2>
                <p className='usp-content'>{usp.content}</p>
            </motion.div>
        );
    });

    return uspList;
}

export default UspList