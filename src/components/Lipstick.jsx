import { useRef } from 'react'
import { motion, useScroll, useTransform } from "motion/react"
import './Lipstick.css'

function Text({ headline, content, topPos }) {

    return (
        <motion.div 
            style={{
                position: "absolute",
                width: "35%",
                top: topPos
            }}
            initial= {{ opacity: 0 }}
            whileInView={{ 
                opacity: 1,
                transition: { 
                    duration: 0.1,
                    default: { ease: "easeOut" }
                }
            }}
            viewport={{ margin: "-30% 0px -30% 0px" }}
        >
            <h2>{headline}</h2>
            <p>{content}</p>
        </motion.div>
    )
}

function Lipstick() {
    const animationWrapper = useRef(null);

    const { scrollYProgress } = useScroll({
        target: animationWrapper,
    });

    const left = useTransform(scrollYProgress, [0, 0.2], ["75%", "50%"]);
    const rotate = useTransform(scrollYProgress, [0, 0.2], ["45deg", "0deg"]);
    
    return (
        <>
            <div ref={animationWrapper} className="lipstick-animation-wrapper" style={{ position: "relative", height: "500vh", width: "100%" }}>
                <div className="viewport-content" style={{ height: "100%" }}>
                    <motion.img
                        className="lipstick"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAGQCAYAAAA5juetAAAAAXNSR0IArs4c6QAABItJREFUeF7t1LENwDAMBDF7Oo+SeTNRAngEXUv11xAP7fc533JjgQ1wbHdDgM0PYPQDCLAKxN4PBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmFggwCsTcAgFGgZhbIMAoEHMLBBgFYm6BAKNAzC0QYBSIuQUCjAIxt0CAUSDmP74Q5p5ix6GsAAAAAElFTkSuQmCC"
                        alt="Lipstick"
                        style={{
                            position: "sticky",
                            top: "25%",
                            left,
                            rotate,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                    <Text 
                        headline={"Pflegend"}
                        content={"Intensive Farbe trifft auf pflegende Inhaltsstoffe – für samtweiche Lippen mit jedem Auftrag."}
                        topPos={"150vh"}
                    />
                    <Text 
                        headline={"Langanhaltend"}
                        content={"Strahlende Lippenfarbe, die den ganzen Tag hält – ohne Nachschminken, ohne Kompromisse."}
                        topPos={"250vh"}
                    />
                    <Text 
                        headline={"Glanz-Effekt"}
                        content={"Spieglein, Glanz – unwiderstehlich strahlende Lippen mit nur einem Auftrag."}
                        topPos={"350vh"}
                    />
                </div>
            </div>
            <div style={{ height: "100vh", width: "100%" }}></div>
        </>
    )
}

export default Lipstick