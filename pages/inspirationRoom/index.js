import Layout from "@/components/layout/layout"
import Image from "next/image";
import Link from "next/link";
import aboveBed from '/public/appcontent/inspirationImages/above-bed.jpg';
import aboveDrawerWall from '/public/appcontent/inspirationImages/above-drawer-wall.jpg';
import livingRoomEntry from '/public/appcontent/inspirationImages/besides-livingroom-entry.jpg';
import coffeeShopCorner from '/public/appcontent/inspirationImages/coffieshop-corner.jpg';
import endOfStairs from '/public/appcontent/inspirationImages/end-of-stairs.jpg';
import smallImageGallery from '/public/appcontent/inspirationImages/gallery-smallimage.png';
import galleryView from '/public/appcontent/inspirationImages/gallery.jpg';
import hallway from '/public/appcontent/inspirationImages/hallway.jpg';
import livingRoomWall from '/public/appcontent/inspirationImages/livingroom-giant-wall-image.jpg';
import modernLivingRoom from '/public/appcontent/inspirationImages/livingroom.jpg';
import lounge from '/public/appcontent/inspirationImages/lounge.jpg';
import officeFlower from '/public/appcontent/inspirationImages/office-flower-bee.jpg';
import officeSpider from '/public/appcontent/inspirationImages/office-spider.jpg';
import reception from '/public/appcontent/inspirationImages/reception.jpg';
import wallDecoration from '/public/appcontent/inspirationImages/wall-decoration.jpg';
import wallDecoration2 from '/public/appcontent/inspirationImages/wall-decoration2.jpg';
import wallDecoration3 from '/public/appcontent/inspirationImages/wall-decoration3.jpg';


export default function Index() {

    const galleryImages = [
        { src: aboveBed, alt: "Elegant Bedroom Setting", context: "Above Bed" },
        { src: aboveDrawerWall, alt: "Chic Drawer Wall Arrangement", context: "Above Drawer" },
        { src: livingRoomEntry, alt: "Stylish Living Room Entry", context: "Living Room Entry" },
        { src: coffeeShopCorner, alt: "Cozy Coffee Shop Corner", context: "Coffee Shop" },
        { src: endOfStairs, alt: "End of Stairs Decoration", context: "Staircase" },
        { src: smallImageGallery, alt: "Small Image Gallery", context: "Small Image" },
        { src: galleryView, alt: "Gallery View", context: "Gallery" },
        { src: hallway, alt: "Hallway Elegance", context: "Hallway" },
        { src: livingRoomWall, alt: "Living Room with Giant Wall Image", context: "Living Room Wall" },
        { src: modernLivingRoom, alt: "Modern Living Room", context: "Living Room" },
        { src: lounge, alt: "Relaxing Lounge", context: "Lounge" },
        { src: officeFlower, alt: "Office with Flower and Bee Decor", context: "Office Flower" },
        { src: officeSpider, alt: "Office with Spider Wall Art", context: "Office Spider" },
        { src: reception, alt: "Welcoming Reception Area", context: "Reception" },
        { src: wallDecoration, alt: "Creative Wall Decoration", context: "Wall Decoration" },
        { src: wallDecoration2, alt: "Abstract Wall Decoration", context: "Wall Decoration" },
        { src: wallDecoration3, alt: "Modern Wall Decoration", context: "Wall Decoration" },
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
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="100vw 50vw 33vw"
                                    quality={30}
                                    className="object-cover"
                                />
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
