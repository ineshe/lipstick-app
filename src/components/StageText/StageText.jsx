import { useRef, useEffect } from 'react'
import { LazyMotion, domAnimation, m, useInView, useSpring, useAnimate } from 'motion/react'
import { MOBILE_QUERY } from '../../lib/breakpoints'
import StageButton from '../StageButton'
import './StageText.css'

function Stage() {
    const [scope, animate] = useAnimate()

    const ref = useRef(null)
    const stageText = useRef(null)
    const isMobile = window.matchMedia(MOBILE_QUERY).matches

    const isStageInView = useInView(ref, { amount: 0.95, initial: true })
    const isTextInView = useInView(stageText, { amount: 0.8, initial: true })
    
    const x = useSpring(0, { stiffness: 180, damping: 35, visualDuration: 0.15 })
    const skewX = useSpring(0, { stiffness: 180, damping: 35, visualDuration: 0.15 })

    function desktopExit() {
        x.set(window.innerWidth)
        skewX.set(-15)
    }

    function desktopEnter() {
        x.set(0)
        skewX.set(0)
    }

    useEffect(() => {
        if (!(isMobile || isStageInView)) {
            desktopExit()
        } else {
            desktopEnter()
        }

        if (isTextInView) {
            const enterAnimation = async () => {
                await animate(scope.current, { opacity: 1 })
            }
            enterAnimation()
        } else {
            const exitAnimation = async () => {
                await animate(scope.current, { opacity: 0 })
            }
            exitAnimation()
        }
    }, [isStageInView, isMobile, x, skewX, isStageInView, isTextInView])

    return (
        <LazyMotion features={domAnimation} strict>
            <div className='stage-wrapper viewport-content' ref={ref}>
                <m.div 
                    className='stage-content'
                    ref={scope} 
                    style={{ x }}
                >
                    <div className='stage-text' ref={stageText}>
                        <h1 className='stage-headline'>
                            Lumines&nbsp;Lips<span id="copyright">&reg;</span>
                        </h1>
                        <p className='stage-subline'>
                            Mauris sit amet risus faucibus, pharetra arcu sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat
                        </p>
                    </div>
                    {!isMobile && <StageButton skewX={skewX} />}
                </m.div>
                {isMobile && 
                    <m.StageButton skewX={skewX} />
                }
            </div>
        </LazyMotion>
    )
}

export default Stage
