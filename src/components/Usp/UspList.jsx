import './Usp.css';
import UspItem from './UspItem.jsx';
import { usps } from '../../utils/usp-data.js';
import { useState } from 'react';
import useIsMobile from '../../hooks/use-is-mobile';
import { LazyMotion, domAnimation, AnimatePresence, useMotionValueEvent, useTransform } from 'motion/react';


function UspList({ scrollYProgress }) {

    const [uspActiveId, setUspActiveId] = useState(null);
    const activeUsp = usps.find(usp => usp.id === uspActiveId);
    const { isMobile } = useIsMobile();

    const scrollId = useTransform(scrollYProgress, (value) => {

        var start, end;
        const sections = 3;
        
        if (isMobile) {
            start = 0.24;
            end = 0.95;
        } else {
            start = 0.2;
            end = 0.8;
        }

        if (value < start || value > end) return null;

        const progress = (value - start) / (end - start); // 0 → 1
        const index = Math.min(sections - 1, Math.floor(progress * sections));

        return index + 1; // ids: 1, 2, 3
    });

    useMotionValueEvent(scrollId, 'change', (latest) => {
        setUspActiveId((prev) => (prev === latest ? prev : latest));
    });

    return (
        <LazyMotion features={domAnimation} strict>
            <div className="usp-wrapper">
                <AnimatePresence mode="wait">
                    {activeUsp && (
                        <UspItem key={activeUsp.id} usp={activeUsp} />
                    )}
                </AnimatePresence>
            </div>
        </LazyMotion>
    );
}

export default UspList