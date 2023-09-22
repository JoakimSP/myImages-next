import React from 'react'
import Layout from '@/components/layout/layout'
import Link from 'next/link'

export default function howToAndPricing() {
  return (
    <Layout>
   <div className="pt-4  text-white">
            <h1 className="mb-5 text-center text-4xl font-bold md:text-6xl">Exclusive Photo Marketplace</h1>
            <div className="mx-auto mb-6 max-w-4xl text-center leading-7 md:text-lg">
                Discover a curated collection of unique photos. Choose from three different sizes or acquire exclusive rights.
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
                {/* Sample image card 1 */}
                <div className="p-4 border rounded shadow-sm">
                    <img className="w-full h-56 object-cover rounded-t" src="/path/to/image1.jpg" alt="Sample Image 1"/>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Image Title 1</h2>
                        <p className="text-gray-400 mb-4">Choose from small, medium, or large sizes. Or inquire about exclusive rights.</p>
                        <span className="text-lg font-bold">$9.99 - $29.99</span>  {/* Assuming varying prices for sizes */}
                    </div>
                </div>
                
                {/* Sample image card 2 */}
                <div className="p-4 border rounded shadow-sm">
                    <img className="w-full h-56 object-cover rounded-t" src="/path/to/image2.jpg" alt="Sample Image 2"/>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">Image Title 2</h2>
                        <p className="text-gray-400 mb-4">Available in three different sizes. Exclusive rights available upon request.</p>
                        <span className="text-lg font-bold">$12.99 - $32.99</span>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-400 mt-8">
                For exclusive rights and custom inquiries, please <Link className="underline hover:text-blue-400 hover:no-underline" href="/contact" target="_blank" rel="noreferrer">contact us</Link>. All standard sizes come with a <Link className="underline hover:text-blue-400 hover:no-underline" href="/license#standard-license" target="_blank" rel="noreferrer">Standard License</Link>. Exclusive rights are negotiated separately.
            </div>
        </div>
</Layout>
  )
}
