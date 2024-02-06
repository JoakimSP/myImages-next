import Layout from "@/components/layout/layout"
import Image from "next/image";
import Link from "next/link";
import aboveBed from '/public/appcontent/inspirationImages/webp/above-bed.webp';
import aboveDrawerWall from '/public/appcontent/inspirationImages/webp/above-drawer-wall.webp';
import livingRoomEntry from '/public/appcontent/inspirationImages/webp/besides-livingroom-entry.webp';
import coffeeShopCorner from '/public/appcontent/inspirationImages/webp/coffieshop-corner.webp';
import endOfStairs from '/public/appcontent/inspirationImages/webp/end-of-stairs.webp';
import smallImageGallery from '/public/appcontent/inspirationImages/webp/gallery-smallimage.webp';
import galleryView from '/public/appcontent/inspirationImages/webp/gallery.webp';
import hallway from '/public/appcontent/inspirationImages/webp/hallway.webp';
import livingRoomWall from '/public/appcontent/inspirationImages/webp/livingroom-giant-wall-image.webp';
import modernLivingRoom from '/public/appcontent/inspirationImages/webp/livingroom.webp';
import lounge from '/public/appcontent/inspirationImages/webp/lounge.webp';
import officeFlower from '/public/appcontent/inspirationImages/webp/office-flower-bee.webp';
import officeSpider from '/public/appcontent/inspirationImages/webp/office-spider.webp';
import reception from '/public/appcontent/inspirationImages/webp/reception.webp';
import wallDecoration from '/public/appcontent/inspirationImages/webp/wall-decoration.webp';
import wallDecoration2 from '/public/appcontent/inspirationImages/webp/wall-decoration2.webp';
import wallDecoration3 from '/public/appcontent/inspirationImages/webp/wall-decoration3.webp';
import blurDataURL from "@/components/svgSkeleton";

/* // Import thumbnail images for blur placeholders
import thumbAboveBed from '/public/appcontent/inspirationImages/thumbnails/above-bed.webp';
import thumbAboveDrawerWall from '/public/appcontent/inspirationImages/thumbnails/above-drawer-wall.webp';
import thumbLivingRoomEntry from '/public/appcontent/inspirationImages/thumbnails/besides-livingroom-entry.webp';
import thumbCoffeeShopCorner from '/public/appcontent/inspirationImages/thumbnails/coffieshop-corner.webp';
import thumbEndOfStairs from '/public/appcontent/inspirationImages/thumbnails/end-of-stairs.webp';
import thumbSmallImageGallery from '/public/appcontent/inspirationImages/thumbnails/gallery-smallimage.webp';
import thumbGalleryView from '/public/appcontent/inspirationImages/thumbnails/gallery.webp';
import thumbHallway from '/public/appcontent/inspirationImages/thumbnails/hallway.webp';
import thumbLivingRoomWall from '/public/appcontent/inspirationImages/thumbnails/livingroom-giant-wall-image.webp';
import thumbModernLivingRoom from '/public/appcontent/inspirationImages/thumbnails/livingroom.webp';
import thumbLounge from '/public/appcontent/inspirationImages/thumbnails/lounge.webp';
import thumbOfficeFlower from '/public/appcontent/inspirationImages/thumbnails/office-flower-bee.webp';
import thumbOfficeSpider from '/public/appcontent/inspirationImages/thumbnails/office-spider.webp';
import thumbReception from '/public/appcontent/inspirationImages/thumbnails/reception.webp';
import thumbWallDecoration from '/public/appcontent/inspirationImages/thumbnails/wall-decoration.webp';
import thumbWallDecoration2 from '/public/appcontent/inspirationImages/thumbnails/wall-decoration2.webp';
import thumbWallDecoration3 from '/public/appcontent/inspirationImages/thumbnails/wall-decoration3.webp'; */



export default function Index() {

    const galleryImages = [
        { src: aboveBed, linkSrc: "/appcontent/inspirationImages/above-bed.jpg", alt: "Elegant Bedroom Setting", context: "Above Bed" },
        { src: aboveDrawerWall, linkSrc: "/appcontent/inspirationImages/above-drawer-wall.jpg", alt: "Chic Drawer Wall Arrangement", context: "Above Drawer" },
        { src: livingRoomEntry, linkSrc: "/appcontent/inspirationImages/besides-livingroom-entry.jpg", alt: "Stylish Living Room Entry", context: "Living Room Entry" },
        { src: coffeeShopCorner, linkSrc: "/appcontent/inspirationImages/coffieshop-corner.jpg", alt: "Cozy Coffee Shop Corner", context: "Coffee Shop" },
        { src: endOfStairs, linkSrc: "/appcontent/inspirationImages/end-of-stairs.jpg", alt: "End of Stairs Decoration", context: "Staircase" },
        { src: smallImageGallery, linkSrc: "/appcontent/inspirationImages/gallery-smallimage.png", alt: "Small Image Gallery", context: "Small Image" },
        { src: galleryView, linkSrc: "/appcontent/inspirationImages/gallery.jpg", alt: "Gallery View", context: "Gallery" },
        { src: hallway, linkSrc: "/appcontent/inspirationImages/hallway.jpg", alt: "Hallway Elegance", context: "Hallway" },
        { src: livingRoomWall, linkSrc: "/appcontent/inspirationImages/livingroom-giant-wall-image.jpg", alt: "Living Room with Giant Wall Image", context: "Living Room Wall" },
        { src: modernLivingRoom, linkSrc: "/appcontent/inspirationImages/livingroom.jpg", alt: "Modern Living Room", context: "Living Room" },
        { src: lounge, linkSrc: "/appcontent/inspirationImages/lounge.jpg", alt: "Relaxing Lounge", context: "Lounge" },
        { src: officeFlower, linkSrc: "/appcontent/inspirationImages/office-flower-bee.jpg", alt: "Office with Flower and Bee Decor", context: "Office Flower" },
        { src: officeSpider, linkSrc: "/appcontent/inspirationImages/office-spider.jpg", alt: "Office with Spider Wall Art", context: "Office Spider" },
        { src: reception, linkSrc: "/appcontent/inspirationImages/reception.jpg", alt: "Welcoming Reception Area", context: "Reception" },
        { src: wallDecoration, linkSrc: "/appcontent/inspirationImages/wall-decoration.jpg", alt: "Creative Wall Decoration", context: "Wall Decoration" },
        { src: wallDecoration2, linkSrc: "/appcontent/inspirationImages/wall-decoration2.jpg", alt: "Abstract Wall Decoration", context: "Wall Decoration" },
        { src: wallDecoration3, linkSrc: "/appcontent/inspirationImages/wall-decoration3.jpg", alt: "Modern Wall Decoration", context: "Wall Decoration" },
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
                        <Link key={index} href={image.linkSrc}>
                            <div className="relative overflow-hidden rounded-lg shadow-lg h-96">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="100vw 50vw 33vw"
                                    quality={30}
                                    placeholder="blur"
                                    blurDataURL={blurDataURL}
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
