import React, { useState, useEffect } from 'react';
import { Eye, Zap, Target, Shield } from 'lucide-react';
import { Page } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [glitchText, setGlitchText] = useState("Don't sign blind.");
  const [scanLines, setScanLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLines(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "CEO Startup",
      quote: "J'ai évité un piège à 80K€ grâce à ParanoidGPT. L'IA a détecté une clause cachée que même mon avocat avait ratée.",
      risk: "CLAUSE CACHÉE DÉTECTÉE"
    },
    {
      name: "Thomas Laurent",
      role: "Freelance Dev",
      quote: "Fini les contrats toxiques. Je scanne tout maintenant. L'analyse en temps réel m'a sauvé plusieurs fois.",
      risk: "PAIEMENT DIFFÉRÉ ÉVITÉ"
    },
    {
      name: "Sophie Chen",
      role: "Directrice Juridique",
      quote: "Même en tant qu'avocate, j'utilise ParanoidGPT pour un second avis. L'IA voit des patterns que l'œil humain rate.",
      risk: "RESPONSABILITÉ ILLIMITÉE BLOQUÉE"
    }
  ];

  return (
    <div className="bg-stone-900 text-stone-100 min-h-screen pt-20">
      {/* Hero Section avec effet terminal */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-900/95 to-stone-900"></div>
        
        {/* Scan lines effect */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-amber-500"
              style={{
                top: `${(scanLines + i * 5) % 100}%`,
                animation: `scan 2s linear infinite ${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <div className="inline-block mb-8">
              <div className="relative">
                <Eye className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-mono font-bold mb-8 tracking-tighter">
              <span className="text-stone-100 block">Don't</span>
              <span className="text-amber-500 glitch block" data-text="sign blind.">sign blind.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-400 font-mono mb-12 max-w-4xl mx-auto leading-relaxed">
              L'IA qui décortique vos contrats clause par clause.<br />
              <span className="text-amber-500">Détection de pièges • Analyse de risques • Recommandations</span>
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button
                onClick={() => onNavigate('analyze')}
                className="group relative bg-amber-600 text-stone-900 px-12 py-4 font-mono text-lg uppercase tracking-wider hover:bg-amber-500 transition-all duration-300 border-2 border-amber-600 hover:border-amber-500"
              >
                <span className="relative z-10">Scanner un contrat</span>
                <div className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
              
              <div className="flex items-center space-x-2 text-stone-400 font-mono text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>IA en ligne • Analyse instantanée</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-stone-800 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2,847", label: "Contrats analysés", icon: Target },
              { number: "€1.2M", label: "Pertes évitées", icon: Shield },
              { number: "94%", label: "Précision IA", icon: Zap },
              { number: "< 30s", label: "Temps d'analyse", icon: Eye }
            ].map((stat, index) => (
              <div key={index} className="group">
                <stat.icon className="h-8 w-8 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-mono font-bold text-stone-100 mb-2">{stat.number}</div>
                <div className="text-stone-400 font-mono text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials avec design terminal */}
      <section className="py-20 bg-stone-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-mono font-bold text-center mb-16">
            <span className="text-stone-100">Retours</span>
            <span className="text-amber-500"> utilisateurs</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-stone-800 border border-stone-700 p-6 relative group hover:border-amber-600/50 transition-all duration-300">
                <div className="mb-4">
                  <div className="text-xs font-mono text-red-400 bg-red-900/30 px-2 py-1 border border-red-600/30 inline-block">
                    {testimonial.risk}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-stone-300 font-mono text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="border-t border-stone-700 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono font-bold text-stone-100 text-sm">{testimonial.name}</p>
                      <p className="text-stone-400 font-mono text-xs uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-amber-500 transform rotate-45 scale-150"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-mono font-bold mb-8">
            <span className="text-stone-100">Prêt à</span>
            <br />
            <span className="text-amber-500">scanner ?</span>
          </h2>
          
          <p className="text-xl text-stone-400 font-mono mb-12">
            Analyse instantanée • Détection de risques • Recommandations d'expert
          </p>
          
          <button
            onClick={() => onNavigate('analyze')}
            className="bg-amber-600 text-stone-900 px-16 py-6 font-mono text-xl uppercase tracking-wider hover:bg-amber-500 transition-all duration-300 border-2 border-amber-600 hover:border-amber-500 relative group"
          >
            <span className="relative z-10">Commencer l'analyse</span>
            <div className="absolute inset-0 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .glitch {
          position: relative;
          animation: glitch 2s infinite;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          animation: glitch-1 0.5s infinite;
          color: #ef4444;
          z-index: -1;
        }
        
        .glitch::after {
          animation: glitch-2 0.5s infinite;
          color: #3b82f6;
          z-index: -2;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(-2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(-2px, -2px); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;