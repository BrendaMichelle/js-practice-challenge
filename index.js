/************************** EVENTS JS MINI CHALLENGE WITH JSON SERVER ******************************/

// Global Variables
const travelerUrl = 'http://localhost:3000/travelers/1'
const animalsUrl = 'http://localhost:3000/animalSightings'

const travelerProfile = document.querySelector('div#profile')
const animalSightings = document.querySelector('ul#animals')
const newAnimalSightingForm = document.querySelector('#new-animal-sighting-form')
const likeButton = document.querySelector('button.like-button')
const likes = document.querySelector('p.likes')
const header = document.querySelector('h1#header')

// Fetch Code

function getTravelerInfo() {
    fetch(travelerUrl)
        .then(r => r.json())
        .then(travelerObj => renderTravelerInfo(travelerObj))
}

function getAnimalSightingsInfo() {
    fetch(animalsUrl)
        .then(r => r.json())
        .then(animalSightingArr => {
            getAnimalSighting(animalSightingArr)
        })
    }

function updateAnimalSightingsInfo(sighting) {
    fetch(animalsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(sighting)
    })
        .then(r => r.json())
        .then(newSightingObj => renderAnimalSightings(newSightingObj))
    
}

function updateTravelerLikes(newLikes) {
    fetch(travelerUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({likes:newLikes})
    })
        .then(r => r.json())
        .then(travelerObj => likes.innerHTML = travelerObj.likes)
}

// Rendering Logic

function renderTravelerInfo(travelerObj) {
    travelerProfile.querySelector('img').src = travelerObj.photo
    travelerProfile.querySelector('h2').innerHTML = travelerObj.name
    travelerProfile.querySelector('em').innerHTML = travelerObj.nickname
    travelerProfile.querySelector('p').innerHTML = travelerObj.likes
}

function getAnimalSighting(animalSightingArr) {
    animalSightingArr.forEach(sighting => {
        renderAnimalSightings(sighting)
    })
}

function renderAnimalSightings(sightings) {
    animalSightings.innerHTML += `<li id=${sightings.id}>
        <h1>Species: ${sightings.species}</h1> 
        <h3>Description: ${sightings.description}</h3>
        <img src="${sightings.photo}">
        <a href="${sightings.link}">Video</a>
    </li>`
}

// Event Handler

function handleSubmitEvent() {
    newAnimalSightingForm.addEventListener('submit', function(e) {
        e.preventDefault()
        let sighting = {
            species:e.target.species.value,
            description:e.target.description.value,
            photo:e.target.photo.value,
            link:e.target.video.value,
            travelerId:1
        }
        updateAnimalSightingsInfo(sighting)
    })
}

function handleLikeButton() {
    likeButton.addEventListener('click', function(e) {
        let newLikes = parseInt(likes.innerHTML)+1
       updateTravelerLikes(newLikes)
    })
}

function handleToggle() {
    header.addEventListener('click', function(e) {
        if (header.style.color === 'green') {
            header.style.color = 'black'
        } else {
            header.style.color = 'green'
        }   
    })
}

// Initialize

getTravelerInfo()
getAnimalSightingsInfo()
handleSubmitEvent()
handleLikeButton()
handleToggle()