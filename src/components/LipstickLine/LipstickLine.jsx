import "./LipstickLine.css";
import { useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { motion } from 'motion/react';

function LipstickLine() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false);
    const THRESHOLD = 150;

    useMotionValueEvent(scrollY, "change", (current) => {
        setHidden(current < THRESHOLD ? false : true)
    })

    return (
        <div className={`lipstick-line-wrapper ${hidden ? "hidden" : ""}`}>
            <motion.svg
                id="lipstick-line"
                width="100%"
                height="100vh"
                viewBox="0 0 508 209"
                preserveAspectRatio="xMinYMid slice"
            >
                <defs>
                    <mask 
                        id="revealMask"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="508"
                        height="209"
                    >
                        <motion.path
                            d="M 14,170 C 28,134 47,100 68,65 84,41 103,9 116,0 c 8,11 18,55 22,81 10,40 15,81 38,88 14,-8 37,-39 48,-53 17,-24 34,-55 59,-58 22,22 23,57 59,83 61,6 105,-37 149,-88"
                            fill="none"
                            stroke="white"
                            strokeWidth="80"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                        />
                    </mask>

                    <filter id="shadow">
                        <feDropShadow
                            dx="8"
                            dy="8"
                            stdDeviation="6"
                            floodOpacity="0.4"
                        />
                    </filter>
                </defs>

                <g filter="url(#shadow)">
                    <g mask="url(#revealMask)">
                        <image
                            href="/assets/Strich_Render_big.webp"
                            x="0"
                            y="0"
                            width="508"
                            height="209"
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </g>
                </g>
            </motion.svg>
        </div>
    )
}

export default LipstickLine
