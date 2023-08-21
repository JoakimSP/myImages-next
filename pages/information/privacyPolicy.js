import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Header from '@/components/header';
import { useSession } from "next-auth/react"
import { toast } from "react-toastify";
import prisma from "@/components/prisma";
import 'react-quill/dist/quill.snow.css';


export default function PrivacyPolicy({ text }) {
    const { data: session } = useSession()
    if(text){
        const [value, setValue] = useState(text.text.toString());
    }
    else{
        const [value, setValue] = useState("");
    }
    

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    console.log(text)


    const handleSaveInput = async () => {
        const response = await fetch("../api/application/createPrivacyText", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });

        if (response.ok) {
            toast("Saved privacy text")
        }
        else {
            toast.warn("Could not add categorie")

        }
    }

    return (
        <>
            <Header />
            {session && session.user && session.user.email === "jocke@live.se" ? (
                <div className='w-4/5 m-auto'>
                    {ReactQuill ? <ReactQuill theme="snow" value={value} onChange={setValue} /> : null}
                    <button onClick={handleSaveInput} className="py-2 px-6 bg-custom-grey text-white font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300">Save</button>
                </div>
            ) : (
                <div className="w-4/5 m-auto">
                    <style jsx global>{`
                        .custom-css h1{
                            font-weight: 500;
                            font-size: 2rem;
                        } 
                    `}</style>
                    <div className="custom-css" dangerouslySetInnerHTML={{ __html: text.text }}></div>
                </div>
            )}
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
    })


    return {
        props: { text }
    }
}
