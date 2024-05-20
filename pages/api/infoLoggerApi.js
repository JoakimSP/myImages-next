import infoLogger from '@/components/utils/infoLogger';

export default function handler(req, res) {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    infoLogger.info(message);

    res.status(200).json({ message: "Sent to logger" });
}