import { useEffect, useRef } from 'react'
import { useScroll, useMotionValueEvent } from "motion/react"
import './Lipstick.css'

function Lipstick() {
    const svgRef = useRef(null);
    const imgRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: svgRef,
        offset: ["start center", "end center"],
    })

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const svg = svgRef.current;
        const path = svg.querySelector('#lipstickPath');
        const img = imgRef.current;

        if (!path) { 
            console.error('Pfad #lipstickPath nicht gefunden');
            return;
        }

        const length = path.getTotalLength();
        const pt = path.getPointAtLength(length * latest);

        console.log(latest);
        

        if(latest === 1) {
            const absTM = svg.getCTM();
            const absPt = pt.matrixTransform(absTM);

            img.style.position  = "absolute";
            img.style.left  = `${absPt.x}px`;
            img.style.top   = `${absPt.y}px`;
            return;
        }
        
        const ctm = svg.getScreenCTM();

        const screenPt = pt.matrixTransform(ctm);
        
        img.style.position  = "fixed";
        img.style.left  = `${screenPt.x}px`;
        img.style.top   = `${screenPt.y}px`;
    });
    
    return (
        <>
            <div className="lipstick-wrapper" style={{ position: "relative", height: "600vh", width: "100%" }}>
                <svg 
                    ref={svgRef} 
                    viewBox="0 0 12 34" 
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
                        d="m12 0-6 5v26"
                        fill="none" 
                        stroke="#ccc"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
                <img
                    ref={imgRef} 
                    className="lipstick"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAGQCAYAAAA5juetAAAAAXNSR0IArs4c6QAABItJREFUeF7t1LENwDAMBDF7Oo+SeTNRAngEXUv11xAP7fc533JjgQ1wbHdDgM0PYPQDCLAKxN4PBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmP74Q5p5ix6GsAAAAAElFTkSuQmCC"
                    alt="Lipstick"
                    style={{
                        transform: "translate(-50%, -50%)",
                    }}
                />
            </div>
        </>
    )
}

export default Lipstick