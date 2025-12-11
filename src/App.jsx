import './App.css';
import LipstickAnimation from './components/LipstickAnimation';
import LipstickLine from './components/LipstickLine';
import Header from './components/Header';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';

function App() {
    
    return (
        <>
            <Header />
            <div 
                className='content-wrapper' 
                style={{
                    position: 'relative',
                    top: 0,
                    zIndex: 5,
                }}
            >
                <LipstickLine />
                <LipstickAnimation />
                <CustomerReviews />
            </div>

            <Footer />
            {/* <div style={{ height: '100vh', width: '100%' }}></div> */}
        </>
    )
}

export default App
