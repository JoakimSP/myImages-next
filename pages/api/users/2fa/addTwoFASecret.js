import prisma from "@/components/prisma";
import speakeasy from 'speakeasy';
const qrcode = require('qrcode')

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        const secret = speakeasy.generateSecret({
            name: "myimages.se",
        });
       /*  const otpauth_url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: encodeURIComponent(req.body.email),
            issuer: 'myimages.se'
        }); */
        let qrcodeImage;
        qrcode.toDataURL(secret.otpauth_url, (err, data) => {
           console.log(data)
           qrcodeImage = data
        })
        await prisma.photographer.update({
            where: { email: email },
            data: {
                twoFactorSecret: secret.base32,
                twoFactorEnabled: true
            },
        });

        res.status(200).json({ secret: secret.base32, qrcodeImage });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
