import Home from './sections/home'
import Proyects from './sections/proyects'
import AboutContact from './sections/AboutContact'
import Footer from './sections/footer'
import SectionProgress from './components/SectionProgress'
import TimeDisplay from './components/TimeDisplay'
import Experience from './sections/Experience'

export function App() {
    return (
        <div className="min-h-screen bg-dark-bg text-negative selection:bg-tech-orange selection:text-white font-mono">
            {/* Background Grain/Noise */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
            
            <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="lg:flex lg:justify-between lg:gap-4">
                    
                    {/* Sticky Sidebar */}
                    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
                        <div className="flex flex-col gap-4">
                          <Home />
                          <div className="mt-8">
                            <TimeDisplay />
                          </div>
                          <nav className="hidden lg:block">
                            <SectionProgress />
                          </nav>
                        </div>
                        
                        {/* Mobile Footer / Social can go here or below if needed */}
                    </header>

                    {/* Scrolling Content */}
                    <main className="pt-24 lg:w-1/2 lg:py-24 flex flex-col gap-24 lg:gap-48">
                        <AboutContact />
                        <Experience />
                        <Proyects />
                        <Footer />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App
