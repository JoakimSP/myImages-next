import React, { useState } from 'react';
import ViewReceipt from './viewReceipt';

export default function ReceiptsList({ receipts }) {
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const formatDate = (timestamp) => {
        const date = new Date(Number(timestamp));
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const filterReceiptsByDate = () => {
        let start = startDate ? new Date(startDate + 'T00:00:00').getTime() : null;
        let end = endDate ? new Date(endDate + 'T23:59:59').getTime() : null;
    
        return receipts.filter(receipt => {
            let receiptDate = new Date(Number(receipt.dateAdded)).getTime();
            return (start ? receiptDate >= start : true) && (end ? receiptDate <= end : true);
        });
    };
    
    

    const handleClose = () => setSelectedReceipt(null);

    return (
        <div className="p-4 relative">
            <div className="mb-4">
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="p-2 border rounded mr-2"
                />
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    className="p-2 border rounded"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filterReceiptsByDate().map(receipt => (
                    <div key={receipt.id} className="border p-2 rounded-lg cursor-pointer bg-gray-500 hover:bg-gray-100" onClick={() => setSelectedReceipt(receipt)}>
                        <p>Receipt ID: {receipt.id}</p>
                        <p>Date: {formatDate(receipt.dateAdded)}</p>
                        <p>Price: ${receipt.price}</p>
                    </div>
                ))}
            </div>

            {selectedReceipt && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <ViewReceipt receipt={selectedReceipt} date={formatDate(selectedReceipt.dateAdded)}/>
                        <button onClick={handleClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
