import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SecurityOptions({ userdata }) {
  const [twoFA, setTwoFA] = useState(userdata.twoFactorEnabled);
  const [qrData, setQrData] = useState('');

  const handleToggleTwoFA = async () => {
    const endpoint = twoFA ? '../../api/users/2fa/removeTwoFASecret' : '../../api/users/2fa/addTwoFASecret';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userdata.personID, email: userdata.email })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.qrcodeImage) {
        setQrData(data.qrcodeImage);
      } else {
        setQrData('');
      }
      setTwoFA(!twoFA);
      toast("2FA settings updated.");
    } else {
      toast.error("Failed to update 2FA settings.");
    }
  };

  return (

      <div className='bottom-96 relative'>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Two-Factor Authentication</h2>
            <button
              onClick={handleToggleTwoFA}
              className={`px-4 py-2 rounded-lg font-semibold text-sm ${twoFA ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              {twoFA ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
            {twoFA && qrData && (
              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-600">Scan this QR code with your 2FA app:</p>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Image src={qrData} width={300} height={300} alt="QR Code" className="rounded-lg" />
                </div>
              </div>
            )}
          </div>
      </div>
  );
}
