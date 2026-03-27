import { useRef } from 'react'
import { LazyMotion, domAnimation, m, useInView, useSpring } from 'motion/react'
import { MOBILE_QUERY } from '../../lib/breakpoints'
import StageButton from '../StageButton'
import './StageText.css'

function Stage() {
    const ref = useRef(null)
    const stageSubline = useRef(null)
    const isMobile = window.matchMedia(MOBILE_QUERY).matches

    const isStageInView = useInView(ref, { amount: 0.95, initial: true })
    // const isTextInView = useInView(stageSubline, { amount: 0.8, initial: true })

    // Animation variants for the main stage-content
    const desktopStates = {
        visible: { 
            x: 0, opacity: 1, 
            transition: {
                default: { type: "spring", stiffness: 180, damping: 35, duration: 0.1 },
                opacity: { ease: "linear" }
            }
        },
        hidden: { 
            x: 600, opacity: 0, 
            transition: {
                default: { type: "spring", stiffness: 180, damping: 35, duration: 0.1 },
                opacity: { ease: "linear" }
            } 
        }
    }

    // Animation variants for the text block
    const mobileStates = {
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 180, damping: 35, duration: 0.1 } },
        hidden: {
            y: -30, opacity: 0,    
            transition: {
                default: { type: "spring", stiffness: 180, damping: 35, duration: 0.1 },
                opacity: { ease: "linear" }
            }
        }
    }

    const skewX = useSpring(0, { stiffness: 180, damping: 35, visualDuration: 0.15 })

    return (
        <LazyMotion features={domAnimation} strict>
            <div className='stage-wrapper viewport-content' ref={ref}>
                <m.div
                    className='stage-content'
                    variants={ isMobile ? mobileStates : desktopStates }
                    initial='visible'
                    animate={ isStageInView ? 'visible' : 'hidden' }
                >
                    <div className='stage-text'>
                        <h1 className='stage-headline'>
                            Lumines&nbsp;Lips<span id="copyright">&reg;</span>
                        </h1>
                        <p 
                            ref={ stageSubline }
                            className='stage-subline'
                        >
                            Mauris sit amet risus faucibus, pharetra arcu sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat
                        </p>
                    </div>
                    {!isMobile && <StageButton skewX={skewX} />}
                </m.div>
                {isMobile && <StageButton skewX={0} />}
            </div>
        </LazyMotion>
    )
}

export default Stage
