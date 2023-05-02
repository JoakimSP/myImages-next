import fs from 'fs/promises';
import path from 'path';
import prisma from '@/components/prisma';


export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }

      const imageFolder = path.join(process.cwd(), '/images')
      console.log(imageFolder)

      try {
        const files = await fs.readdir("/images")
        console.log(files)
        const imageExtension = ['.jpg','.jpeg', '.png']
        const imageFiles = files.filter((file) => {
            imageExtension.includes(path.extname(file).toLowerCase())

            res.status(200).json(imageFiles)
        })
      } catch (error) {
        res.status(500).json({ error: 'Error reading directory' });
      }
  }