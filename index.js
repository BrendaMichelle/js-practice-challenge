const travelerName = document.getElementsByTagName("h2")[0]
const nickname = document.getElementsByTagName("em")[0]
const likes = document.querySelector(".likes")
const image = document.getElementsByTagName("img")
const likeBtn = document.querySelector(".like-button")

let travelerLikesVal = 0 //default initial value

fetch("http://localhost:3000/travelers")
.then(r => r.json())
.then(data => {
    travelerName.textContent = data[0].name
    nickname.textContent = data[0].nickname

    travelerLikesVal = data[0].likes
    likes.textContent = travelerLikesVal

    image.src = data[0].photo
    image.alt = data[0].name
})

likeBtn.addEventListener('click',() => {
    travelerLikesVal = travelerLikesVal + 1
    fetch("http://localhost:3000/travelers/1", {
        method: "PATCH",
        headers:
        {'Content-Type': "application/json"},
        body: JSON.stringify({"likes": travelerLikesVal})
    })
    likes.textContent = travelerLikesVal
})

const animalSightings = document.querySelector("ul#animals")

fetch("http://localhost:3000/animalSightings")
.then(r => r.json())
.then(data => {
    data.forEach(animalSighting => {  
        renderSighting(animalSighting)
    })
})

function renderSighting(sightingObject){
        const newli = document.createElement("li")
        newli.dataset.id = sightingObject.id
        newli.innerHTML = `<p>${sightingObject.description}</p>
        <img src=${sightingObject.photo} alt=${sightingObject.species}/>
        <a href=${sightingObject.link} target='_blank'>Here's a video about the ${sightingObject.species} species!</a>
        <p class='likes-display'>${sightingObject.likes} Likes</p>
        <button class="like-button" type="button">Like</button>
        <button class="delete-button" type="button">Delete</button>
        <button class="toggle-update-form-button" type="button">Toggle Update Form</button>
        <form class="update-form" style="display: none;">
        <input type="text" value="${sightingObject.description}"/>
        <input type="submit" value="Update description">
        </form>`

        let sightingLikesVal = parseInt(sightingObject.likes)
        const sightingLikeBtn = newli.querySelector(".like-button")
        const sightingLikes = newli.querySelector(".likes-display")

        sightingLikeBtn.addEventListener('click', () => {
            sightingLikesVal = sightingLikesVal + 1
            fetch(`http://localhost:3000/animalSightings/${sightingObject.id}`, {
                method: "PATCH",
                headers:
                {'Content-Type': "application/json"},
                body: JSON.stringify({"likes": sightingLikesVal})
            })
            sightingLikes.textContent = sightingLikesVal.toString() + " Likes"
        })

        const sightingDeleteBtn = newli.querySelector(".delete-button")

        sightingDeleteBtn.addEventListener('click', () => {
            fetch(`http://localhost:3000/animalSightings/${sightingObject.id}`, {
                method: "DELETE",
                headers:
                {'Content-Type': "application/json"},
                body: JSON.stringify({"likes": sightingLikesVal})
            }).then(r => r.json())
            .then(_ => newli.remove())
        })

        const toggleUpdateForm = newli.querySelector(".toggle-update-form-button")
        const updateForm = newli.querySelector(".update-form")

        toggleUpdateForm.addEventListener('click', ()=> {
            if (updateForm.style.display === "none"){
                updateForm.style.display = "block"
            } else {
                updateForm.style.display = "none"
            }
        })

        const descriptionPara = newli.getElementsByTagName("p")[0]

        updateForm.addEventListener('submit', (event) => {
            event.preventDefault()
            const sightingDescription = event.target[0].value

            fetch(`http://localhost:3000/animalSightings/${sightingObject.id}`, {
                method: "PATCH",
                headers:
                {'Content-Type': "application/json"},
                body: JSON.stringify({"description": sightingDescription})
            })
            .then(r => r.json())
            .then(_ => descriptionPara.textContent = sightingDescription)
                
            updateForm.style.display = "none"
        })

        animalSightings.append(newli)
}

const animalSightingForm = document.querySelector("#new-animal-sighting-form")

animalSightingForm.addEventListener('submit', (event)=> {
    event.preventDefault()

    fetch("http://localhost:3000/travelers/1/animalSightings",
    {
        method: "POST",
        headers:
        {'Content-Type': "application/json"},
        body: JSON.stringify(
            {"travelerId": 1,
            "species": event.target[0].value,
            "photo": event.target[1].value,
            "link": event.target[2].value,
            "description": event.target[3].value,
            "likes": 0
            }
        )
    })
    .then(r => r.json())
    .then(data => {
        renderSighting(data)
    })

    animalSightingForm.reset()
})






