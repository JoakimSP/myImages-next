import Layout from "@/components/layout/layout"
import Link from "next/link"

export default function ExclusiveRights() {
    return (
        <Layout>
            <div className="pt-4 text-white w-full h-full px-4 md:px-0 bg-custom-grey">
                <h1 className="mb-5 text-center text-4xl font-bold md:text-6xl">
                    Exclusive Photography: Own a Moment in Time
                </h1>
                <div className="mx-auto mb-6 max-w-4xl text-center leading-7 md:text-lg">
                    Picture this: An image so distinct, it exists only for you. Every photograph tells a story, but when you purchase with us, that story is exclusively yours. Dive into our curated collection and discover photos that don't just capture a moment, but become solely a part of your narrative.
                </div>
                <div className="mb-8 flex justify-center space-x-4 whitespace-nowrap">
                    <Link href="/information/howToAndPricing" className="px-2 py-2.5 text-xl font-bold hover:border-b-4 hover:text-blue-400  md:px-5">
                        Photos & Sizes
                    </Link>
                    <Link href="/information/exclusiveRights" className="border-b-4 border-white px-2 py-2.5 text-xl font-bold text-gray-300 hover:border-b-4 hover:text-blue-400 md:px-5">
                        Exclusive Rights
                    </Link>
                </div>
                <div className="mx-auto mb-6 max-w-4xl text-center leading-7 md:text-lg">
                    <ul className="list-decimal list-inside pl-5">
                        <li>Absolute Originality: Every image sold is removed from our gallery forever. You won&apos;t find it anywhere else, ensuring that the artwork you purchase remains one-of-a-kind.</li>
                        <li>Premium Quality: Our professional photographers are masters of their craft, capturing moments in the highest resolution and perfect clarity.</li>
                        <li>Legally Protected: With our exclusive rights agreement, rest assured that the image you purchase is legally protected, ensuring its uniqueness remains intact.</li>
                        <li>Diverse Collection: From breathtaking landscapes and intimate portraits to the abstract and avant-garde, our gallery spans diverse themes and subjects.</li>
                        <li>Ready for Any Application: Whether it's for a major advertising campaign, the cover of your next bestseller, or a centerpiece in your living room, our images are versatile and ready to shine.</li>
                    </ul>
                    <p className="mt-5">
                        Our mission is more than just selling photographs; it's about elevating your projects, brand, or spaces to a level of unmatched distinction. When you choose an exclusive photo from our collection, you're not just buying an image; you're investing in a vision, a sentiment, and a promise of unparalleled originality.
                    </p>
                    <p className="mt-5 font-bold">
                        Our collection is ever-evolving, and once a photo is sold, it's gone forever. Don't miss the opportunity to be the sole owner of a moment in time. Browse our gallery and secure your exclusive image now.
                    </p>
                </div>
                <div className="text-center text-sm text-gray-400 mt-8">
                    <p>Embrace the extraordinary, because some moments are too precious to be shared.</p>
                    <br />
                    For exclusive rights and custom inquiries, please <Link className="underline hover:text-blue-400 hover:no-underline" href="/contact">contact us</Link>. All standard sizes come with a <Link className="underline hover:text-blue-400 hover:no-underline" href="/license#standard-license">Standard License</Link>. Exclusive rights are negotiated separately.
                </div>
            </div>
        </Layout>
    )
}
