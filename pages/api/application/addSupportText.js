import prisma from "@/components/prisma";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { question, answer } = JSON.parse(req.body);

    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }

    // Create a new support entry with Prisma
    const newSupportEntry = await prisma.support.create({
      data: {
        question,
        answer,
      },
    });

    // Send back the created entry
    res.status(200).json(newSupportEntry);
  } catch (error) {
    console.log(error)
    console.error('Failed to save support entry:', error);
    res.status(500).json({ message: 'Failed to save support entry', error: error.message });
  }
}
