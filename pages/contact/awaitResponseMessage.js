import Layout from '@/components/layout/layout'
import React from 'react'
import Head from 'next/head'

export default function AwaitResponseMessage() {
    return (
        <Layout>
            <Head>
                <title>Awaiting Response</title>
                <meta name="description" content="Your submission has been received. Thank you for reaching out to us. Our team is currently reviewing your inquiry and will respond promptly." />
                <meta name="keywords" content="submission, received, inquiry, response, awaiting" />
            </Head>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="p-6 bg-white rounded-lg shadow-xl">
                    <svg className="w-16 h-16 mb-4 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                    <h2 className="mb-4 text-xl font-semibold text-gray-700 text-center">
                        Your Submission Has Been Received
                    </h2>
                    <p className="text-gray-600 text-center">
                        Thank you for reaching out to us. We appreciate the opportunity to assist you. Our team is currently reviewing your inquiry and will respond promptly.
                    </p>
                </div>
            </div>
        </Layout>
    )
}
