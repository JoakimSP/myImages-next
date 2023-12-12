import InputField from "../utils/inputField";
import { toast } from "react-toastify";
import { useState } from "react";
import ErrorBoundary from "../errorBoundery";
import { logErrorToApi } from "../utils/logErrorToApi";

export default function AddNewPhotographer({ photographers }) {
  const [currentUsers, setCurrentUsers] = useState(photographers)



  async function handleCreateNewPhotographer(e) {
    e.preventDefault();
    const newPhotographer = {
      username: e.target.username.value,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value
    }

    const stateData = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value
    }
    try {
      const response = await fetch("../api/users/addNewPhotographer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPhotographer),
      });


      toast("Created new photographer")
      setCurrentUsers((prev) => [...prev, stateData])
    } catch (error) {
      logErrorToApi({
        message: error.message,
        stack: error.stack
      })
      toast.warn("Could not add user")

    }

  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this photographer? This is not reversable")) {
        const result = await fetch('/api/users/deletePhotographer', {
            method: "POST",
            body: id
        })
    
        if (result) {
            window.alert("photographer was successfully deleted")
            setCurrentUsers(prevState => prevState.filter((user) => user.personID !== id));
     } 
    }
  }


  return (
    <>
      <ErrorBoundary>
        {/* Title */}
        <div className="text-center py-8 w-full">
          <h1 className="text-5xl text-white font-bold">Create New Photographer Account</h1>
        </div>

        <div className="flex justify-between gap-8 w-full mb-8">
          {/* Form */}
          <form onSubmit={handleCreateNewPhotographer} method="post" className="flex-1 bg-white shadow-xl rounded-xl px-10 py-8">
            <InputField label="Username" type="text" name="username" />
            <InputField label="First Name" type="text" name="firstname" />
            <InputField label="Last Name" type="text" name="lastname" />
            <InputField label="Email" type="email" name="email" />
            <InputField label="Password" type="password" name="password" />
            <label htmlFor="role" className="block mb-2 text-gray-700 font-medium">Role</label>
            <select name="role" className="border rounded-md p-2 w-full focus:ring focus:ring-custom-grey-light focus:border-transparent mb-4">
              <option value="user">Photographer</option>
              <option value="admin">admin</option>
            </select>

            <div className="mt-4 flex justify-center">
              <button className="py-2 px-6 bg-custom-grey text-white font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300">Submit</button>
            </div>
          </form>

          {/* Photographers List */}
          <div className="flex-1 bg-gray-800 shadow-xl rounded-xl px-10 py-6">
            <h2 className="text-3xl text-white font-bold mb-6">Current Photographers</h2>
            <ul>
              {currentUsers.map((user) => (
                <div key={user.firstName} className="flex justify-between">
                  <li  className="mb-2 text-lg text-gray-400 hover:text-gray-300 transition-all duration-200">
                    {`${user.firstName} ${user.lastName}`}
                  </li>
                  <button onClick={() => handleDelete(user.personID)} className="bg-red-500 rounded px-1 transform active:scale-95 transition-transform duration-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </ErrorBoundary>
    </>
  )
}


