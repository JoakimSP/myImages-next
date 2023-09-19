import { useState, useEffect } from 'react';



export default function TestImage() {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await fetch('/api/testReadImage?name=imagename.png');
            
                if (response.ok) {
                    const blob = await response.blob();
                    const localImageUrl = URL.createObjectURL(blob);
                    setImageUrl(localImageUrl);
                } else {
                    console.error('Failed to fetch image. Status:', response.status);
                }
            } catch (error) {
                console.error('There was an error fetching the image:', error);
            }
            
        }

        fetchImage();
    }, []);

    if (!imageUrl) return <p>Loading...</p>;

    return (
      <div>
        <img src={imageUrl} alt="My Image" />
      </div>
    );
}
