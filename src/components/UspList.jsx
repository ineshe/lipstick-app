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
        return (
            <motion.div 
                className='usp-item'
                key={usp.id}
                initial= {{ opacity: 0 }}
                whileInView={{ 
                    opacity: 1,
                    transition: { 
                        duration: 0.8,
                        default: { ease: 'easeOut' }
                    }
                }}
                viewport={{ margin: '-30% 0px -30% 0px' }}
            >
                <h2 className='usp-item-headline'>{usp.headline}</h2>
                <p className='usp-item-content'>{usp.content}</p>
            </motion.div>
        );
    });

    return (
        <div className="usp-list-wrapper">
            {uspList}
        </div>
    );
}

export default UspList