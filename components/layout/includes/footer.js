import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer() {
    return (

        <div className='bg-custom-grey'>
            <div className="bg-gradient-to-b from-gray-950">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
            
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold uppercase text-white">Resources</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <Link href="http://www.spprod.se/" className="hover:underline">Sp Production</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold uppercase text-white">Legal</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <Link href="/information/privacyPolicy" className="hover:underline">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold uppercase text-white">Support</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <Link href="/information/support" className="hover:underline">Customer support</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mb-6 md:mb-0">
                            <Link href="/" className="flex items-center">
                                <Image src={'/appContent/myimages-logo-white-1.svg'} width={300} height={300} className="h-8 mr-3" alt="Myimages Logo" />
                            </Link>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="/#" className="hover:underline">SP Production i Nyköping AB™</Link>. All Rights Reserved.</span>
                        <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                    {/* Your SVG path data goes here */}
                                </svg>
                                <span className="sr-only">Facebook page</span>
                            </Link>
                            {/* ... Add other SVG links as necessary */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
