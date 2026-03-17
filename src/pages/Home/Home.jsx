import LipstickBackground from "../../components/LipstickBackground/LipstickBackground";
import LipstickLine from "../../components/LipstickLine";
import LipstickModel from "../../components/LipstickModel";
import CustomerReviews from "../../components/CustomerReviews/CustomerReviews";
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

  return (
    <>
      <div className="page-home">

        <div 
          className="animation-section"
          ref={animationSectionRef}
        >
          <LipstickModel scrollYProgress={scrollYProgress} />

          <LipstickLine />

          <LipstickBackground />

          <Stage />

          <UspList scrollYProgress={scrollYProgress} />

        </div>

        <CustomerReviews />
      </div>

    </>
  );
}

export default Home
 
