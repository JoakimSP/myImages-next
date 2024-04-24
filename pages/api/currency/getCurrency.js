// pages/api/currency/getCurrency.js
import prisma from "@/components/prisma";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
      res.status(405).send({ message: 'Only GET requests allowed' });
      return;
  }

  try {
      const currencyRate = await prisma.currencySek.findUnique({
          where: {
              id: "1"  // Assuming you have a specific ID for the SEK currency rate
          }
      });
      
      if (currencyRate) {
          res.status(200).json(currencyRate);
      } else {
          res.status(404).send({ message: 'Exchange rate not found' });
      }
  } catch (error) {
      console.error('Failed to retrieve the exchange rate:', error);
      res.status(500).send({ message: 'Failed to process the request', error: error.message });
  }
}
