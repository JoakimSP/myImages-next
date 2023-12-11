import Layout from "@/components/layout/layout"
import { useState } from "react"
import prisma from "@/components/prisma";
import Link from "next/link";

export default function Support({supportText}) {
    const [toggleState, setToggleState] = useState({});

    const toggleShowHidden = (id) => {
        setToggleState((prevToggleState) => ({
            ...prevToggleState,
            [id]: !prevToggleState[id],
        }));
    };

    return (
        <Layout>
            <h1 className="text-6xl text-white text-center my-4">Support</h1>
            <div className="bg-custom-grey h-full flex justify-center">
                <div className="bg-custom-grey h-full w-2/3 my-4">
                    <div className="w-full flex flex-col items-center">
                        {supportText.map((item, index) => (
                            <div key={index} className="flex flex-col h-full border-4 m-auto w-full bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
                                <h2>
                                    <button
                                        onClick={() => toggleShowHidden(index)}
                                        type="button"
                                        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
                                    >
                                        <span>{item.question}</span>
                                        <svg
                                            data-accordion-icon
                                            className={`w-3 h-3 shrink-0 ${toggleState[index] ? "rotate-180" : ""}`}
                                            aria-hidden="true"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div className={`${toggleState[index] ? "" : "hidden"}`} aria-labelledby={`accordion-color-heading-${index}`}>
                                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col h-full border-4 m-auto w-full bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
                                <h2>
                                    <button
                                        onClick={() => toggleShowHidden(99)}
                                        type="button"
                                        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
                                    >
                                        <span>What Should I Do If I Can't Find the Answer I'm Looking For?</span>
                                        <svg
                                            data-accordion-icon
                                            className={`w-3 h-3 shrink-0 ${toggleState[99] ? "rotate-180" : ""}`}
                                            aria-hidden="true"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div className={`${toggleState[99] ? "" : "hidden"}`} aria-labelledby={`accordion-color-heading-${99}`}>
                                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">We welcome your inquiries and feedback. Please reach out to us through the <Link className='font-bold text-blue-500 hover:text-blue-600 focus:text-blue-600 hover:underline focus:underline transition duration-300 ease-in-out px-1 -mx-1' href={"/contact"}>Contact Form</Link> available. We look forward to assisting you.</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps(){

    const supportText = await prisma.support.findMany({
        select: {
            question: true,
            answer: true
        }
    })

    return {
        props: {
            supportText
        }
    }
}
