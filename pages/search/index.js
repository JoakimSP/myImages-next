import Header from "@/components/header"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function index() {
    const [images, setImages] = useState([])

 
   

    return (
        <div>
            <Header />
            <h1>Search images</h1>
            {images.map((image) => {
                return (<div key={image}>
                    <Image
                    src={`@/images/${image}`}
                    alt={`${image}`}
                    width={300}
                    height={300}
                    fill
                    />
                </div>

                )

            })}
        </div>
    )
}

