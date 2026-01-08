import './UspList.css';
import Usp from './Usp';
import { usps } from './usp-data.js';
import { useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useTransform } from 'motion/react';

function UspList({ scrollYProgress }) {

    const [uspActiveId, setUspActiveId] = useState(null);

    const scrollId = useTransform(scrollYProgress, (value) => {
        if (value > 0 && value < 0.4) return 1;
        if (value >= 0.4 && value < 0.6) return 2;
        if (value >= 0.6 && value < 0.8) return 3;
        return null;
    });

    useMotionValueEvent(scrollId, 'change', (latest) => {
        setUspActiveId((prev) => (prev === latest ? prev : latest));
    });

    return (
        <>
            <div className="usp-list-wrapper ">
                <AnimatePresence mode="wait">
                    {uspActiveId !== null && (
                        <Usp key={uspActiveId} usp={usps.find(usp => usp.id === uspActiveId)} />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

export default UspList