// /api/images/getHeroAndProfilePic.js
import fs from 'fs';

export default function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { profilepicture, heropicture } = req.query;
    let response = {};

    if (fs.existsSync(profilepicture)) {
        const profileImageBase64 = fs.readFileSync(profilepicture).toString('base64');
        response.profileImage = `data:image/png;base64,${profileImageBase64}`;
    }

    if (fs.existsSync(heropicture)) {
        const heroImageBase64 = fs.readFileSync(heropicture).toString('base64');
        response.heroImage = `data:image/png;base64,${heroImageBase64}`;
    }

    if (!response.profileImage && !response.heroImage) {
        console.log("Images not found at paths:", profilepicture, "AND", heropicture);
        return res.status(404).end();
    }
    
    res.json(response);
}
