import { useState } from "react";
import InputField from "../utils/inputField";

export default function EditPricePage() {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        imageleft: '',
        imagelefttitle: '',
        imageleftsubtitle: '',
        imageleftprice: '',
        imageright: '',
        imagerighttitle: '',
        imagerightsubtitle: '',
        imagerightprice: '',
        footertext: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the form data to the backend/API
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:p-16">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl flex flex-wrap">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center w-full">Update Pricing Page</h2>

                {/* Across-Page Title */}
                <div className="w-1/3 px-4">
                    <h3 className="font-semibold mb-4 text-lg text-blue-600 border-b-2 pb-2">Across Page Content</h3>
                    {/* Assuming you might need title and subtitle here */}
                    <InputField type="text" label="Title" name="title" value={formData.title} onChange={handleChange} />
                    <InputField type="text" label="Subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange}/>
                </div>

                {/* Image Left */}
                <div className="w-1/3 px-4">
                    <h3 className="font-semibold mb-4 text-lg text-blue-600 border-b-2 pb-2">Image Left</h3>
                    <InputField type="text" label="Image URL" name="imageleft" value={formData.imageleft} onChange={handleChange} />
                    <InputField type="text" label="Image Title" name="imagelefttitle" value={formData.imagelefttitle} onChange={handleChange} />
                    <InputField type="text" label="Image Subtitle" name="imageleftsubtitle" value={formData.imageleftsubtitle} onChange={handleChange} />
                    <InputField type="text" label="Image Price" name="imageleftprice" value={formData.imageleftprice} onChange={handleChange} />
                </div>

                {/* Image Right */}
                <div className="w-1/3 px-4">
                    <h3 className="font-semibold mb-4 text-lg text-blue-600 border-b-2 pb-2">Image Right</h3>
                    <InputField type="text" label="Image URL" name="imageright" value={formData.imageright} onChange={handleChange} />
                    <InputField type="text" label="Image Title" name="imagerighttitle" value={formData.imagerighttitle} onChange={handleChange} />
                    <InputField type="text" label="Image Subtitle" name="imagerightsubtitle" value={formData.imagerightsubtitle} onChange={handleChange} />
                    <InputField type="text" label="Image Price" name="imagerightprice" value={formData.imagerightprice} onChange={handleChange} />
                </div>

                {/* Footer Text - Placing it below the columns */}
                <div className="w-full px-4 mt-6">
                    <h3 className="font-semibold mb-4 text-lg text-blue-600 border-b-2 pb-2">Footer Text</h3>
                    <InputField type="textarea" label="Footer Text" name="footertext" value={formData.footertext} onChange={handleChange} />
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-center w-full px-4">
                    <button
                        type="submit"
                        className="w-1/2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 active:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
