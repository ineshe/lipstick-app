import { useEffect, useRef, useState } from 'react'
import './Lipstick.css'
import { motion, useScroll, useTransform, useMotionValue } from "motion/react"
import { animate } from "motion"

function Lipstick() {
    const pathRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const offset = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const path = "M800,0 L0,800 V1600";
    
    return (
        <>
            <div className="lipstick-wrapper" style={{ position: "relative", height: "500vh", width: "100%"}}>
                <svg viewBox="0 0 800 1600" style={{ position: "absolute", width: "100vw", height: "auto", top: 0, left: 0 }}>
                    <path id="lipstickPath" ref={pathRef} d={path} fill="none" stroke="#ccc"/>
                </svg>
                <motion.img
                    className="lipstick"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAGQCAYAAAA5juetAAAAAXNSR0IArs4c6QAABItJREFUeF7t1LENwDAMBDF7Oo+SeTNRAngEXUv11xAP7fc533JjgQ1wbHdDgM0PYPQDCLAKxN4PBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmP74Q5p5ix6GsAAAAAElFTkSuQmCC"
                    alt="Lipstick"
                    style={{
                        position: "fixed",
                        offsetPath: "url(#lipstickPath)",
                        offsetDistance: offset,
                        offsetRotate: "0deg",
                    }}
                />
            </div>
        </>
    )
}

export default Lipstick