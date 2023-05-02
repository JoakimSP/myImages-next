import { useRouter } from "next/router";

export default function CreatePhotographerAccount() {

  async function handleCreateNewPhotographer(e) {
    e.preventDefault();
    const newPhotographer = {
        username: e.target[0].value,
        firstname: e.target[1].value,
        lastname: e.target[2].value,
        email: e.target[3].value,
        password: e.target[4].value,
    }

    const response = await fetch("../api/users/addNewPhotographer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPhotographer),
      });

    if(response.ok){
        console.log("new user added");
    }
    else{
        console.log("Could not add user")
    }

    
  }

  return (
    <div>
      <h1>Create new photographer account</h1>

      <form onSubmit={handleCreateNewPhotographer} method="post">
        <div>
          <label htmlFor="username">
            username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label htmlFor="firstname">
            firstname
            <input type="text" name="firstname" required />
          </label>
        </div>
        <div>
          <label htmlFor="lastname">
            lastname
            <input type="text" name="lastname" required />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            email
            <input type="email" name="email" required />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password
            <input type="password" name="password" required minLength="8" />
          </label>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
