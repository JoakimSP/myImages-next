import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import blurDataURL from "../svgSkeleton";



export default function ShowFeaturedCollection({ featuredcol }) {
    const [activeGroup, setActiveGroup] = useState(0);
    const [loadingId, setLoadingId] = useState(null);
    const [slidesPerGroup, setSlidesPerGroup] = useState(4); // Start with default of 4

    const slides = featuredcol.collection.map(col => ({
        image: col.imagepathrelative,
        id: col.id,
        name: col.name,
        sortOrder: col.sortOrder
    }));
    const totalGroups = Math.ceil(slides.length / slidesPerGroup);
    const sortedSlides = slides.sort((a, b) => { return a.sortOrder - b.sortOrder })


    useEffect(() => {
        const updateSlidesPerGroup = () => {
            if (window.innerWidth < 640) {
                setSlidesPerGroup(2);
            } else {
                setSlidesPerGroup(4);
            }
        };

        updateSlidesPerGroup(); // Initial call
        window.addEventListener('resize', updateSlidesPerGroup);

        return () => window.removeEventListener('resize', updateSlidesPerGroup);
    }, []);

    const handleClick = (id) => {
        setLoadingId(id);
    };

    const goToGroup = (index) => {
        setActiveGroup(index);
    };

    const goToPrevGroup = () => {
        let index = activeGroup - 1;
        if (index < 0) index = totalGroups - 1;
        setActiveGroup(index);
    };

    const goToNextGroup = () => {
        let index = (activeGroup + 1) % totalGroups;
        setActiveGroup(index);
    };

    return (
        <div className="relative w-full overflow-hidden pb-14">
            <h1 className="text-6xl text-center text-white mb-4">{featuredcol.title}</h1>
            <h3 className="text-3xl text-center text-white mb-4">{featuredcol.subTitle}</h3>
            <div
                className="relative h-56 md:h-96 flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${activeGroup * 100 / totalGroups}%)`,
                    width: `${totalGroups * 100}%`
                }}
            >
                {sortedSlides.map((slide, index) => {
                const isLoading = slide.id === loadingId;
                return(
                    <div key={slide.id} className="flex flex-col w-full mx-2">
                        <div className="flex-1 px-2 relative flex flex-col" onClick={() => handleClick(slide.id)}>
                            <Link className="relative w-full h-full" href={`/collections/viewCollections?collectionID=${slide.id}`}>
                                <Image
                                    src={`/api/images/getFeaturedColImages?imagePath=${slide.image}`}
                                    alt={`Slide ${index + 1}`}
                                    fill={true}
                                    sizes={"50vw, 25vw"}
                                    className="object-cover w-full"
                                    placeholder="blur"
                                    blurDataURL={blurDataURL}
                                    quality={1}
                                />
                                {isLoading && (
                                    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
                                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                )}
                            </Link>
                        </div>
                        <div className="h-12 pt-6">
                            <h3 className="h-40 text-3xl text-center text-white">{slide.name}</h3>
                        </div>
                    </div>
                )
                })}
            </div>
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                {Array.from({ length: totalGroups }).map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className="w-3 h-3 rounded-full"
                        aria-current={index === activeGroup}
                        aria-label={`Slide group ${index + 1}`}
                        onClick={() => goToGroup(index)}
                    ></button>
                ))}
            </div>
            <button
                type="button"
                className="absolute top-1/2 transform-translate-y-1/2 left-0 z-30 flex items-center justify-center m-1 h-7 w-7 md:h-10 md:w-10 pr-2 cursor-pointer bg-gray-300 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring transition ease-in duration-200"
                onClick={goToPrevGroup}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>

            </button>
            <button
                type="button"
                className="absolute top-1/2 transform-translate-y-1/2 right-0 z-30 flex items-center justify-center m-1 h-7 w-7 md:h-10 md:w-10 pl-1 cursor-pointer bg-gray-300 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring transition ease-in duration-200"
                onClick={goToNextGroup}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 md:w-10 md:h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>


            </button>
        </div>
    );
}

