import React, { Component } from 'react';
import { XIcon } from 'lucide-react';
export const SystemArchitecture = ({
  darkMode,
  onClose
}) => {
  return <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Multilingual RAG System Architecture
        </h2>
        <button onClick={onClose} className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`} aria-label="Close architecture view">
          <XIcon size={24} />
        </button>
      </div>
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3">System Overview</h3>
          <p className="mb-4">
            This multilingual RAG (Retrieval-Augmented Generation) system is
            designed for visually impaired users, enabling voice-based
            interaction with content in multiple languages. The system combines
            speech recognition, document retrieval, language model generation,
            and text-to-speech technologies.
          </p>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h4 className="font-medium mb-2">Key Components:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Speech-to-Text (STT) Engine: Converts spoken queries to text
              </li>
              <li>
                Vector Database: Stores document embeddings for semantic search
              </li>
              <li>
                Retrieval Engine: Identifies relevant documents based on query
              </li>
              <li>Language Model: Generates natural language responses</li>
              <li>
                Text-to-Speech (TTS) Engine: Converts responses to spoken audio
              </li>
              <li>Language Management: Handles multilingual processing</li>
            </ul>
          </div>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-3">Data Flow</h3>
          <ol className="space-y-4">
            <li className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex`}>
              <span className="font-bold mr-2">1.</span>
              <div>
                <p className="font-medium">Voice Input Processing</p>
                <p>
                  User's spoken query is captured and converted to text using a
                  Speech-to-Text engine (Whisper API or Vosk).
                </p>
              </div>
            </li>
            <li className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex`}>
              <span className="font-bold mr-2">2.</span>
              <div>
                <p className="font-medium">Query Understanding</p>
                <p>
                  The system identifies the language and intent of the query,
                  then creates a semantic embedding of the query.
                </p>
              </div>
            </li>
            <li className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex`}>
              <span className="font-bold mr-2">3.</span>
              <div>
                <p className="font-medium">Document Retrieval</p>
                <p>
                  The query embedding is used to search a vector database for
                  semantically similar documents.
                </p>
              </div>
            </li>
            <li className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex`}>
              <span className="font-bold mr-2">4.</span>
              <div>
                <p className="font-medium">Response Generation</p>
                <p>
                  Retrieved documents are sent to a language model along with
                  the query to generate a coherent response.
                </p>
              </div>
            </li>
            <li className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex`}>
              <span className="font-bold mr-2">5.</span>
              <div>
                <p className="font-medium">Text-to-Speech Conversion</p>
                <p>
                  The generated response is converted to speech in the
                  appropriate language using a TTS engine (like Coqui).
                </p>
              </div>
            </li>
          </ol>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-3">
            On-Premise Deployment Considerations
          </h3>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4`}>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h4 className="font-medium mb-2">Hardware Requirements</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>GPU server for model inference (NVIDIA T4 or better)</li>
                <li>Minimum 32GB RAM for handling multiple requests</li>
                <li>SSD storage for document corpus and embeddings</li>
                <li>Redundant power and network connections</li>
              </ul>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h4 className="font-medium mb-2">Software Components</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Whisper or Vosk for STT (self-hosted)</li>
                <li>FAISS or Chroma for vector database</li>
                <li>Llama 2, Mistral, or other local LLM</li>
                <li>Coqui TTS for speech synthesis</li>
                <li>Docker for containerization</li>
              </ul>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h4 className="font-medium mb-2">
              Privacy & Security Considerations
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                All data processing happens locally, ensuring user privacy
              </li>
              <li>Document corpus can be encrypted at rest</li>
              <li>Network isolation possible for sensitive deployments</li>
              <li>Regular security updates for all components</li>
              <li>Access control for system administration</li>
            </ul>
          </div>
        </section>
      </div>
    </div>;
};