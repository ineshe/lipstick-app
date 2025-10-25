import './App.css';
import Stage from './components/StageText';
import LipstickAnimation from './components/LipstickAnimation';
import LipstickLine from './components/LipstickLine';
import Menu from './components/Menu';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';

function App() {
    
    return (
        <>
            <Menu />
            <LipstickLine />
            <LipstickAnimation />
            <Stage />
            <CustomerReviews />
            <Footer />
            {/* <div style={{ height: '100vh', width: '100%' }}></div> */}
        </>
    )
}

export default App
