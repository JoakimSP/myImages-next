import Layout from "@/components/layout/layout";
import GoBackButton from "@/components/utils/goBackButton";

const Index = () => {
  // Camera data with megapixel, pixel size and quality based on the original table
  const cameras = [
    { megapixel: 24, pixelSize: '5600 x 4200', quality: ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500'] },
    { megapixel: 18, pixelSize: '5200 x 3500', quality: ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-400'] },
    { megapixel: 14, pixelSize: '4600 x 3072', quality: ['bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-500', 'bg-green-400', 'bg-orange-500'] },
    { megapixel: 8, pixelSize: '3500 x 2334', quality: ['bg-green-500', 'bg-green-500', 'bg-green-400', 'bg-green-400', 'bg-yellow-500', 'bg-orange-500'] },
    { megapixel: 6, pixelSize: '3000 x 2000', quality: ['bg-green-500', 'bg-green-500', 'bg-green-400', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500'] },
    { megapixel: 4, pixelSize: '2250 x 1500', quality: ['bg-green-500', 'bg-yellow-400', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-red-500'] },
    { megapixel: 1, pixelSize: '1280 x 850', quality: ['bg-green-400', 'bg-orange-500', 'bg-red-500', 'bg-red-500', 'bg-red-500', 'bg-red-500'] },
  ];

  return (
    <Layout>
      <GoBackButton />
      <div className="overflow-x-auto xl:mx-48">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Camera Megapixel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approximate Image Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Print Size 4x6 in / 10.2x15.2 cm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Print Size 8x12 in / 20.3x30.5 cm (A4)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Print Size 12x16 in / 30.5x40.6 cm (A3)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Print Size 16x24 in / 40.6x61.0 cm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Print Size 20x28 in / 50.8x71.1 cm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Print Size 28x40 in / 71.1x101.6 cm</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cameras.map((camera, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{camera.megapixel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{camera.pixelSize}</td>
                {camera.quality.map((color, i) => (
                  <td key={i} className={`px-6 py-4 whitespace-nowrap text-sm border-4 border-white ${color}`}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex my-4 w-full h-10">
          <div className="flex-1 flex justify-center items-center text-center text-white bg-green-500"><p>Very Good</p></div>
          <div className="flex-1 flex justify-center items-center text-center text-white bg-green-400"><p>Good</p></div>
          <div className="flex-1 flex justify-center items-center text-center text-white bg-yellow-500"><p>Average</p></div>
          <div className="flex-1 flex justify-center items-center text-center text-white bg-orange-500"><p>Doubtful</p></div>
          <div className="flex-1 flex justify-center items-center text-center text-white bg-red-500"><p>Not Usable</p></div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
