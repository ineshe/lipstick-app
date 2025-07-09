import { useRef } from 'react'
import { useScroll, useMotionValueEvent } from "motion/react"
import './Lipstick.css'

function Lipstick() {
    const svgRef = useRef(null);
    const imgRef = useRef(null);
    const wrapperRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: svgRef,
        offset: ["start start", "end center"],
    })

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const svg = svgRef.current;
        const path = svg.querySelector('#lipstickPath');

        if (!path) { 
            console.error('Pfad #lipstickPath nicht gefunden');
            return;
        }

        const length = path.getTotalLength();
        const pt = path.getPointAtLength(length * latest);
        const ctm = svg.getCTM();
        const screenPt = pt.matrixTransform(ctm);        

        const img = imgRef.current;

        // img.style.transform = `translate(${screenPt.x}px, ${screenPt.y}px)`;
        img.style.left  = `${screenPt.x}px`;
        img.style.top   = `${screenPt.y}px`;
    });
    
    return (
        <>
            <div ref={wrapperRef} className="lipstick-wrapper" style={{ position: "relative", height: "500vh", width: "100%" }}>
                <svg 
                    ref={svgRef} 
                    viewBox="0 0 1500 1700" 
                    style=
                    {{ 
                        position: "absolute", 
                        width: "100vw", 
                        height: "auto", 
                        top: 0, 
                        left: 0 
                    }}
                >
                    <path 
                        id="lipstickPath" 
                        d="M1000,200 L200,1000 V1600" 
                        fill="none" 
                        stroke="#ccc"
                    />
                </svg>
                <img
                    ref={imgRef} 
                    className="lipstick"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAGQCAYAAAA5juetAAAAAXNSR0IArs4c6QAABItJREFUeF7t1LENwDAMBDF7Oo+SeTNRAngEXUv11xAP7fc533JjgQ1wbHdDgM0PYPQDCLAKxN4PBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmP74Q5p5ix6GsAAAAAElFTkSuQmCC"
                    alt="Lipstick"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            </div>
        </>
    )
}

export default Lipstick