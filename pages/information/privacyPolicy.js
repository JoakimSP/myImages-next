import { useState } from "react";
import Header from '@/components/header';
import prisma from "@/components/prisma";
import Footer from "@/components/footer";


export default function PrivacyPolicy({ text }) {

    const [value, setValue] = useState(text && text.text ? text.text.toString() : "");



    return (
        <>
            <Header />
                <div className="w-4/5 m-auto">
                    <style jsx global>{`
                        .custom-css h1{
                            font-weight: 500;
                            font-size: 2rem;
                        } 
                    `}</style>
                    <div className="custom-css" dangerouslySetInnerHTML={{ __html: text && text.text ? text.text : "" }}></div>
                </div>
                <Footer/>
        </>
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
