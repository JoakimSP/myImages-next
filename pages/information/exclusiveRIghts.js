import Layout from "@/components/layout/layout"
import Link from "next/link"
import Image from "next/image"
import prisma from "@/components/prisma"

export default function ExclusiveRights({ pricingExclusiveData }) {
    return (
        <Layout>
            <div className="pt-4 text-white w-full h-full px-4 md:px-0 bg-custom-grey">
                <div className="relative h-full">
                    <Image
                        src={`/api/images/viewImage?name=${pricingExclusiveData.image}`}
                        alt="Exclusive right image"
                        fill={true}
                        className="object-cover" />
                    <div className="flex flex-col">
                        <h1 className="mb-5 text-center text-4xl font-bold md:text-6xl z-10">
                            {pricingExclusiveData.title}
                        </h1>
                        <div className="mx-auto mb-6 max-w-4xl text-center leading-7 md:text-lg z-10 whitespace-pre-wrap">
                           {pricingExclusiveData.subtitle}
                        </div>
                        <div className="mb-8 flex flex-col md:flex-row items-center justify-center whitespace-nowrap z-10">
                            <Link href="/information/howToAndPricing" className="z-10 px-2 py-2.5 text-xl font-bold hover:border-b-4 hover:text-blue-400  md:px-5">
                                Photos & Sizes
                            </Link>
                            <Link href="/information/exclusiveRights" className="z-10 border-b-4 border-white px-2 py-2.5 text-xl font-bold text-gray-300 hover:border-b-4 hover:text-blue-400 md:px-5">
                            Exclusive Collection, how it works
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="mx-auto mb-6 max-w-4xl text-center leading-7 md:text-lg whitespace-pre-wrap">
                    {pricingExclusiveData.text}
                </div>
                </div>
        </Layout>
    )
}


export async function getServerSideProps() {
    const pricingExclusiveData = await prisma.pricingpageExclusive.findFirst({
        where: {
            id: "1"
        },
        select: {
            title: true,
            subtitle: true,
            image: true,
            text: true,
        }
    });

    return {
        props: {
            pricingExclusiveData
        }
    };
}
