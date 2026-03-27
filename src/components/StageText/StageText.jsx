import { useRef } from 'react'
import { LazyMotion, domAnimation, m, useInView, useSpring } from 'motion/react'
import { MOBILE_QUERY } from '../../lib/breakpoints'
import StageButton from '../StageButton'
import './StageText.css'

function Stage() {
    const ref = useRef(null)
    const stageText = useRef(null)
    const isMobile = window.matchMedia(MOBILE_QUERY).matches

    const isStageInView = useInView(ref, { amount: 0.95, initial: true })
    const isTextInView = useInView(stageText, { amount: 0.8, initial: true })

    // Animation variants for the main stage-content
    const stageVariants = {
        visible: { x: 0, opacity: 1, 
            transition: { type: 'spring', stiffness: 180, damping: 35, duration: 0.15 }
        },
        hidden: { x: 600, opacity: 0, 
            transition: { type: 'spring', stiffness: 180, damping: 35, duration: 0.15 }
        }
    }

    // Animation variants for the text block
    const textVariants = {
        visible: { opacity: 1, transition: { duration: 0.15 } },
        hidden: { opacity: 0, transition: { duration: 0.15 } }
    }

    const skewX = useSpring(0, { stiffness: 180, damping: 35, visualDuration: 0.15 })

    return (
        <LazyMotion features={domAnimation} strict>
            <div className='stage-wrapper viewport-content' ref={ref}>
                <m.div
                    className='stage-content'
                    variants={stageVariants}
                    initial='visible'
                    animate={isMobile || isStageInView ? 'visible' : 'hidden'}
                >
                    <m.div
                        className='stage-text'
                        ref={stageText}
                        variants={textVariants}
                        initial='visible'
                        animate={isTextInView ? 'visible' : 'hidden'}
                    >
                        <h1 className='stage-headline'>
                            Lumines&nbsp;Lips<span id="copyright">&reg;</span>
                        </h1>
                        <p className='stage-subline'>
                            Mauris sit amet risus faucibus, pharetra arcu sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat
                        </p>
                    </m.div>
                    {!isMobile && <StageButton skewX={skewX} />}
                </m.div>
                {isMobile && <StageButton skewX={skewX} />}
            </div>
        </LazyMotion>
    )
}

export default Stage
