import prisma from "@/components/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, subTitle } = req.body;

    try {

      const updatedCollection = await prisma.featuredcollections.update({
        where: {
          id: "1"
        },
        data: {
          title,
          subTitle,
        },
      });

      res.status(200).json(updatedCollection);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: error.message });
    } finally {
       prisma.$disconnect()
    }
  } else {
    prisma.$disconnect()
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
