import prisma from "@/components/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    await prisma.photographer.update({
      where: { email: email },
      data: {
        twoFactorSecret: "",
        twoFactorEnabled: false
      },
    });

    res.status(200).json({ message: '2FA disabled' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
