import { useState } from "react";
import Header from '@/components/header';
import prisma from "@/components/prisma";
import Footer from "@/components/footer";


export default function PrivacyPolicy({ text }) {

    const [value, setValue] = useState(text && text.text ? text.text.toString() : "");



    return (
        <div className="bg-custom-grey">
            <Header />
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
                    `}</style>
                    <div className="custom-css" dangerouslySetInnerHTML={{ __html: text && text.text ? text.text : "" }}></div>
                </div>
                <Footer/>
        </div>
    );
    
}



export async function getServerSideProps() {
    const text = await prisma.privacypolicy.findFirst({
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
