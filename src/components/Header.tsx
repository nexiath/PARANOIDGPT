import React from 'react';
import { Eye } from 'lucide-react';
import { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-sm border-b border-amber-600/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate('landing')}
          >
            <div className="relative">
              <Eye className="h-7 w-7 text-amber-500 group-hover:text-amber-400 transition-colors" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-mono text-stone-100 tracking-tight">
              PARANOID<span className="text-amber-500">GPT</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('landing')}
              className={`text-sm font-mono uppercase tracking-wider transition-all duration-300 ${
                currentPage === 'landing' 
                  ? 'text-amber-500 border-b border-amber-500' 
                  : 'text-stone-300 hover:text-stone-100'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate('analyze')}
              className={`text-sm font-mono uppercase tracking-wider transition-all duration-300 ${
                currentPage === 'analyze' 
                  ? 'text-amber-500 border-b border-amber-500' 
                  : 'text-stone-300 hover:text-stone-100'
              }`}
            >
              Scanner
            </button>
          </nav>

          <button
            onClick={() => onNavigate('analyze')}
            className="bg-amber-600 text-stone-900 px-6 py-2 font-mono text-sm uppercase tracking-wider hover:bg-amber-500 transition-all duration-300 border border-amber-600 hover:border-amber-500"
          >
            Analyser
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;