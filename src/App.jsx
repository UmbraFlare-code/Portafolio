import Home from './secctions/home'
import Proyects from './secctions/proyects'
import About from './secctions/about'
import Contact from './secctions/contact'
// import Footer from './secctions/footer'



export function App() {
    return (
        <div>
            <main className='Main'>
                <Home />
                <Proyects />
                <About />
                <Contact />
            </main >
            {/*<Footer />*/}
        </div>
    );
}

export default App