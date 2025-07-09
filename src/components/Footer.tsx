import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 border-t border-amber-600/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-amber-500 font-mono text-sm uppercase tracking-wider mb-4">
              Avertissement
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed font-mono">
              ParanoidGPT est un outil d'analyse. Ne remplace pas un conseil juridique professionnel.
              Toujours consulter un avocat pour des décisions importantes.
            </p>
          </div>
          
          <div>
            <h3 className="text-amber-500 font-mono text-sm uppercase tracking-wider mb-4">
              Technologie
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed font-mono">
              IA avancée • Analyse sémantique • Détection de patterns • 
              Base de données jurisprudentielle
            </p>
          </div>
          
          <div>
            <h3 className="text-amber-500 font-mono text-sm uppercase tracking-wider mb-4">
              Créateur
            </h3>
            <a
              href="https://linkedin.com/in/cassard-robin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-stone-300 hover:text-amber-500 transition-colors group"
            >
              <span className="font-mono text-sm">Cassard Robin</span>
              <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-500 text-xs font-mono">
              © 2025 ParanoidGPT • Tous droits réservés
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-stone-500 text-xs font-mono">Système opérationnel</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;