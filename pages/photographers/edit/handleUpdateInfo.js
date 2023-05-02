

export default async function HandleUpdateInfo(e) {
        e.preventDefault()
    
        const newUserInformation = {
          personID: e.target[0].value,
          country: e.target[1].value,
          city: e.target[2].value,
          about: e.target[3].value,
          camera: e.target[4].value,
          lens: e.target[5].value,
          FavoritePhoto: e.target[6].value,
          PhotoPreference: e.target[7].value,
          careerStart: e.target[8].value
        }
    
        const response = await fetch('../../api/users/updatePhotographerInfo', {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify(newUserInformation)
        })
    
        if(response.ok){
          console.log("Updated the information on user")
        }
        else{
          console.log("Something went wrong")
        }
      }

