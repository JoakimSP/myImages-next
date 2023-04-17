import React from 'react'

export default function CreatePhotographerAccount() {
  return (
    <div>
        <h1>Create new photographer account</h1>
        
        <form action='../api/users/addNewPhotographer' method='post'>
            <div>
                <label htmlFor='username'> username
                    <input type="text" name='username'/>
                </label>
            </div>
            <div> 
                <label htmlFor='firstname'> firstname
                    <input type="text" name='firstname'/>
                </label>
            </div>
            <div>
                <label htmlFor='lastname'> lastname
                    <input type="text" name='lastname'/>
                </label>
            </div>
            <div>
                <label htmlFor='email'> email
                    <input type="text" name='email'/>
                </label>
            </div>
            <div>
                <label htmlFor='password'> password
                    <input type="password" name='password'/>
                </label>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}
