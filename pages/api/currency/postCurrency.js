import prisma from "@/components/prisma";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' });
        return;
    }

    const apiUrl = 'https://api.freecurrencyapi.com/v1/latest';
    const apiKey = 'fca_live_bV8eh92OBMoOnN6K6E6Pq7LJRm2VR9vodhSnSvIk';
    
    try {
        const checkLastCurrencyUpdate = await prisma.currencySek.findFirst({
            where: { id: "1" }
        });

        // If the currency rate was never set or if it was last updated more than a month ago
        if (!checkLastCurrencyUpdate || new Date() - new Date(checkLastCurrencyUpdate.updatedAt) > 30 * 24 * 60 * 60 * 1000) {
            const response = await fetch(`${apiUrl}?apikey=${apiKey}&base_currency=USD`);
            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }
        
            const data = await response.json();
            if (!data || !data.data || !data.data.SEK) {
                res.status(404).send({ message: 'SEK exchange rate data not found' });
                return;
            }
        
            await prisma.currencySek.update({
                where: {
                    id: "1"
                },
                data: {
                    sek: data.data.SEK,
                    updatedAt: new Date()  // Update the timestamp to the current date
                }
            });

            res.status(200).send({ message: 'SEK exchange rate successfully recorded', rate: data.data.SEK });
        } else {
            // If the data is current, simply return it
            res.status(200).send({ message: 'Using cached SEK exchange rate', rate: checkLastCurrencyUpdate.sek });
        }
    } catch (error) {
        console.error('Failed to fetch or update the exchange rate:', error);
        res.status(500).send({ message: 'Failed to process the request', error: error.message });
    }
}
