import InputField from "../utils/inputField";
import { useState } from "react";
import { toast } from "react-toastify";
import ErrorBoundary from "@/components/errorBoundery";

export default function AddNewCategory({ categories}) {
  const [currentCat, setCurrentCat] = useState(categories)

  async function handleCreateNewCategory(e) {
    e.preventDefault();

    const data = { categoryName: e.target.category.value }
    const stateData = {
      name: e.target.category.value
    }

    const response = await fetch("../api/application/editCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setCurrentCat((prev) => [...prev, stateData])
      toast("Created new Categorie")
      window.location.reload()
    }
    else {
      toast.warn("Could not add categorie")

    }

  }

  const handleDeleteCategorie = async (e) => {
    if (window.confirm("Are you sure you want to delete this categorie?")) {
      setCurrentCat(prev => prev.filter(category => category.id != e.currentTarget.value));
      const response = await fetch("../api/application/deleteCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: e.currentTarget.value }),
      });

      if (response.ok) {
        
        toast.warn("deleted category")
        window.location.reload()

      }
      else {
        toast.error("Could not delete categorie")

      }
    }

  }
  return (
    <>
      <ErrorBoundary>
        <div className="text-center py-8 w-full">
          <h1 className="text-5xl text-white font-bold">Create New Categorie</h1>
        </div>


        <div className="flex justify-between gap-8 w-full mb-8">
          <form onSubmit={handleCreateNewCategory} className="flex-1 bg-white shadow-xl rounded-xl px-10 py-8">
            <InputField label="category" type="text" name="category" />

            <div className="mt-4 flex justify-center">
              <button className="py-2 px-6 bg-custom-grey text-white font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300">Submit</button>
            </div>
          </form>

          <div className="flex-1 bg-gray-800 shadow-xl rounded-xl px-10 py-6">
            <h2 className="text-3xl text-white font-bold mb-6">Current categories</h2>
            <ul>
              {currentCat.map((categorie) => (
                <li key={categorie.name} className="flex items-center justify-between mb-2 text-lg text-gray-400 hover:text-gray-300 transition-all duration-200">
                  <span className="mr-2">{categorie.name}</span>
                  <button onClick={handleDeleteCategorie} className="bg-red-500 rounded p-1 transform active:scale-95 transition-transform duration-100" value={categorie.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                  </button>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </ErrorBoundary>
    </>
  )
}

