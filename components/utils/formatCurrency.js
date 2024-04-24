import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

export default function formatCurrency(number, locale) {
  const [currency, setCurrency] = useState('USD'); // Start with USD for consistent initial rendering
  const [convertedNumber, setConvertedNumber] = useState(number); // Initialize with the original number
  const [exchangeRate, setExchangeRate] = useState(1); // Default exchange rate is 1

  useEffect(() => {
    async function fetchExchangeRate() {
      if (getCookie('currencyChoice') === 'SEK') {
        const response = await fetch('/api/currency/getCurrency');
        if (response.ok) {
          const data = await response.json();
          setExchangeRate(data.sek);
        }
      }
    }

    fetchExchangeRate();

    const cookieCurrency = getCookie('currencyChoice') || 'USD';
    setCurrency(cookieCurrency);

    if (cookieCurrency === 'SEK') {
      setConvertedNumber(number * exchangeRate);
    } else {
      setConvertedNumber(number);
    }
  }, [number, exchangeRate]); // React on changes to number or exchange rate

  const formatter = new Intl.NumberFormat(locale || "en-US", {
    style: "currency",
    currency: currency
  });

  return formatter.format(convertedNumber);
}
