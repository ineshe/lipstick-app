import './App.css';
import Stage from './components/StageText';
import LipstickAnimation from './components/LipstickAnimation';
import LipstickLine from './components/LipstickLine';
import Header from './components/Header';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';

function App() {
    
    return (
        <>
            <Header />
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
