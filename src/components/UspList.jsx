import './UspList.css';
import Usp from './Usp';
import { useState } from 'react';

function UspList() {
    const [activeIndex, setActiveIndex] = useState(0);

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

    return (
        <div className="usp-list-wrapper viewport-content">
            {usps.map((usp, index) => (
                <Usp key={usp.id} usp={usp} isActive={index === activeIndex} />
            ))}
        </div>
    );
}

export default UspList