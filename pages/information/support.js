import Header from "@/components/header"
import { useState } from "react"
import Footer from "@/components/footer";

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
            default:
                break;
        }
    }
    



    return (
        <div className="bg-custom-grey h-full">
        <Header/>
            <div className=" w-full flex items-center py-72">
                <div data-accordion="collapse" className="flex flex-col h-full border-4 m-auto w-3/4 bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
                    <h2>
                        <button onClick={() => toggleShowHidden(1)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
                            <span>What is My Images?</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div className={`${first}`} aria-labelledby="accordion-color-heading-1">
                        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">convallis quis. In tempor risus metus, et finibus nisi suscipit a. Morbi euismod nisl sed erat ullamcorper fringilla. Maecenas leo ligula, aliquet aliquet</p>
                            <p className="text-gray-500 dark:text-gray-400">. Aliquam ut varius lectus, ut pellentesque leo. Pellentesque consequat laoreet </p>
                        </div>
                    </div>
                    <h2 >
                        <button onClick={() => toggleShowHidden(2)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-color-body-2" aria-expanded="false" aria-controls="accordion-color-body-2">
                            <span>Is there a Figma file available?</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div className={`${second}`} aria-labelledby="accordion-color-heading-2">
                        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">. Quisque condimentum nibh ut lectus maximus, et sagittis lectus auctor. Nam viverra, nunc commodo eleifend imperdiet</p>
                            <p className="text-gray-500 dark:text-gray-400"> Aliquam ornare condimentum elit, ut auctor nulla suscipit ac. Nullam et interdum nisl. Praesent accumsan lorem eu odio condimentum,</p>
                        </div>
                    </div>
                    <h2 >
                        <button onClick={() => toggleShowHidden(3)} type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-color-body-3" aria-expanded="false" aria-controls="accordion-color-body-3">
                            <span>What are the differences between Bootstrap and Tailwind?</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div className={`${third}`} aria-labelledby="accordion-color-heading-3">
                        <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <p className="mb-2 text-gray-500 dark:text-gray-400">Pellentesque vitae est felis. Vestibulum ut aliquam ligula. Aenean malesuada elit eros, in rhoncus nisl ornare et. Nulla interdum tincidunt fermentum. Sed aliquet a enim ut porttitor. </p>
                            <p className="mb-2 text-gray-500 dark:text-gray-400"> Aliquam ornare condimentum elit, ut auctor nulla suscipit ac. Nullam et interdum nisl. Praesent accumsan lorem eu odio condimentum, et facilisis mi porttitor. Curabitur ornare turpis sed lacus laoreet tincidunt. </p>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">Etiam turpis odio, elementum vel volutpat in, gravida id neque. Maecenas porttitor justo ut rhoncus bibendum. Vestibulum ornare nisl ut congue rutrum. </p>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
