import { useSession } from "next-auth/react"
import { toast } from "react-toastify";
import 'react-quill/dist/quill.snow.css';
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

export default function EditPrivacyPolicy({ text }) {
    const { data: session } = useSession()
    const [value, setValue] = useState(text && text.text ? text.text.toString() : "");

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

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
            <div className='w-4/5 m-auto mt-6 bg-white border-8 border-slate-600'>
                {ReactQuill ? <ReactQuill theme="snow" value={value} onChange={setValue} /> : null}

            </div>
            <button onClick={handleSaveInput} className="py-2 px-6 w-28 self-center mt-4 bg-gray-700 border-2 border-black text-white font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300">Save</button>
        </>
    )
}

