// /api/images/getHeroAndProfilePic.js
import fs from 'fs';

export default function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { profilepicture, heropicture } = req.query;

    if (!fs.existsSync(profilepicture) || !fs.existsSync(heropicture)) {
      console.log("Image not found at path:", profilepicture, "AND", heropicture);
      return res.status(404).end();
    }

    const profileImageBase64 = fs.readFileSync(profilepicture).toString('base64');
    const heroImageBase64 = fs.readFileSync(heropicture).toString('base64');

    res.json({
        profileImage: `data:image/png;base64,${profileImageBase64}`,
        heroImage: `data:image/png;base64,${heroImageBase64}`
    });
}
