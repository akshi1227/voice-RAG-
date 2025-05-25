import React from 'react';
import { SearchIcon } from 'lucide-react';
export const DocumentRetrieval = ({
  query,
  isProcessing,
  darkMode
}) => {
  // Mock document corpus for demonstration
  const documents = [{
    id: 1,
    title: 'Voice Recognition Systems',
    content: 'Overview of modern voice recognition technologies...'
  }, {
    id: 2,
    title: 'Multilingual Support in AI',
    content: 'Implementation strategies for multilingual AI systems...'
  }, {
    id: 3,
    title: 'Accessibility for Visually Impaired Users',
    content: 'Best practices for designing accessible interfaces...'
  }, {
    id: 4,
    title: 'RAG Architecture',
    content: 'Retrieval-Augmented Generation fundamentals and applications...'
  }, {
    id: 5,
    title: 'Text-to-Speech Technologies',
    content: 'Comparison of TTS systems including Coqui, AWS Polly, and Google...'
  }];
  // Simulate document retrieval based on query
  const retrievedDocs = query ? documents.filter(doc => doc.title.toLowerCase().includes(query.toLowerCase()) || doc.content.toLowerCase().includes(query.toLowerCase())) : [];
  return <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Document Retrieval</h2>
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        {isProcessing ? <div className="flex flex-col items-center justify-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-lg">Searching document corpus...</p>
          </div> : query ? <div>
            <div className="flex items-center gap-2 mb-4">
              <SearchIcon size={20} />
              <p className="text-lg">
                Retrieved {retrievedDocs.length} documents for query:
              </p>
            </div>
            {retrievedDocs.length > 0 ? <ul className="space-y-3">
                {retrievedDocs.map(doc => <li key={doc.id} className={`p-3 rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className="font-medium">{doc.title}</h3>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {doc.content}
                    </p>
                  </li>)}
              </ul> : <p>No relevant documents found.</p>}
          </div> : <div className="flex items-center justify-center p-4">
            <p className="text-lg">Waiting for query...</p>
          </div>}
      </div>
    </section>;
};