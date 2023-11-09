import InputField from "../utils/inputField";
import { useState } from "react";

export default function EditSupport({ supportText }) {
    const [toggleState, setToggleState] = useState({});
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    const toggleShowHidden = (id) => {
        setToggleState((prevToggleState) => ({
            ...prevToggleState,
            [id]: !prevToggleState[id],
        }));
    };

    const addSupportEntry = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const supportData = {
            question: newQuestion,
            answer: newAnswer,
        };

        try {
            const response = await fetch('/api/application/addSupportText', {
                method: 'POST',
                body: JSON.stringify(supportData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            supportText.push(data);
            setNewQuestion('');
            setNewAnswer('');

        } catch (error) {
            console.error('There was an error saving the new support entry', error);
        }
    };


    return (
        <div className="w-screen px-2 md:px-48">
            <form onSubmit={addSupportEntry}>
                <InputField
                    as="textarea"
                    label="New Question"
                    name="newQuestion"
                    textColor="white"
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                />
                <InputField
                    as="textarea"
                    label="New Answer"
                    name="newAnswer"
                    textColor="white"
                    type="text"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                />
                <button className=" bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 active:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5" type="submit">Add Support Entry</button>
            </form>

            <div className="bg-custom-grey h-full my-4">
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
                </div>
            </div>
        </div>
    );
}
