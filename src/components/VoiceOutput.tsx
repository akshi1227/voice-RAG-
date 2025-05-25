import React, { useEffect, useState } from 'react';
import { VolumeIcon, Volume2Icon, Volume1Icon } from 'lucide-react';
export const VoiceOutput = ({
  text,
  language,
  darkMode
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  // Get available voices
  useEffect(() => {
    const getVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      // Try to find a voice that matches the selected language
      const voiceForLanguage = availableVoices.find(voice => voice.lang.startsWith(language.split('-')[0]));
      setSelectedVoice(voiceForLanguage || availableVoices[0]);
    };
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = getVoices;
    }
    getVoices();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language]);
  const speak = () => {
    if (!text) return;
    // Stop any current speech
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = language;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  return <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Voice Output</h2>
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button onClick={isSpeaking ? stopSpeaking : speak} disabled={!text} className={`flex items-center justify-center gap-2 p-4 rounded-lg text-lg font-medium ${!text ? 'bg-gray-400 cursor-not-allowed' : isSpeaking ? darkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white' : darkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-600 text-white'} transition-colors focus:outline-none focus:ring-4 focus:ring-green-300`} aria-label={isSpeaking ? 'Stop speaking' : 'Read response aloud'}>
            {isSpeaking ? <>
                <Volume2Icon size={24} className="animate-pulse" />
                Stop Reading
              </> : <>
                <VolumeIcon size={24} />
                Read Aloud
              </>}
          </button>
          {voices.length > 0 && <div className="flex-1">
              <label htmlFor="voice-select" className="block mb-2 text-sm font-medium">
                Select Voice:
              </label>
              <select id="voice-select" value={selectedVoice ? voices.indexOf(selectedVoice) : ''} onChange={e => setSelectedVoice(voices[e.target.value])} className={`w-full p-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                {voices.map((voice, index) => <option key={`${voice.name}-${index}`} value={index}>
                    {voice.name} ({voice.lang})
                  </option>)}
              </select>
            </div>}
        </div>
        {isSpeaking && <div className="mt-4 flex justify-center">
            <div className="flex items-end space-x-1">
              <div className="w-1 h-3 bg-green-500 animate-bounce" style={{
            animationDelay: '0ms'
          }}></div>
              <div className="w-1 h-5 bg-green-500 animate-bounce" style={{
            animationDelay: '100ms'
          }}></div>
              <div className="w-1 h-7 bg-green-500 animate-bounce" style={{
            animationDelay: '200ms'
          }}></div>
              <div className="w-1 h-4 bg-green-500 animate-bounce" style={{
            animationDelay: '300ms'
          }}></div>
              <div className="w-1 h-6 bg-green-500 animate-bounce" style={{
            animationDelay: '400ms'
          }}></div>
            </div>
          </div>}
      </div>
    </section>;
};