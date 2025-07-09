import React, { useState, useRef, useEffect } from 'react';
import { Upload, Scan, Loader2, FileText, AlertTriangle } from 'lucide-react';
import { Page, AnalysisResult } from '../App';

interface AnalyzePageProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onNavigate: (page: Page) => void;
}

const AnalyzePage: React.FC<AnalyzePageProps> = ({ onAnalysisComplete, onNavigate }) => {
  const [contractText, setContractText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sampleContract = `CONTRAT DE DÉVELOPPEMENT LOGICIEL

Entre TechCorp SARL ("Client") et Développeur Indépendant ("Prestataire")

Article 1 - OBJET
Le Prestataire s'engage à développer une application web selon les spécifications fournies.

Article 2 - DÉLAIS ET LIVRAISON  
Livraison prévue dans 3 mois. Retard supérieur à 15 jours entraîne pénalités de 500€/jour.

Article 3 - RÉMUNÉRATION
Montant total : 45 000€ HT
- 20% à la signature
- 30% à mi-parcours  
- 50% à la livraison finale
Paiement sous 90 jours après facturation.

Article 4 - PROPRIÉTÉ INTELLECTUELLE
Tous les droits de propriété intellectuelle sont transférés au Client dès le paiement intégral.
Le Prestataire renonce à tout droit moral sur l'œuvre créée.

Article 5 - RESPONSABILITÉ
Le Prestataire est responsable de tous dommages directs et indirects causés au Client.
Aucune limitation de responsabilité n'est prévue.

Article 6 - RÉSILIATION
Le Client peut résilier à tout moment sans préavis ni indemnité.
En cas de résiliation, le Prestataire doit rembourser 50% des sommes perçues.

Article 7 - CONFIDENTIALITÉ
Le Prestataire s'engage à ne divulguer aucune information pendant 10 ans après la fin du contrat.

Article 8 - CLAUSE DE NON-CONCURRENCE
Le Prestataire s'interdit de travailler pour tout concurrent du Client pendant 2 ans.

Article 9 - JURIDICTION
Tout litige relève exclusivement des tribunaux de Paris.`;

  const analysisSteps = [
    'Parsing du document...',
    'Analyse sémantique...',
    'Détection des clauses à risque...',
    'Évaluation des pénalités...',
    'Calcul du score de risque...',
    'Génération des recommandations...'
  ];

  useEffect(() => {
    if (isAnalyzing) {
      let step = 0;
      const interval = setInterval(() => {
        if (step < analysisSteps.length) {
          setCurrentStep(analysisSteps[step]);
          setAnalysisProgress((step + 1) * (100 / analysisSteps.length));
          step++;
        } else {
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setContractText(text);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContractText(text);
      };
      reader.readAsText(file);
    }
  };

  const generateMockAnalysis = (text: string): AnalysisResult => {
    const risks = [
      {
        id: '1',
        clause: 'Pénalités de retard - Article 2',
        severity: 'HIGH' as const,
        description: 'Pénalités de 500€/jour dès 15 jours de retard. Montant disproportionné et risque financier majeur.',
        recommendation: 'Négocier un plafond de pénalités à 10% du montant total et un délai de grâce de 30 jours.',
        lineNumber: 8
      },
      {
        id: '2',
        clause: 'Responsabilité illimitée - Article 5',
        severity: 'HIGH' as const,
        description: 'Responsabilité totale sans limitation pour tous dommages directs et indirects.',
        recommendation: 'Limiter la responsabilité au montant du contrat et exclure les dommages indirects.',
        lineNumber: 18
      },
      {
        id: '3',
        clause: 'Résiliation abusive - Article 6',
        severity: 'HIGH' as const,
        description: 'Résiliation unilatérale sans préavis avec obligation de remboursement de 50%.',
        recommendation: 'Exiger un préavis de 30 jours et supprimer l\'obligation de remboursement.',
        lineNumber: 21
      },
      {
        id: '4',
        clause: 'Délai de paiement - Article 3',
        severity: 'MEDIUM' as const,
        description: 'Paiement sous 90 jours, créant un risque de trésorerie important.',
        recommendation: 'Réduire à 30 jours maximum et prévoir des pénalités de retard.',
        lineNumber: 13
      },
      {
        id: '5',
        clause: 'Non-concurrence excessive - Article 8',
        severity: 'MEDIUM' as const,
        description: 'Clause de non-concurrence de 2 ans trop restrictive pour un freelance.',
        recommendation: 'Limiter à 6 mois et définir précisément le périmètre géographique.',
        lineNumber: 26
      }
    ];

    const score = 3.2; // Score très bas à cause des multiples risques élevés
    const riskLevel = 'HIGH';

    return {
      score,
      contractType: 'Contrat de développement logiciel',
      riskLevel,
      risks,
      summary: 'ALERTE ROUGE : Ce contrat présente des risques financiers et juridiques majeurs. Plusieurs clauses sont particulièrement défavorables : pénalités de retard disproportionnées, responsabilité illimitée, résiliation abusive et délais de paiement excessifs. Signature fortement déconseillée sans renégociation.',
      recommendations: [
        'Plafonner les pénalités de retard à 10% du montant total',
        'Limiter la responsabilité au montant du contrat',
        'Négocier un préavis de résiliation de 30 jours minimum',
        'Réduire les délais de paiement à 30 jours maximum',
        'Limiter la clause de non-concurrence à 6 mois'
      ],
      contractText: text
    };
  };

  const handleAnalyze = async () => {
    if (!contractText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulation d'analyse avec étapes
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const result = generateMockAnalysis(contractText);
    setIsAnalyzing(false);
    onAnalysisComplete(result);
  };

  const loadSampleContract = () => {
    setContractText(sampleContract);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="bg-stone-900 text-stone-100 min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Scan className="h-12 w-12 text-amber-500" />
            <h1 className="text-4xl font-mono font-bold">
              <span className="text-stone-100">Scanner</span>
              <span className="text-amber-500"> contractuel</span>
            </h1>
          </div>
          <p className="text-lg text-stone-400 font-mono">
            Collez votre contrat ci-dessous pour une analyse complète des risques
          </p>
        </div>

        {!isAnalyzing ? (
          <div className="space-y-8">
            {/* Upload Zone */}
            <div className="bg-stone-800 border-2 border-stone-700 p-8">
              <div
                className={`border-2 border-dashed transition-all duration-300 p-12 text-center ${
                  dragActive 
                    ? 'border-amber-500 bg-amber-500/10' 
                    : 'border-stone-600 hover:border-stone-500'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="h-16 w-16 text-stone-400 mx-auto mb-6" />
                <p className="text-stone-300 font-mono text-lg mb-4">
                  Glissez votre fichier .txt ici
                </p>
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-stone-700 text-stone-100 px-4 md:px-6 py-3 font-mono text-xs md:text-sm uppercase tracking-wider hover:bg-stone-600 transition-colors border border-stone-600 inline-block text-center"
                >
                  Parcourir les fichiers
                </label>
              </div>
            </div>

            {/* Text Area */}
            <div className="bg-stone-800 border border-stone-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-stone-300 font-mono text-sm uppercase tracking-wider">
                  Texte du contrat
                </label>
                <button
                  onClick={loadSampleContract}
                  className="text-amber-500 hover:text-amber-400 font-mono text-sm uppercase tracking-wider transition-colors"
                >
                  Charger un exemple
                </button>
              </div>
              
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  placeholder="Collez le texte de votre contrat ici..."
                  className="w-full h-96 bg-stone-900 border border-stone-600 p-4 text-stone-100 font-mono text-sm resize-none focus:outline-none focus:border-amber-500 transition-colors"
                />
                <div className="absolute bottom-4 right-4 text-stone-500 font-mono text-xs">
                  {contractText.length} caractères
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={handleAnalyze}
                disabled={!contractText.trim()}
                className={`px-12 py-4 font-mono text-lg uppercase tracking-wider transition-all duration-300 ${
                  contractText.trim()
                    ? 'bg-amber-600 text-stone-900 hover:bg-amber-500 border-2 border-amber-600 hover:border-amber-500'
                    : 'bg-stone-700 text-stone-500 border-2 border-stone-700 cursor-not-allowed'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <Scan className="h-5 w-5" />
                  <span>Lancer l'analyse</span>
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Analysis in Progress */
          <div className="bg-stone-800 border border-stone-700 p-12 text-center">
            <div className="mb-8">
              <Loader2 className="h-16 w-16 text-amber-500 mx-auto animate-spin mb-6" />
              <h2 className="text-2xl font-mono font-bold text-stone-100 mb-4">
                Analyse en cours...
              </h2>
              <p className="text-stone-400 font-mono text-lg mb-8">
                {currentStep}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="bg-stone-700 h-2 mb-4 overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
              <p className="text-stone-500 font-mono text-sm">
                {Math.round(analysisProgress)}% terminé
              </p>
            </div>

            {/* Warning */}
            <div className="mt-12 bg-red-900/20 border border-red-600/30 p-6 max-w-2xl mx-auto">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <span className="text-red-400 font-mono text-sm uppercase tracking-wider">
                  Analyse détectée
                </span>
              </div>
              <p className="text-stone-300 font-mono text-sm">
                Des clauses potentiellement risquées ont été identifiées. 
                Analyse approfondie en cours...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;