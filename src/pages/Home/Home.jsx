import LipstickBackground from "../../components/LipstickBackground/LipstickBackground";
import LipstickLine from "../../components/LipstickLine";
import LipstickModel from "../../components/LipstickModel";
import CustomerReviewSlider from "../../components/CustomerReviewSlider/CustomerReviewSlider";
import Stage from "../../components/StageText";
import StageButton from "../../components/StageButton";
import UspList from "../../components/Usp/UspList";
import { useScroll } from "motion/react";
import { useRef } from 'react';
import { MOBILE_QUERY } from '../../lib/breakpoints';
import "./Home.css";

function Home() {
  const animationSectionRef = useRef(null);
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;

  const { scrollYProgress } = useScroll({
      target: animationSectionRef,
      offset: ['start start', 'end end']
  });

  return (
    <>
      <div className="page-home">
        {isMobile && <StageButton skewX={0} />}

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

        <CustomerReviewSlider />
      </div>

    </>
  );
}

export default Home
 
