/************************** EVENTS JS MINI CHALLENGE WITH JSON SERVER ******************************/
const travelerUrl = 'http://localhost:3000/travelers/1'
const animalSightingsUrl = 'http://localhost:3000/animalSightings/'

const animals = document.querySelector('ul#animals')
const form = document.querySelector("form#new-animal-sighting-form")
const title = document.querySelector("h1#header")

//Set traveler info by fetching from DB, add listener for traveler likes
function setTravelerInfo() {
    const profile = document.querySelector("div#profile")

    fetch(travelerUrl)
        .then(response => response.json())
        .then(travelerObj => {
            profile.querySelector("img").src = travelerObj.photo
            profile.querySelector("h2").innerHTML = travelerObj.name
            profile.querySelector("em").innerHTML = travelerObj.nickname
            const travelerLikes = profile.querySelector("p.likes")
            travelerLikes.innerHTML = `${travelerObj.likes} Likes`

            button = profile.querySelector("button")
            button.addEventListener('click', event => {
                const newLikes = parseInt(travelerLikes.innerHTML) + 1
                fetch(travelerUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({likes: newLikes})
                })
                .then(response => response.json())
                .then(travelerLikes.innerHTML = `${newLikes} Likes`)
                .catch(error => console.log(error))
            })
        })
}

//Append an li to the animal sightings list with info using an animal object
function displayAnimalSighting(sighting){
    const li = document.createElement('li')
    li.id = `${sighting.id}`
    li.innerHTML = `<h4>${sighting.description}</h4>
        <img src=${sighting.photo} alt=${sighting.species}>
        <a href=${sighting.link} target=_blank>Sighting Video </a>
        <p>${sighting.likes} Likes</p>
        <button class="like-button">❤️</button>
        <button class="delete-button">Delete</button>`   
    animals.append(li)
}

// Get animal sightings from DB, then iterate through and display on page, create listeners for animal sightings
function getAnimalSightings() {
    fetch(animalSightingsUrl)
        .then(response => response.json())
        .then(animalSightings => {
            animals.innerHTML = ''
            animalSightings.forEach(sighting =>         displayAnimalSighting(sighting))
            addAnimalListeners()
        })
}

//Add animal sighting to the DB and display on the page
function addAnimalSighting(animalObj){
    fetch(animalSightingsUrl, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(animalObj)
        })
        .then(response => response.json())
        .then(animalObj => {
            console.log(animalObj)
            displayAnimalSighting(animalObj)
        })
        .catch(error => console.log(error.message))
}

//Add listeners for like and delete buttons on animal sightings
function addAnimalListeners(){
    animals.addEventListener('click', event => {
        const id = event.target.parentNode.id

        if (event.target.matches("button.like-button")){
            console.log(event.target)
            const likesEl = event.target.parentNode.querySelector("p")
            const likes = parseInt(likesEl.innerHTML) + 1

            fetch(animalSightingsUrl + id, {
                method: 'PATCH',
                headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
                },
                body: JSON.stringify({likes})
            })
                .then(response => response.json())
                .then(likesEl.innerHTML = `${likes} Likes`)
                .catch(error => console.log(error))
        }

        if (event.target.matches("button.delete-button")){
            console.log("delete")
            fetch(animalSightingsUrl + id, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(event.target.parentNode.remove())
        }
    })
}

//Get traveler info and animal sightings
setTravelerInfo()
getAnimalSightings()

//Add listener to change title color 
title.addEventListener('click', event => {
    title.classList.toggle('dark-green')
})

//Add listener to form to process input
form.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event)
    const newAnimal = {
        species : event.target.species.value,
        link : event.target.link.value,
        photo : event.target.photo.value,
        description : event.target.description.value,
        travelerId: 1,
        likes: 0
    }
    addAnimalSighting(newAnimal)
    form.reset()
})

