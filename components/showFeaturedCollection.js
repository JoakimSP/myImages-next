import Image from "next/image";
import dynamic from 'next/dynamic';
import ErrorBoundary from "./errorBoundery";
import Head from "next/head";
/* import Slider from "react-slick"; */

const Slider = dynamic(import('react-slick'), {
    ssr: false,
})
import Link from "next/link";
import { useState, useEffect } from "react";

function Arrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        />
    );
}

export default function ShowFeaturedCollection({ featuredcol }) {
    const [isMounted, setIsMounted] = useState(false);
console.log(featuredcol)

    useEffect(() => {
        setIsMounted(true);
    }, []);
    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 4) % featuredcol.collection.length);
    }

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 4 < 0 ? featuredcol.collection.length - 4 : prev - 4));
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <Head>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <Image
            src={featuredcol.collection[0].image}
            alt="image"
            width={300}
            height={300}
            />
            <h1 className='text-7xl text-center text-white my-4'>Featured Collections</h1>
            <div className='flex flex-col py-8 mx-8'>
                {isMounted &&
                    <ErrorBoundary>
                        <Slider {...settings}>
                          {featuredcol.collection.map((col) => {
                                return (
                                    <div key={col.id}>
                                        <Link href={`/collections/viewCollections?collectionID=${col.id}`}>
                                            <div className="group relative h-96">
                                            <div className="object-cover w-full h-96 bg-cover" style={{ backgroundImage: `url(${col.image})` }}></div>



                                            </div>
                                            <div><h3 className="text-center text-3xl text-white">{col.name}</h3></div>
                                        </Link>
                                    </div>
                                )
                            })} 
                        </Slider>
                    </ErrorBoundary>
                }
            </div>
        </>

    )
}
