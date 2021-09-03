var rowId = 0
var catBreeds = []

document.getElementById("petsave-button").onclick = function () {
    rowId++
    
    let pet = {
        dateInput: document.getElementById("date-input").value,
        ownerInput: document.getElementById("owner-input").value,
        petNameInput: document.getElementById("petname-input").value,
        petAgeInput: +document.getElementById("petage-input").value,
        petSpeciesInput: document.getElementById("petspecies-input").value,
        petSizeInput: document.getElementById("petsize-input").value,
    }

    let tr = document.createElement("tr")
    tr.setAttribute("id", "row-" + rowId)
    
    let tdId = document.createElement("td")
    tdId.innerHTML = rowId
    tr.appendChild(tdId)

    Object.keys(pet).forEach((key) => {
        let td = document.createElement("td")
        td.innerHTML = pet[key]
        tr.appendChild(td)
    })

    let tdActions = document.createElement("td")
    let input = document.createElement("input")
    input.setAttribute("id", "delete-" + rowId)
    input.setAttribute("type", "button")
    input.value = "Eliminar"
    input.onclick = function () {
        let id = this.getAttribute("id")
        id = +id.replace("delete-", "")

        document.getElementById("row-"+ id).remove()
    }

    tdActions.appendChild(input)
    tr.appendChild(tdActions)
    document.getElementById("body-table").appendChild(tr)
}

/**
 * Code for calling and using results from DOG and CAT APIs
 */

// Getting dog breeds

fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            let petBreed = document.getElementById("dogbreed-input")

            Object.keys(data.message).map((breed)=>{
                let option = document.createElement("option")
                option.innerHTML = breed
                petBreed.appendChild(option)
            })

            //updating select value based on cookie
            let cookies = document.cookie.split(";").map(cookie => {
                cookieSplitted = cookie.split("=")
                let newCookie = {}
                newCookie[cookieSplitted,[0]] = cookieSplitted[1]
                return newCookie
              })
              document.getElementById("dogbreed-input").value = cookies[0].dogBreed
        })

document.getElementById("show-dog-image").onclick = function () {
        let breed = document.getElementById("dogbreed-input").value
        
        

        fetch("https://dog.ceo/api/breed/"+breed+"/images/random")
                .then(response => response.json())
                .then(data => {
                    document.getElementById("dog-image").setAttribute("src", data.message)
            })
        }

// Getting Cat breeds

fetch("https://api.thecatapi.com/v1/breeds")
        .then(response => response.json())
        .then(data => {
        catBreeds = data
           let catBreed = document.getElementById("catbreed-input")

           data.forEach((breed)=>{
               let option = document.createElement("option")
               option.innerHTML = breed.name 
               catBreed.appendChild(option)
           })
           

        })
        
document.getElementById("show-cat-image").onclick = function () {
    let breedName = document.getElementById("catbreed-input").value
       
    let breedId = catBreeds.find(breed => breedName == breed.name).id
    console.log(breedId)
    fetch("https://api.thecatapi.com/v1/images/search?breed_ids="+breedId)
            .then(response => response.json())
            .then(data => {
                document.getElementById("cat-image").setAttribute("src", data[0].url)
        })
    
    }
/**
 * Experimenting with cookies, storage and IndexedIB
 */

 document.getElementById("dogbreed-input").onchange = function () {
     let dogBreed = document.getElementById("dogbreed-input").value
     document.cookie = "dogBreed="+dogBreed
     console.log(dogBreed)
 }

