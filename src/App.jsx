import { useRef, useEffect, useMemo, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import './App.css';
import UspList from './components/UspList';
import Stage from './components/StageText';
import LipstickAnimation from './components/LipstickAnimation';
import LipstickLine from './components/LipstickLine';

function App() {
    
    return (
        <>
            <LipstickLine />
            <LipstickAnimation />
            <Stage />
            <div style={{ height: '100vh', width: '100%' }}></div>
        </>
    )
}

export default App
