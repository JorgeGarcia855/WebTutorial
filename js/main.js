var rowId = 0

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

fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            let petBreed = document.getElementById("petbreed-input")

            Object.keys(data.message).map((breed)=>{
                let option = document.createElement("option")
                option.innerHTML = breed
                petBreed.appendChild(option)
            })
        })

fetch("https://api.thecatapi.com/v1/breeds")
        .then(response => response.json())
        .then(data => {
           let breeds = data.map(breed => breed.id)
           console.log(breeds)
        })
        

document.getElementById("show-image").onclick = function () {
    let breed = document.getElementById("petbreed-input").value

    fetch("https://dog.ceo/api/breed/"+breed+"/images/random")
        .then(response => response.json())
        .then(data => {
            document.getElementById("pet-image").setAttribute("src", data.message)
        })
}

