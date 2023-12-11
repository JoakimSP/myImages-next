import { useState } from "react";
import InputField from "../utils/inputField";
import { toast } from "react-toastify";

export default function EditPricePageExclusive({pricingExclusiveInfo}) {
    const [formData, setFormData] = useState({
        image: null,
        text: pricingExclusiveInfo.text || '',
        title: pricingExclusiveInfo.title || '',
        subtitle: pricingExclusiveInfo.subtitle || '',
    });

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0]});

        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await fetch('/api/application/updatePricingPageExclusive', {
                method: 'POST',
                body: form, // Here we're sending the form data
            });

            if (response.ok) {
                toast("Data was updated")
                const data = await response.json();
                console.log("Updated data:", data);
            } else {
                console.error("Error updating the pricing page.");
            }
        } catch (error) {
            console.error("There was an error sending the update request:", error);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:p-16">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl flex flex-wrap" enctype="multipart/form-data" >
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center w-full">Update Pricing Exclusive Page</h2>

                {/* Across-Page Title */}
                <div className="w-1/3 px-4">
                    <h3 className="font-semibold mb-4 text-lg text-blue-600 border-b-2 pb-2">Header Page Content</h3>
                    {/* Assuming you might need title and subtitle here */}
                    <InputField type="text" label="Title" name="title" value={formData.title} onChange={handleChange}/>
                    <InputField as={"textarea"} type="text" label="Subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} />
                </div>

                {/* Image hero */}
                <div className="w-1/3 px-4">
                    <h3 className="font-semibold mb-4 text-lg text-blue-600 border-b-2 pb-2">Image</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input type="file" name="image" onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>

                
                {/* body Text  */}
                <div className="w-full px-4 mt-6">
                    <h3 className="font-semibold mb-4 text-lg text-blue-600 border-b-2 pb-2">Body text</h3>
                    <InputField
                     as={"textarea"}
                      type="text"
                       label="Text"
                        name="text"
                         value={formData.text}
                          onChange={handleChange}
                           />
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-center w-full px-4">
                    <button
                        type="submit"
                        className="w-1/2 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 active:bg-gray-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
  )
}
