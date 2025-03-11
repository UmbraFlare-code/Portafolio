import Header from "./components/Header/Header";
import "./components/Header/Header.css";
import About from "./components/About/About";
import "./components/About/About.css";
import Footer from "./components/Footer/Footer";
import "./styles/global.css";

export function App() {
    return (
        <div className="total-container">
            <Header />
            <About />
            <Footer />
        </div>
    );
}
