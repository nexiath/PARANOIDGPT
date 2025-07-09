import React, { useState, useEffect } from 'react';
import { Download, AlertTriangle, Info, CheckCircle, ChevronDown, ChevronUp, ArrowLeft, Eye, Zap } from 'lucide-react';
import { Page, AnalysisResult } from '../App';

interface ResultsPageProps {
  result: AnalysisResult | null;
  onNavigate: (page: Page) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result, onNavigate }) => {
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
  const [highlightedText, setHighlightedText] = useState('');
  const [scanEffect, setScanEffect] = useState(0);

  useEffect(() => {
    if (result) {
      setHighlightedText(result.contractText);
      const interval = setInterval(() => {
        setScanEffect(prev => (prev + 1) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [result]);

  if (!result) {
    return (
      <div className="bg-stone-900 text-stone-100 min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <Eye className="h-16 w-16 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl font-mono font-bold mb-4">Aucune analyse disponible</h2>
          <button
            onClick={() => onNavigate('analyze')}
            className="bg-amber-600 text-stone-900 px-8 py-3 font-mono uppercase tracking-wider hover:bg-amber-500 transition-colors"
          >
            Scanner un contrat
          </button>
        </div>
      </div>
    );
  }

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'border-red-500 bg-red-900/20 text-red-400';
      case 'MEDIUM':
        return 'border-yellow-500 bg-yellow-900/20 text-yellow-400';
      case 'LOW':
        return 'border-green-500 bg-green-900/20 text-green-400';
      default:
        return 'border-stone-500 bg-stone-800 text-stone-400';
    }
  };

  const getRiskIcon = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return AlertTriangle;
      case 'MEDIUM':
        return Info;
      case 'LOW':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-400';
    if (score >= 4) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 7) return 'from-green-600 to-green-400';
    if (score >= 4) return 'from-yellow-600 to-yellow-400';
    return 'from-red-600 to-red-400';
  };

  const handleDownloadReport = () => {
    alert('Génération du rapport PDF en cours...');
  };

  return (
    <div className="bg-stone-900 text-stone-100 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => onNavigate('analyze')}
            className="flex items-center space-x-2 text-amber-500 hover:text-amber-400 mb-6 font-mono text-sm uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Nouvelle analyse</span>
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-mono font-bold mb-4">
                <span className="text-stone-100">Rapport</span>
                <span className="text-amber-500"> d'analyse</span>
              </h1>
              <div className="flex items-center space-x-4 text-stone-400 font-mono text-sm">
                <span>{result.contractType}</span>
                <span>•</span>
                <span className={`uppercase tracking-wider ${
                  result.riskLevel === 'HIGH' ? 'text-red-400' :
                  result.riskLevel === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  Risque {result.riskLevel}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleDownloadReport}
              className="mt-6 lg:mt-0 bg-amber-600 text-stone-900 px-8 py-3 font-mono uppercase tracking-wider hover:bg-amber-500 transition-colors flex items-center space-x-3"
            >
              <Download className="h-5 w-5" />
              <span>Télécharger PDF</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Risk Score avec effet visuel */}
            <div className="bg-stone-800 border border-stone-700 p-8 relative overflow-hidden">
              {/* Scan effect */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute w-full h-px bg-amber-500"
                  style={{
                    top: `${scanEffect}%`,
                    animation: 'scan 2s linear infinite'
                  }}
                ></div>
              </div>

              <h2 className="text-2xl font-mono font-bold mb-8 text-stone-100">
                Score de risque global
              </h2>
              
              <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
                {/* Gauge circulaire */}
                <div className="relative">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-stone-700"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="60"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(result.score / 10) * 377} 377`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className={`stop-color-${getScoreColor(result.score).replace('text-', '')}`} />
                        <stop offset="100%" className={`stop-color-${getScoreColor(result.score).replace('text-', '')}`} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-mono font-bold ${getScoreColor(result.score)}`}>
                      {result.score}
                    </span>
                    <span className="text-stone-400 font-mono text-sm">/10</span>
                  </div>
                </div>

                {/* Détails du score */}
                <div className="flex-1">
                  <h3 className={`text-2xl font-mono font-bold mb-4 ${getScoreColor(result.score)}`}>
                    {result.score >= 7 ? 'RISQUE FAIBLE' : 
                     result.score >= 4 ? 'RISQUE MODÉRÉ' : 'RISQUE ÉLEVÉ'}
                  </h3>
                  <p className="text-stone-300 font-mono text-sm leading-relaxed mb-6">
                    {result.score >= 7 
                      ? 'Ce contrat présente des risques minimes. Quelques points d\'attention mais globalement acceptable.' 
                      : result.score >= 4 
                      ? 'Ce contrat contient plusieurs clauses préoccupantes qui nécessitent une attention particulière.' 
                      : 'ATTENTION : Ce contrat présente des risques majeurs. Signature fortement déconseillée sans renégociation.'}
                  </p>
                  
                  {/* Stats rapides */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-red-400 text-xl font-mono font-bold">
                        {result.risks.filter(r => r.severity === 'HIGH').length}
                      </div>
                      <div className="text-stone-500 font-mono text-xs uppercase">Risques élevés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-400 text-xl font-mono font-bold">
                        {result.risks.filter(r => r.severity === 'MEDIUM').length}
                      </div>
                      <div className="text-stone-500 font-mono text-xs uppercase">Risques modérés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 text-xl font-mono font-bold">
                        {result.risks.filter(r => r.severity === 'LOW').length}
                      </div>
                      <div className="text-stone-500 font-mono text-xs uppercase">Risques faibles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé exécutif */}
            <div className="bg-stone-800 border border-stone-700 p-8">
              <h2 className="text-2xl font-mono font-bold mb-6 text-stone-100">
                Résumé exécutif
              </h2>
              <div className={`border-l-4 pl-6 ${
                result.riskLevel === 'HIGH' ? 'border-red-500' :
                result.riskLevel === 'MEDIUM' ? 'border-yellow-500' : 'border-green-500'
              }`}>
                <p className="text-stone-300 font-mono text-sm leading-relaxed">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Analyse des risques */}
            <div className="bg-stone-800 border border-stone-700 p-8">
              <h2 className="text-2xl font-mono font-bold mb-6 text-stone-100">
                Clauses à risque détectées
              </h2>
              <div className="space-y-4">
                {result.risks.map((risk) => {
                  const RiskIcon = getRiskIcon(risk.severity);
                  const isExpanded = expandedRisk === risk.id;
                  
                  return (
                    <div key={risk.id} className={`border p-6 transition-all duration-300 ${getRiskColor(risk.severity)}`}>
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpandedRisk(isExpanded ? null : risk.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <RiskIcon className="h-6 w-6" />
                          <div>
                            <span className="font-mono font-bold">{risk.clause}</span>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-xs font-mono px-2 py-1 bg-current bg-opacity-20 uppercase tracking-wider">
                                {risk.severity}
                              </span>
                              <span className="text-xs font-mono text-stone-500">
                                Ligne {risk.lineNumber}
                              </span>
                            </div>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-current border-opacity-30">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-mono font-bold mb-2 text-sm uppercase tracking-wider">
                                Problème identifié
                              </h4>
                              <p className="font-mono text-sm leading-relaxed">{risk.description}</p>
                            </div>
                            <div>
                              <h4 className="font-mono font-bold mb-2 text-sm uppercase tracking-wider">
                                Recommandation
                              </h4>
                              <p className="font-mono text-sm leading-relaxed">{risk.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Actions recommandées */}
            <div className="bg-stone-800 border border-stone-700 p-6">
              <h2 className="text-xl font-mono font-bold mb-6 text-stone-100">
                Actions prioritaires
              </h2>
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-amber-600 text-stone-900 w-6 h-6 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-stone-300 font-mono text-sm leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prochaines étapes */}
            <div className="bg-amber-900/20 border border-amber-600/30 p-6">
              <h2 className="text-xl font-mono font-bold mb-6 text-amber-400">
                Prochaines étapes
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-amber-600 text-stone-900 py-3 px-4 font-mono text-sm uppercase tracking-wider hover:bg-amber-500 transition-colors">
                  Consulter un avocat
                </button>
                <button className="w-full border border-amber-600 text-amber-400 py-3 px-4 font-mono text-sm uppercase tracking-wider hover:bg-amber-600 hover:text-stone-900 transition-colors">
                  Renégocier le contrat
                </button>
                <button
                  onClick={() => onNavigate('analyze')}
                  className="w-full text-amber-400 py-2 px-4 font-mono text-sm uppercase tracking-wider hover:bg-amber-900/30 transition-colors"
                >
                  Analyser un autre contrat
                </button>
              </div>
            </div>

            {/* Statistiques */}
            <div className="bg-stone-800 border border-stone-700 p-6">
              <h2 className="text-xl font-mono font-bold mb-6 text-stone-100">
                Statistiques
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 font-mono text-sm">Clauses analysées</span>
                  <span className="text-stone-100 font-mono font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 font-mono text-sm">Mots-clés détectés</span>
                  <span className="text-stone-100 font-mono font-bold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 font-mono text-sm">Temps d'analyse</span>
                  <span className="text-stone-100 font-mono font-bold">2.3s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 font-mono text-sm">Confiance IA</span>
                  <span className="text-green-400 font-mono font-bold">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ResultsPage;