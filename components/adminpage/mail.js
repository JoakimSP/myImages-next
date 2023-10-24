import React, { useState } from 'react'

export default function Mail({contactMails}) {
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <div className="space-y-6 ">
      <table className="min-w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Company</th>
            <th className="py-2 px-4">Country</th>
            <th className="py-2 px-4">Photos</th>
            <th className="py-2 px-4">Message</th>
          </tr>
        </thead>
        <tbody>
          {contactMails.map((contact, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{contact.firstName} {contact.lastName}</td>
              <td className="py-2 px-4">{contact.emailAddress}</td>
              <td className="py-2 px-4">{contact.businessPhone}</td>
              <td className="py-2 px-4">{contact.company}</td>
              <td className="py-2 px-4">{contact.country}</td>
              <td className="py-2 px-4">{contact.photos.length}</td>
              <td className="py-2 px-4">
                <button 
                  className="text-blue-500 hover:underline" 
                  onClick={() => setSelectedMessage(contact.message)}
                >
                  View Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying the message */}
      {selectedMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 w-2/3 h-2/3 overflow-y-auto rounded-md">
            <button 
              className="absolute top-4 right-4 text-red-500" 
              onClick={() => setSelectedMessage(null)}
            >
              Close
            </button>
            <p>{selectedMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}
