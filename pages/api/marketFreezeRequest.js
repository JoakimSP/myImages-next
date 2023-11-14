import prisma from "@/components/prisma";

export default async function handle(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed if not POST
  }
  let data;
  let newContact;
  const {
    firstName,
    lastName,
    emailAddress,
    businessPhone,
    company,
    title,
    country,
    message,
    photo
  } = req.body;

  try {
    data = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      businessPhone: businessPhone,
      company: company,
      title: title,
      country: country,
      message: message,
    }

    if (photo) {
      newContact = await prisma.contact.create({
        data: {
          ...data,
          photos: {
            connect: {
              id: photo.id
            }
          }
        }
      });
    }
    else {
      newContact = await prisma.contact.create({
        data: {
          ...data,
        }
      });
    }
    return res.json(newContact);

  } catch (error) {
    console.error("Error saving contact data:", error);
    return res.status(500).json({ error: "Unable to save contact data." });
  }
}
