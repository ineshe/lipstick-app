import { useRef } from 'react'
import { LazyMotion, domAnimation, m, useInView, useSpring } from 'motion/react'
import { MOBILE_QUERY } from '../../lib/breakpoints'
import StageButton from '../StageButton'
import './StageText.css'

function Stage() {
    const ref = useRef(null)
    const stageSubline = useRef(null)
    const isMobile = window.matchMedia(MOBILE_QUERY).matches

    const isStageInView = useInView(ref, { amount: 1, initial: true })
    // const isTextInView = useInView(stageSubline, { amount: 0.8, initial: true })

    const skewX = useSpring(0, { type: "tween", ease: "easeOut", duration: 0.1 })

    // Animation variants for the main stage-content
    const desktopStates = {
        visible: { 
            x: 0, opacity: 1, 
            transition: {
                default: { type: "tween", ease: "easeOut", duration: 0.1 },
                opacity: { ease: "linear" }
            }
        },
        hidden: { 
            x: 600, opacity: 0, 
            transition: {
                opacity: { type:"tween", ease: "easeOut", duration: 0.1 }
            } 
        }
    }

    // Animation variants for the text block
    const mobileStates = {
        visible: { y: 0, opacity: 1, 
            transition: { type: "tween", ease: "easeOut", duration: 0.16 } },
        hidden: {
            y: -30, opacity: 0,    
            transition: {
                default: { type: "tween", ease: "easeOut", duration: 0.16 },
                opacity: { ease: "linear" }
            }
        }
    }

    return (
        <LazyMotion features={domAnimation} strict>
            <div className='stage-wrapper viewport-content' ref={ref}>
                <m.div
                    className='stage-content'
                    variants={ isMobile ? mobileStates : desktopStates }
                    animate={ isStageInView ? 'visible' : 'hidden' }
                >
                    <div className='stage-text'>
                        <h1 className='stage-headline'>
                            Lumines&nbsp;Lips<sup id="copyright">&reg;</sup>
                        </h1>
                        <p 
                            ref={ stageSubline }
                            className='stage-subline'
                        >
                            Mehr Ausstrahlung mit einem Zug. Erfahre intensive Farbe und einen präzisen Auftrag. Für einen Auftritt, der im Kopf bleibt.
                        </p>
                    </div>
                    {!isMobile && <StageButton skewX={skewX} />}
                </m.div>
            </div>
        </LazyMotion>
    )
}

export default Stage
