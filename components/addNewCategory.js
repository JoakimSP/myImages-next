import InputField from "./utils/inputField";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddNewCategory({categories}) {
    const [currentCat, setCurrentCat] = useState(categories)

    async function handleCreateNewCategory(e) {
        e.preventDefault();
    
        const data = { categoryName : e.target.category.value}
        const stateData = {
            name:  e.target.category.value
        }
    
        const response = await fetch("../api/application/editCategories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
      if(response.ok){
          toast("Created new Categorie")
          setCurrentCat((prev) => [...prev, stateData])
      }
      else{
        toast.warn("Could not add categorie")
          
      }
    
      }
  return (
    <>
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
            <li className="mb-2 text-lg text-gray-400 hover:text-gray-300 transition-all duration-200">
              {`${categorie.name}`}
            </li>
          ))}
        </ul>
      </div>  
    </div>
    </>
  )
}
