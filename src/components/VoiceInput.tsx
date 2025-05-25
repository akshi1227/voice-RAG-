import React, { useEffect, useState, useRef } from 'react';
import { AlertCircleIcon } from 'lucide-react';
export const VoiceInput = ({
  isListening,
  setTranscript,
  language,
  darkMode
}) => {
  const recognitionRef = useRef(null);
  const [error, setError] = useState('');
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;
      recognitionRef.current.onresult = event => {
        const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');
        setTranscript(transcript);
      };
      recognitionRef.current.onerror = event => {
        console.error('Speech recognition error', event.error);
        switch (event.error) {
          case 'not-allowed':
            setError('Microphone access denied. Please allow microphone access in your browser settings.');
            break;
          case 'no-speech':
            setError('No speech detected. Please try speaking again.');
            break;
          default:
            setError(`Error: ${event.error}`);
        }
      };
    } else {
      setError('Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.');
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);
  useEffect(() => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.start();
        setError(''); // Clear any previous errors when starting
      } else {
        recognitionRef.current.stop();
      }
    }
  }, [isListening]);
  return <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-4 h-4 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
        <p className="text-lg">
          {isListening ? 'Listening... Speak now' : 'Voice recognition ready'}
        </p>
      </div>
      <p className="mt-2 text-sm text-gray-500">Current language: {language}</p>
      {error && <div className="mt-3 p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 flex items-start gap-2">
          <AlertCircleIcon size={20} className="flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>}
    </div>;
};