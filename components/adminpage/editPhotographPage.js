import InputField from "../utils/inputField"
import { useState } from "react"
import { toast } from "react-toastify"

export default function EditPhotographPage({photographersPage}) {
    const [form, setForm] = useState({
        title: photographersPage.title || "",
        subtitle: photographersPage.subtitle || ""
    })

    const handleUpdateInfo = async() => {

        try {
            const response = await fetch('/api/application/collections/updatePhotographersPage', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({...form}), // Here we're sending the form data
            });

            if (response.ok) {
                toast("Data was updated")
                const data = await response.json();
                console.log("Updated data:", data);
            } else {
                console.error("Error updating the photographersPage page.");
            }
        } catch (error) {
            console.error("There was an error sending the update request:", error);
        }
    }
    
  return (
    <div>
       <InputField 
  label={"Title"} 
  name={"title"} 
  textColor={"black"} 
  type="text" 
  value={form.title}
  onChange={(e) => setForm({...form, title: e.target.value})}
/>
<InputField 
  label={"Sub Title"} 
  name={"subtitle"} 
  textColor={"black"} 
  type="text" 
  value={form.subtitle}
  onChange={(e) => setForm({...form, subtitle: e.target.value})}
/>

        <button onClick={handleUpdateInfo}>Submit</button>
    </div>
  )
}
