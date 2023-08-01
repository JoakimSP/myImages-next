import prisma from "@/components/prisma";

export default async function handler(req, res) {
  const {
    personID,
    filename,
    filetype,
    filesize,
    url,
    urlUser
  } = req.body

  try {

    await prisma.photos.create({
      data: {
        personID: personID,
        filename: filename,
        filetype: filetype,
        filesize: filesize,
        url: url,
        urlUser: urlUser
      }
    })
    prisma.$disconnect()

    res.status(200).json({ message: "Succsessfully added image data to DB" })

  } catch (error) {
    console.error(error)
  }


}


//TODO
//Edit photo name so it dosen't contain any spaces. That will mess with diffrent parts of the program (like the ability to delete)
/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = path.join(process.cwd(), "content/images/");
    mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        throw new err
      }
    });
    cb(null, dirPath);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },


});

const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024,
    files: 10
  }
});

const handler = nextConnect()

handler.use(async (req, res, next) => {
  const session = await getSession({ req });
  if (session) {
    req.userEmail = session.user.email;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
})

handler.post(async (req, res) => {
  await new Promise((resolve, reject) => {
    upload.array("image")(req, res, async (err) => {
      if (err) {
        reject(err);
        res.status(500).json({ error: "Image upload failed", details: error.message });
      }
      resolve();
      const files = req.files;
      const currentUser = await getCurrentUser(req.userEmail)

      files.forEach(async (file) => {
        const thumbnailName = "thumbnail-" + file.filename;
        const inputPath = path.join(file.destination, file.filename);
        const outputPath = path.join("uploads", thumbnailName);
        const uniqueSuffix = path.basename(file.destination); 

        sharp(inputPath)
          .metadata()
          .then(({ width, height }) => {
            return sharp(inputPath)
              .resize(Math.round(width / 2), Math.round(height / 2))
              .toFile(outputPath);
          })
          .catch(err => console.error(err));



        await prisma.photos.create({
          data: {
            personID: currentUser.personID,
            filename: file.filename,
            filetype: file.mimetype,
            filesize: file.size,
            url: "content/images/" + file.filename,
            thumbnailUrl: "uploads/" + thumbnailName
          }
        })
      });
      console.log(`"Images uploaded", files: ${req.files}`)
      res.redirect("/")
    });
  });

});

export const config = {
  api: {
    bodyParser: false,
  },
};


async function getCurrentUser(email) {

  try {
    const currentUser = await prisma.photographer.findUnique({
      where: {
        email: email
      }
    })
    return currentUser
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect()
  }



}

*/