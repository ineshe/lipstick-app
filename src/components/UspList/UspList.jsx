import './UspList.css';
import Usp from './Usp';
import { useState } from 'react';
import { usps } from './usp-data.js';

function UspList() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="usp-list-wrapper viewport-content">
            {usps.map((usp, index) => (
                <Usp key={usp.id} usp={usp} isActive={index === activeIndex} />
            ))}
        </div>
    );
}

export default UspList