import React from 'react';
import { GlobeIcon } from 'lucide-react';
export const LanguageSelector = ({
  language,
  setLanguage,
  darkMode
}) => {
  const languages = [{
    code: 'en-US',
    name: 'English (US)'
  }, {
    code: 'es-ES',
    name: 'Español (España)'
  }, {
    code: 'fr-FR',
    name: 'Français (France)'
  }, {
    code: 'de-DE',
    name: 'Deutsch (Deutschland)'
  }];
  return <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
      <div className="flex items-center gap-3 mb-3">
        <GlobeIcon size={20} />
        <h3 className="text-lg font-medium">Select Language</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {languages.map(lang => <button key={lang.code} onClick={() => setLanguage(lang.code)} className={`p-3 rounded-lg text-center transition-colors ${language === lang.code ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500`} aria-pressed={language === lang.code}>
            {lang.name}
          </button>)}
      </div>
    </div>;
};