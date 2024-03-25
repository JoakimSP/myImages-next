import { useState } from "react";
import prisma from "@/components/prisma";
import Layout from "@/components/layout/layout";
import Head from "next/head";


export default function PrivacyPolicy({ text }) {

    const [value, setValue] = useState(text && text.text ? text.text.toString() : "");



    return (
        <Layout>
            <Head>
                <title>Legal Notice</title>
                <meta name="description" content="Read our privacy policy to learn about how we collect, use, and protect your personal information on our website." />
                <meta name="keywords" content="privacy policy, data protection, personal information, website security" />
            </Head>
            <div className="bg-custom-grey">

                <div className="w-4/5 m-auto  text-white py-8">
                    <style jsx global>{`
                        .custom-css h1{
                            font-weight: 500;
                            font-size: 2em;
                        } 
                        .custom-css h2{
                            font-weight: 500;
                            font-size: 1.5em;
                        } 
                        .custom-css h3{
                            font-weight: 500;
                            font-size: 1.17em;
                        } 
                        .custom-css h4{
                            font-weight: 500;
                            font-size: 1em;
                        } 
                        .custom-css h5{
                            font-weight: 500;
                            font-size: .83em;
                        } 
                        .custom-css h6{
                            font-weight: 500;
                            font-size: .67em;
                        }
                        .custom-css strong, .custom-css b {
                            font-weight: bold;
                        }
                        
                        .custom-css em, .custom-css i {
                            font-style: italic;
                        }
                        
                        .custom-css u {
                            text-decoration: underline;
                        }
                        
                        .custom-css a {
                            color: blue;
                            text-decoration: underline;
                            transition: color 0.3s;
                        }
                        
                        .custom-css a:hover {
                            color: darkblue;
                        }
                        
                        .custom-css ol {
                            list-style-type: decimal;
                            padding-left: 1em;
                        }
                        
                        .custom-css ol li {
                            margin-bottom: 0.5em;
                        }
                        
                        .custom-css ul {
                            list-style-type: disc;
                            padding-left: 1em;
                        }
                        
                        .custom-css ul li {
                            margin-bottom: 0.5em;
                        }
                        
                        .custom-css blockquote {
                            border-left: 4px solid gray;
                            padding-left: 1em;
                            font-style: italic;
                        }
                        
                    `}</style>
                    <div className="custom-css" dangerouslySetInnerHTML={{ __html: text && text.text ? text.text : "" }}></div>
                </div>

            </div>
        </Layout>
    );

}



export async function getServerSideProps() {
    const text = await prisma.legalnotice.findFirst({
        where: {
            id: "1"
        },
        select: {
            text: true
        }
    });

    if (!text) {
        return {
            props: { text: null }
        }
    }

    return {
        props: { text }
    }
}
