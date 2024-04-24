import React, { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';

export default function PromptForSek() {
  const [isVisible, setIsVisible] = useState(false);
  const [currency, setCurrency] = useState('USD'); // Default currency

  useEffect(() => {
    const savedCurrency = getCookie('currencyChoice');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleCurrencyChange = (choice) => {
    setCurrency(choice);
    setCookie('currencyChoice', choice, { maxAge: 30 * 24 * 60 * 60 }); // Expires in 30 days
    toggleVisibility();
  };

  return (
    <div title='Switch currency' className={`fixed top-30 right-16 z-10 w-64 p-4 transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0 bg-white' : 'translate-x-full'}`}>
      <button onClick={toggleVisibility} className="flex items-center justify-center text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:">
        {isVisible ? 'Close' : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
      </button>
      {isVisible && (
        <div className="mt-4 space-y-2">
          <button onClick={() => handleCurrencyChange('USD')} className={`w-full ${currency == "USD" ? "bg-gray-400" : "bg-gray-300"}  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded`}>
            USD
          </button>
          <button onClick={() => handleCurrencyChange('SEK')} className={`w-full ${currency == "SEK" ? "bg-gray-400" : "bg-gray-300"} hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded`}>
            SEK
          </button>
        </div>
      )}
    </div>
  );
}
