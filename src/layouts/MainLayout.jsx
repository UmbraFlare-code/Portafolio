import React from 'react';
import Home from '../sections/home';
import Proyects from '../sections/proyects';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Experience from '../sections/Experience';
import Certifications from '../sections/Certifications';
import BlogSection from '../sections/BlogSection';
import Footer from '../sections/footer';
import SectionProgress from '../components/SectionProgress';
import TimeDisplay from '../components/TimeDisplay';
import { getHomeInfo } from '../services/dataService';

const MainLayout = () => {
  const { name } = getHomeInfo();

  React.useEffect(() => {
    document.title = `${name} | Software Engineer`;
  }, [name]);

  return (
    <div className="min-h-screen bg-dark-bg text-negative selection:bg-tech-orange selection:text-white font-mono">
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-50 backdrop-blur-xl bg-dark-bg/80 border-b border-negative/5 px-6 py-4">
        <span className="font-bold text-xs uppercase tracking-widest text-tech-orange">{name}</span>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-4">

          {/* Sticky Sidebar */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-2/5 lg:flex-col lg:justify-between lg:py-24">
            <div className="flex flex-col gap-4">
              <Home />
              <div className="mt-8">
                <TimeDisplay />
              </div>
              <nav className="hidden lg:block">
                <SectionProgress />
              </nav>
            </div>
          </header>

          {/* Scrolling Content */}
          <main className="pt-24 lg:w-3/4 lg:py-24 flex flex-col">
            <section className="py-12 lg:py-20">
              <About />
            </section>

            <hr className="border-negative/5" />

            <section className="py-12 lg:py-20">
              <Experience />
            </section>

            <hr className="border-negative/5" />

            <section className="py-12 lg:py-20">
              <Proyects />
            </section>

            <hr className="border-negative/5" />

            <section className="py-12 lg:py-20">
              <Certifications />
            </section>

            <hr className="border-negative/5" />

            <section className="py-12 lg:py-20">
              <BlogSection />
            </section>

            <hr className="border-negative/5" />

            <section className="py-12 lg:py-20">
              <Contact />
            </section>

            <hr className="border-negative/5" />

            <section className="pt-12 lg:pt-14 pb-0">
              <Footer />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
