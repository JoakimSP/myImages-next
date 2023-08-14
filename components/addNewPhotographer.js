import InputField from "./utils/inputField";
import { toast } from "react-toastify";
import { useState } from "react";

export default function AddNewPhotographer({photographers}) {
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
            firstName:  e.target.firstname.value,
            lastName: e.target.lastname.value
        }
    
        const response = await fetch("../api/users/addNewPhotographer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPhotographer),
          });
    
        if(response.ok){
            toast("Created new photographer")
            setCurrentUsers((prev) => [...prev, stateData])
        }
        else{
          toast.warn("Could not add user")
        }
      }

  return (
    <>
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
        <InputField label="Password" type="password" name="password" minLength="8" />
        <label htmlFor="role" className="block mb-2 text-gray-700 font-medium">Role</label>
        <select name="role" className="border rounded-md p-2 w-full focus:ring focus:ring-custom-grey-light focus:border-transparent mb-4">
          <option value="user">user</option>
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
            <li className="mb-2 text-lg text-gray-400 hover:text-gray-300 transition-all duration-200">
              {`${user.firstName} ${user.lastName}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}


