import Image from "next/image"
import prisma from "../../components/prisma"
import { getSession } from "next-auth/react"
import Header from "@/components/header"
import formatCurrency from "@/components/utils/formatCurrency"
import router from "next/router"

export default function ViewImage({ photo, photographer }) {
    const { url, filename, title, personID, id } = photo

    async function HandleUpdateInfo(e) {
        e.preventDefault()
        let tagValue
        for (let i = 3; i < 6; i++) {
            if (e.target[i].checked) {
                tagValue = e.target[i].value
                break 
            }
            else {
                continue
            }
        }

        const newPhotoInformation = {
            title: e.target[0].value,
            description: e.target[1].value,
            price: e.target[2].value,
            tags: tagValue,
            photoID: id
        }


        try {
            const response = await fetch('../api/images/editPhotoInfo', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newPhotoInformation)
            })

            if (response.ok) {
                router.push("/")
                
            }
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <div>
            <Header />
            <h1>{title}</h1>
            <Image
                src={`/${url}/${filename}`}
                width={800}
                height={600}
                alt={`${title}`}
            />
            <p>{formatCurrency(photo.price)}</p>
            <p>{photo.description}</p>
            <button>Add to cart</button>
            {photographer.personID === personID &&
                <form onSubmit={HandleUpdateInfo}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" name="title" required />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input id="description" type="text" name="description" required />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input id="price" type="number" name="price" required />
                    </div>
                    <div>

                        <legend>Category</legend>
                        <label htmlFor="sunset">Sunset</label>
                        <input type="radio" id="sunset" name="category" value="sunset" />
                        <label htmlFor="family">Family</label>
                        <input type="radio" id="family" name="category" value="family" />
                        <label htmlFor="ocean">Ocean</label>
                        <input type="radio" id="ocean" name="category" value="ocean" />

                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>

            }
        </div>
    )
}


export async function getServerSideProps(context) {
    const { query } = context
    const session = await getSession(context)
    let photographer = {}

    const photo = await prisma.photos.findFirst({
        where: {
            filename: query.viewImage
        },
    })

    if (session) {
        photographer = await prisma.photographer.findUnique({
            where: {
                email: session.user.email
            }
        })
    }





    return {
        props: {
            photo,
            photographer
        }
    }
}
