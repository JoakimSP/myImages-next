import Layout from "@/components/layout/layout"
import Image from "next/image";
import Link from "next/link";

export default function Index() {

    const galleryImages = [
        { src: "/appcontent/inspirationImages/above-bed.jpg", alt: "Elegant Bedroom Setting", context: "Above Bed" },
        { src: "/appcontent/inspirationImages/above-drawer-wall.jpg", alt: "Chic Drawer Wall Arrangement", context: "Above Drawer" },
        { src: "/appcontent/inspirationImages/besides-livingroom-entry.jpg", alt: "Stylish Living Room Entry", context: "Living Room Entry" },
        { src: "/appcontent/inspirationImages/coffieshop-corner.jpg", alt: "Cozy Coffee Shop Corner", context: "Coffee Shop" },
        { src: "/appcontent/inspirationImages/end-of-stairs.jpg", alt: "End of Stairs Decoration", context: "Staircase" },
        { src: "/appcontent/inspirationImages/gallery-smallimage.png", alt: "Small Image Gallery", context: "Small Image" },
        { src: "/appcontent/inspirationImages/gallery.jpg", alt: "Gallery View", context: "Gallery" },
        { src: "/appcontent/inspirationImages/hallway.jpg", alt: "Hallway Elegance", context: "Hallway" },
        { src: "/appcontent/inspirationImages/livingroom-giant-wall-image.jpg", alt: "Living Room with Giant Wall Image", context: "Living Room Wall" },
        { src: "/appcontent/inspirationImages/livingroom.jpg", alt: "Modern Living Room", context: "Living Room" },
        { src: "/appcontent/inspirationImages/lounge.jpg", alt: "Relaxing Lounge", context: "Lounge" },
        { src: "/appcontent/inspirationImages/office-flower-bee.jpg", alt: "Office with Flower and Bee Decor", context: "Office Flower" },
        { src: "/appcontent/inspirationImages/office-spider.jpg", alt: "Office with Spider Wall Art", context: "Office Spider" },
        { src: "/appcontent/inspirationImages/reception.jpg", alt: "Welcoming Reception Area", context: "Reception" },
        { src: "/appcontent/inspirationImages/wall-decoration.jpg", alt: "Creative Wall Decoration", context: "Wall Decoration" },
        { src: "/appcontent/inspirationImages/wall-decoration2.jpg", alt: "Abstract Wall Decoration", context: "Wall Decoration" },
        { src: "/appcontent/inspirationImages/wall-decoration3.jpg", alt: "Modern Wall Decoration", context: "Wall Decoration" },
    ];

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-10 text-white">Inspiration Rooms</h1>
                <h3 className="text-xl lg:px-36 text-center mb-10 text-white">Find your inspiration for creating your personalized art work for your home or work place here.
                    With our Exclusive Collection you can buy images for your own ownership of the image and
                    have it exclusively only for you. This will give you the opportunity to have unique artwork on
                    your walls.
                    Be inspired!</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => (
                        <Link key={index} href={image.src}>
                            <div className="relative overflow-hidden rounded-lg shadow-lg h-96">
                                <Image src={image.src} alt={image.alt} fill sizes="100vw 50vw 33vw" quality={30} className="object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                    <p className="text-white text-lg">{image.context}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
