import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AnalyzePage from './pages/AnalyzePage';
import ResultsPage from './pages/ResultsPage';

export type Page = 'landing' | 'analyze' | 'results';

export interface AnalysisResult {
  score: number;
  contractType: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  risks: Array<{
    id: string;
    clause: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
    recommendation: string;
    lineNumber: number;
  }>;
  summary: string;
  recommendations: string[];
  contractText: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentPage('results');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateToPage} />;
      case 'analyze':
        return <AnalyzePage onAnalysisComplete={handleAnalysisComplete} onNavigate={navigateToPage} />;
      case 'results':
        return <ResultsPage result={analysisResult} onNavigate={navigateToPage} />;
      default:
        return <LandingPage onNavigate={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header currentPage={currentPage} onNavigate={navigateToPage} />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;