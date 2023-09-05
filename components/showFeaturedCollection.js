import Image from "next/image";
import Slider from "react-slick";
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

export default function ShowFeaturedCollection({featuredcol}) {
    const [isMounted, setIsMounted] = useState(false);

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
    
    <h1 className='text-7xl text-center text-white my-4'>Featured Collections</h1>
    <div className='flex flex-col py-8 mx-8'>
    {isMounted &&
      <Slider {...settings}>
        {featuredcol.collection.map((col) => {
          return (
            <div key={col.id}>
              <Link href={`/collections/viewCollections?collectionID=${col.id}`}>
                <div className="group relative h-96">
                  <Image
                    src={col.image}
                    alt="Collection image"
                    fill={true}
                    className="object-cover w-full"
                    sizes="(max-width: 768px)"
                  />
                </div>
                <div><h3 className="text-center text-3xl text-white">{col.name}</h3></div>
              </Link>
            </div>
          )
        })}
      </Slider>
      }
    </div>
</>

  )
}
