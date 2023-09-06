import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function ShowFeaturedCollection({ featuredcol }) {
    const [activeGroup, setActiveGroup] = useState(0);
    const slides = featuredcol.collection.map(col => ({ image: col.image, id: col.id, name: col.name }));


    const slidesPerGroup = 3;
    const totalGroups = Math.ceil(slides.length / slidesPerGroup);

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
        
    
      <div className="relative w-full overflow-hidden">
         <h1 className="text-6xl text-center text-white mb-4">Featured collections</h1>
         <h3 className="text-3xl text-center text-white mb-4">Discover a wide range of diffrent collections of images to fit your needs.</h3>
         <div
             className="relative h-56 md:h-96 flex transition-transform duration-500 ease-in-out"
             style={{
                 transform: `translateX(-${activeGroup * 100 / totalGroups}%)`,
                 width: `${totalGroups * 100}%`
             }}
         >
             {slides.map((slide, index) => (
                 <div className="flex flex-col w-full mx-2">
 
 
                     <div key={slide.id} className="flex-1  px-2 relative flex flex-col">                      
                             <Link href={`/collections/viewCollections?collectionID=${slide.id}`}>
                                 <Image
                                     src={slide.image}
                                     alt={`Slide ${index + 1}`}
                                     fill={true}
                                     className="object-cover w-full"
                                 />
                             </Link>
                         
 
                     </div>
                     <div className="h-12">
                             <h3 className="h-40 text-3xl text-center text-white">{slide.name}</h3>
                         </div>
 
                 </div>
             ))}
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
             className="absolute top-1/2 transform -translate-y-1/2 left-0 z-30 flex items-center justify-center h-12 px-4 cursor-pointer"
             onClick={goToPrevGroup}
         >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
 
         </button>
 
         <button
             type="button"
             className="absolute top-1/2 transform -translate-y-1/2 right-0 z-30 flex items-center justify-center h-12 px-4 cursor-pointer"
             onClick={goToNextGroup}
         >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
 
         </button>
     </div> 
);

}
