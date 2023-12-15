export default function ViewReceipt({ receipt, date }) {

    const photos = receipt.photosID.split(",")

    console.log(photos)

    return (
        <div className="mt-4 p-4 max-w-xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Receipt Details</h2>
            <div className="flex flex-col space-y-2">
                <div className="text-gray-600">
                    <span className="font-semibold">ID:</span> {receipt.id}
                </div>
                <div className="text-gray-600">
                    <span className="font-semibold">Receipt Index:</span> {receipt.index}
                </div>
                <div className="text-gray-600">
                    <span className="font-semibold">Price:</span> ${receipt.price}
                </div>
                <div className="text-gray-600">
                    <span className="font-semibold">Email:</span> {receipt.sessionEmail}
                </div>
                <div className="text-gray-600">
                    <span className="font-semibold">Purchased:</span> {date}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-600">Purchased photos</h3>
                   {photos.map( (photo, index) =>{ return <p key={index}>{photo}</p>})}
                </div>
                
            </div>
        </div>
    );
}
