import React from 'react'
import Layout from '@/components/layout/layout'
import Link from 'next/link'
import prisma from '@/components/prisma';

export default function howToAndPricing({ pricingData }) {
    return (
        <Layout>
            <div className="pt-4 text-white">
                <h1 className="mb-5 text-center text-4xl font-bold md:text-6xl">
                    {pricingData.title}
                </h1>
                <div className="mx-auto mb-6 max-w-4xl text-center leading-7 md:text-lg">
                    {pricingData.subtitle}
                </div>
                <div className="mb-8 flex justify-center whitespace-nowrap">
                    <Link className="border-b-4 border-white px-1.5 py-2.5 text-xl font-bold hover:border-blue-400 md:px-5" href="/sizes-and-pricing">
                        Photos & Sizes
                    </Link>
                    <Link className="px-1.5 py-2.5 text-xl font-bold text-gray-300 hover:border-b-4 hover:text-blue-400 md:px-5" href="/contact-for-exclusive-rights">
                        Exclusive Rights
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image card 1 - Left Image */}
                    <div className="p-4 border rounded shadow-sm">
                        <img className="w-full h-56 object-cover rounded-t" src={pricingData.imageUrlLeft} alt={pricingData.imageTitleLeft} />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{pricingData.imageTitleLeft}</h2>
                            <p className="text-gray-400 mb-4">{pricingData.imageSubTitleLeft}</p>
                            <span className="text-lg font-bold">{pricingData.imagePriceLeft}</span>
                        </div>
                    </div>
                    {/* Image card 2 - Right Image */}
                    <div className="p-4 border rounded shadow-sm">
                        <img className="w-full h-56 object-cover rounded-t" src={pricingData.imageUrlRight} alt={pricingData.imageTitleRight} />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{pricingData.imageTitleRight}</h2>
                            <p className="text-gray-400 mb-4">{pricingData.imageSubTitleRight}</p>
                            <span className="text-lg font-bold">{pricingData.imagePriceRight}</span>
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-400 mt-8">
                    {pricingData.footerText} {/* Injecting the footer text */}
                    <br />
                    For exclusive rights and custom inquiries, please <Link className="underline hover:text-blue-400 hover:no-underline" href="/contact" target="_blank" rel="noreferrer">contact us</Link>. All standard sizes come with a <Link className="underline hover:text-blue-400 hover:no-underline" href="/license#standard-license" target="_blank" rel="noreferrer">Standard License</Link>. Exclusive rights are negotiated separately.
                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps() {
    const pricingData = await prisma.pricingpage.findFirst({
        where: {
            id: "1"
        },
        select: {
            title: true,
            subtitle: true,
            imageUrlLeft: true,
            imageTitleLeft: true,
            imageSubTitleLeft: true,
            imagePriceLeft: true,
            imageUrlRight: true,
            imageTitleRight: true,
            imageSubTitleRight: true,
            imagePriceRight: true,
            footerText: true,
        }
    });

    return {
        props: {
            pricingData
        }
    };
}