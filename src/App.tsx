import React, { useEffect, useState } from 'react';
import { VoiceInput } from './components/VoiceInput';
import { DocumentRetrieval } from './components/DocumentRetrieval';
import { ResponseGeneration } from './components/ResponseGeneration';
import { VoiceOutput } from './components/VoiceOutput';
import { LanguageSelector } from './components/LanguageSelector';
import { SystemArchitecture } from './components/SystemArchitecture';
import { StopCircleIcon, VolumeIcon, InfoIcon, SunIcon, MoonIcon } from 'lucide-react';
export function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [status, setStatus] = useState('Ready');
  // Handle voice input
  const startListening = () => {
    setIsListening(true);
    setStatus('Listening...');
  };
  const stopListening = () => {
    setIsListening(false);
    if (transcript) {
      processQuery();
    } else {
      setStatus('Ready');
    }
  };
  // Simulate processing the query through the RAG pipeline
  const processQuery = async () => {
    setIsProcessing(true);
    setStatus('Processing...');
    // Wait for document retrieval and response generation
    setTimeout(() => {
      setResponse(generateDemoResponse(transcript, language));
      setIsProcessing(false);
      setStatus('Response ready');
    }, 2000);
  };
  // Demo response generator based on language
  const generateDemoResponse = (query, lang) => {
    const responses = {
      'en-US': `Based on our document retrieval, I found that ${query} relates to voice-based accessibility features for multilingual systems. Would you like more specific information?`,
      'es-ES': `Según nuestra recuperación de documentos, encontré que ${query} se relaciona con características de accesibilidad basadas en voz para sistemas multilingües. ¿Desea información más específica?`,
      'fr-FR': `D'après notre recherche documentaire, j'ai constaté que ${query} concerne les fonctionnalités d'accessibilité vocale pour les systèmes multilingues. Souhaitez-vous des informations plus spécifiques?`,
      'de-DE': `Basierend auf unserer Dokumentenabfrage habe ich festgestellt, dass ${query} sich auf sprachbasierte Barrierefreiheitsfunktionen für mehrsprachige Systeme bezieht. Möchten Sie spezifischere Informationen?`
    };
    return responses[lang] || responses['en-US'];
  };
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return <div className={`w-full min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <header className="p-4 border-b border-gray-300 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Voice RAG Assistant</h1>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? <SunIcon size={24} /> : <MoonIcon size={24} />}
          </button>
          <button onClick={() => setShowArchitecture(!showArchitecture)} className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} aria-label="Show system architecture">
            <InfoIcon size={24} />
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {showArchitecture ? <SystemArchitecture darkMode={darkMode} onClose={() => setShowArchitecture(false)} /> : <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Language Selection</h2>
              <LanguageSelector language={language} setLanguage={setLanguage} darkMode={darkMode} />
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Voice Input</h2>
              <VoiceInput isListening={isListening} setTranscript={setTranscript} language={language} darkMode={darkMode} />
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={startListening} disabled={isListening} className={`flex items-center justify-center gap-2 p-4 rounded-lg text-lg font-medium ${isListening ? 'bg-gray-400 cursor-not-allowed' : darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'} transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300`} aria-label="Start listening">
                  <div size={24} />
                  Start Speaking
                </button>
                <button onClick={stopListening} disabled={!isListening} className={`flex items-center justify-center gap-2 p-4 rounded-lg text-lg font-medium ${!isListening ? 'bg-gray-400 cursor-not-allowed' : darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'} transition-colors focus:outline-none focus:ring-4 focus:ring-red-300`} aria-label="Stop listening">
                  <StopCircleIcon size={24} />
                  Stop Speaking
                </button>
              </div>
              <div className={`p-4 rounded-lg min-h-24 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <p className="text-lg">
                  {transcript || 'Your speech will appear here...'}
                </p>
              </div>
            </section>
            <DocumentRetrieval query={transcript} isProcessing={isProcessing} darkMode={darkMode} />
            <ResponseGeneration response={response} isProcessing={isProcessing} darkMode={darkMode} />
            {response && <VoiceOutput text={response} language={language} darkMode={darkMode} />}
            <div className={`mt-4 p-3 rounded-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <p className="text-lg font-medium">Status: {status}</p>
            </div>
          </div>}
      </main>
    </div>;
}