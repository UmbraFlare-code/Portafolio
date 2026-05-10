import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';

const PageLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-dark-bg text-negative selection:bg-tech-orange selection:text-white font-mono">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-dark-bg/80 border-b border-negative/5">
        <div className="max-w-screen-lg mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-3 text-negative/60 hover:text-tech-orange transition-colors"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <div className="flex items-center gap-2">
              <Terminal size={20} className="text-tech-orange" />
              <span className="font-bold text-sm uppercase tracking-wider">Francis Maxuel</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {title && (
              <span className="text-xs uppercase tracking-widest text-negative/30 font-bold hidden sm:block">
                {title}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-screen-lg mx-auto px-6 md:px-12 py-16">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-negative/5 py-8">
        <div className="max-w-screen-lg mx-auto px-6 md:px-12 flex items-center justify-between text-negative/30 text-xs">
          <span>© {new Date().getFullYear()} Francis Maxuel</span>
          <Link to="/" className="hover:text-tech-orange transition-colors">
            Volver al inicio
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
