import React from 'react';
import { BrainIcon } from 'lucide-react';
export const ResponseGeneration = ({
  response,
  isProcessing,
  darkMode
}) => {
  return <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">AI Response</h2>
      <div className={`p-4 rounded-lg min-h-32 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        {isProcessing ? <div className="flex flex-col items-center justify-center p-4">
            <div className="animate-pulse flex space-x-2 mb-4">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-lg">Generating response...</p>
          </div> : response ? <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <BrainIcon size={20} />
              <p className="font-medium">Generated Response:</p>
            </div>
            <p className="text-lg">{response}</p>
          </div> : <p className="text-lg text-center py-8">
            Response will appear here after processing your query
          </p>}
      </div>
    </section>;
};