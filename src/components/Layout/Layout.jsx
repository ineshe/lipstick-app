import Header from "../Header";
import Footer from "../Footer";
import './Layout.css';

function Layout({ children }) {
  return (
    <>
      <header className="app-header">
        <Header />
      </header>

      <main className="app-main">
        {children}
      </main>

      <footer className="app-footer">
        <Footer />
      </footer>
    </>
  );
}

export default Layout

