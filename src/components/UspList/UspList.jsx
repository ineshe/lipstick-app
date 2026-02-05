import './UspList.css';
import Usp from './Usp';
import { usps } from '../../utils/usp-data.js';
import { useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useTransform } from 'motion/react';

function UspList({ scrollYProgress }) {

    const [uspActiveId, setUspActiveId] = useState(null);
    const activeUsp = usps.find(usp => usp.id === uspActiveId);

    const scrollId = useTransform(scrollYProgress, (value) => {
        const start = 0.2; 
        const end = 0.7;
        const sections = 3;

        if (value < start || value > end) return null;

        const progress = (value - start) / (end - start); // 0 → 1
        const index = Math.min(sections - 1, Math.floor(progress * sections));

        return index + 1; // ids: 1, 2, 3
    });

    useMotionValueEvent(scrollId, 'change', (latest) => {
        setUspActiveId((prev) => (prev === latest ? prev : latest));
    });

    return (
        <>
            <div className="usp-wrapper">
                <AnimatePresence mode="wait">
                    {activeUsp && (
                        <Usp key={activeUsp.id} usp={activeUsp} />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default UspList