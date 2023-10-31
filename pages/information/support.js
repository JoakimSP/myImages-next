import Layout from "@/components/layout/layout"
import { useState } from "react"
import Link from "next/link"

export default function Support() {
    const [first, setFirst] = useState("hidden")
    const [second, setSecond] = useState("hidden")
    const [third, setThird] = useState("Hidden")

    const toggleShowHidden = (id) => {
        switch (id) {
            case 1:
                setFirst(first === "hidden" ? "" : "hidden");
                break;
            case 2:
                setSecond(second === "hidden" ? "" : "hidden");
                break;
            case 3:
                setThird(third === "hidden" ? "" : "hidden");
                break;
            case 4:
                setThird(third === "hidden" ? "" : "hidden");
                break;
            default:
                break;
        }
    }

    return (
        <Layout>
            <div className="bg-custom-grey h-full">

                <div className=" w-full flex items-center py-72">
                    <div data-accordion="collapse" className="flex flex-col h-full border-4 m-auto w-3/4 bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
                        <h2>
                            <button onClick={() => toggleShowHidden(1)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
                                <span>How do I purchase an image?</span>
                                <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div className={`${first}`} aria-labelledby="accordion-color-heading-1">
                            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">To purchase an image, simply browse our collection, select the image you like, and click on the 'Purchase' button. Follow the prompts to complete your purchase.</p>
                                <p className="text-gray-500 dark:text-gray-400">Make sure you've created an account and are logged in before proceeding with the purchase.</p>
                            </div>
                        </div>
                        <h2 >
                            <button onClick={() => toggleShowHidden(2)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
                                <span>What licensing options are available?</span>
                                <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div className={`${second}`} aria-labelledby="accordion-color-heading-2">
                            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">We offer both standard and extended licensing options. The standard license covers most personal and commercial uses, while the extended license offers more flexibility, especially for larger-scale commercial projects.</p>
                                <p className="text-gray-500 dark:text-gray-400">Always review the terms of each license before purchasing to ensure it meets your intended use.</p>
                            </div>
                        </div>
                        <h2 >
                            <button onClick={() => toggleShowHidden(3)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
                                <span>Can I get a refund for an image?</span>
                                <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div className={`${third}`} aria-labelledby="accordion-color-heading-3">
                            <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">We aim for 100% customer satisfaction. If you're not satisfied with the image you've purchased, contact our support team within 7 days of purchase, and we'll review your request.</p>
                                <p className="text-gray-500 dark:text-gray-400">Refunds are granted on a case-by-case basis, and typically only if there's a technical issue with the image.</p>
                            </div>
                        </div>
                        <h2>
                            <button onClick={() => toggleShowHidden(4)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
                                <span>Can I contact you?</span>
                                <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5L5 1L1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div className={`${third}`} aria-labelledby="accordion-color-heading-3">
                            <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                <p className="mb-4 text-gray-700 dark:text-gray-400">Yes, we encourage users to contact us with any inquiries or concerns. Whether it's feedback, support requests, or general questions, our team is here to assist you.</p>
                                <Link href="/contact" className="text-blue-600 hover:underline dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800">click here to contact us</Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    )
}
