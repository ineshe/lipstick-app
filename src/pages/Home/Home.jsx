import LipstickLine from "../../components/LipstickLine";
import LipstickModel from "../../components/LipstickModel";
import CustomerReviews from "../../components/CustomerReviews";
import Stage from "../../components/StageText";
import UspList from "../../components/UspList/UspList";
import { useScroll } from "motion/react";
import { useRef } from 'react';
import "./Home.css";

function Home() {
  const animationSectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
      target: animationSectionRef,
      offset: ['start start', 'end end']
  });

/*   useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(scrollYProgress);
  }); */

  return (
    <>
      <div className="page-home">

        <div 
          className="animation-section"
          ref={animationSectionRef}
        >
          <LipstickModel scrollYProgress={scrollYProgress} />

        
          <div className="hero-section">
            <LipstickLine />
            <Stage />
          </div>

          <UspList scrollYProgress={scrollYProgress} />

        </div>

        <CustomerReviews />
      </div>

    </>
  );
}

export default Home
 
