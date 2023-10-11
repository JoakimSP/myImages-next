

export default function LoadingScreen({randomFactIndex}) {
    const funFacts = [
        "Did you know the world&apos;s largest photograph was taken with a 6ft tall camera and measures 31x111 feet?",
        "The first-ever color photograph was taken in 1861 by a physicist named James Clerk Maxwell.",
        "The most expensive camera ever sold was a rare 1923 Leica camera, auctioned for a staggering $2.8 million.",
        "The term &apos;megapixel&apos; was first used way back in 1984.",
        "The first digital camera was created in 1975 by an engineer at Eastman Kodak. It weighed 8 pounds!",
        "There are about 60 trillion photos stored on Facebook&apos;s servers.",
        "The most viewed photograph in history is the Windows XP&apos;s default wallpaper named &apos;Bliss&apos;.",
        "The word &apos;photography&apos; originates from the Greek words &apos;photos&apos; (light) and &apos;graphé&apos; (drawing) - drawing with light.",
        "The camera obscura, an ancestor of the modern camera, has been known and used for over 2,000 years.",
        "The first photo of a person was taken in 1838 and it required an exposure time of 10 minutes!",
        "Kodak&apos;s first camera came with the slogan: &apos;You press the button, we do the rest.&apos;",
        "In 1827, Joseph Nicephore Niepce took the world&apos;s first photograph, but it took 8 hours of exposure time.",
        "The largest collection of cameras is owned by Dilish Parekh of Mumbai, India. He has collected over 4,500 antique cameras.",
        "The first photo of the Moon was taken in 1851, while the first full photograph of our Earth from space was taken in 1966.",
        "A single raw image file from the Hubble telescope can be more than 60 MB in size.",
        "The first commercial digital camera available to the public was the Casio QV-10 in 1995.",
        "A photographer named Alan McFadyen tried for six years, taking 720,000 photos, to get the perfect shot of a kingfisher diving straight into the water without causing a splash. He succeeded in 2015.",
        "The famous National Geographic cover of an Afghan girl in 1985 was taken on Kodachrome film using a Nikon FM2 camera.",
        "Photojournalist Robert Capa&apos;s iconic image from D-Day, titled &apos;The Magnificent Eleven&apos;, are the only surviving images of the first wave of the Normandy landing. The rest were destroyed by accident in a photo lab.",
        "The first selfie can be traced back to 1839 when Robert Cornelius took a photo of himself. It required him to sit still for 10 minutes!"
    ];
    
    

    const randomFact = funFacts[randomFactIndex];

    return (
        <div className="absolute w-full h-[80rem] z-40">
        <div className="absolute w-full h-full bg-black opacity-60"></div>
        <div className="flex justify-center items-center flex-col absolute w-full h-full z-10">
            <div className="flex flex-col justify-center items-center p-8 border-4 rounded-xl bg-slate-500">
                <div className="flex items-center mb-4">
                    <svg aria-hidden="true" className="h-12 w-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <p className="text-center text-4xl z-10 text-white"> Uploading Your Image...</p>
                </div>
                <p className="text-xl z-10 text-gray-300 mb-2">📸 High-quality photos can be quite large and may take a moment to upload.</p>
                <p className="text-sm text-gray-400 mb-2">✔️ For best results, ensure you're on a stable internet connection.</p>
                <p className="text-sm text-gray-400 mb-4">🔍 Your image is being securely uploaded and processed.</p>
                <p className="text-sm text-gray-500">Fun Fact: {randomFact}</p>
            </div>
        </div>
    </div>
    
    );
};
