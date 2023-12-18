import { useEffect, useState } from "react";
import formatCurrency from "../utils/formatCurrency";

export default function ViewReceipt({ receipt, date }) {
    const [photoInformation, setPhotoInformation] = useState();

    const photos = receipt.photosID.split(",");

    useEffect(() => {
        const getPhotoInformation = async () => {
            try {
                const response = await fetch('/api/application/getImageInfo', {
                    method: "POST",
                    body: JSON.stringify(photos),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const info = await response.json();
                    setPhotoInformation(info);
                } else {
                    console.log("Something went wrong");
                }
            } catch (error) {
                console.error("Error fetching photo information:", error);
            }
        };

        getPhotoInformation();
    }, []);

    return (
        <div className="mt-4 p-4 max-w-xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Receipt Details</h2>
            <div className="flex flex-col space-y-2">
                <InfoItem label="ID" value={receipt.id} />
                <InfoItem label="Receipt Index" value={receipt.index} />
                <InfoItem label="Price" value={`$${receipt.price}`} />
                <InfoItem label="Email" value={receipt.sessionEmail} />
                <InfoItem label="Purchased" value={date} />
                <div>
                    <h3 className="font-semibold text-gray-600">Purchased photos</h3>
                    {photoInformation ? (
                        <div className="space-y-2">
                            {photoInformation.map((photo, index) => (
                                <div key={index} className="border p-2 rounded">
                                    <p className="font-semibold">Photo ID: {photo.id}</p>
                                    <p>Photographer ID: {photo.personID}</p>
                                    <p>price : {formatCurrency(photo.price)}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading photo information...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper component for displaying information items
const InfoItem = ({ label, value }) => (
    <div className="text-gray-600">
        <span className="font-semibold">{label}:</span> {value}
    </div>
);
