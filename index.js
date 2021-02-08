/************************** EVENTS JS MINI CHALLENGE WITH JSON SERVER ******************************/
let animals = document.querySelector('#animals')
let profile = document.querySelector('#profile')
let likes = profile.querySelector('.likes')
let likeButton = profile.querySelector('.like-button')
let form = document.querySelector('#new-animal-sighting-form')
let deleteButton = document.querySelector('.delete-button')


function showTraveler(){
    fetch('http://localhost:3000/travelers/1')
    .then(res => res.json())
    .then(traveler => {
        
        let name = profile.querySelector('h2')
        let nickname = profile.querySelector('em')
        let image = profile.querySelector('img')
        
        console.log(name, nickname, image)
        name.innerText = traveler.name
        nickname.innerText = traveler.nickname
        image.src = traveler.photo
        image.alt = traveler.name
        likes.innerText = `${traveler.likes} Likes`
    })
}

function showsightings(){
    fetch('http://localhost:3000/animalSightings')
    .then(res => res.json())
    .then(sightings => {
        sightings.forEach(sighting => {
            displaySighting(sighting)
        });

    })
}
function displaySighting(sighting){
    let list = document.createElement('li')
    list.dataset.id = sighting.id
    list.className = sighting.travelerId
    list.innerHTML = `<p>${sighting.description}</p>
    <img src="${sighting.photo}" alt="${sighting.species}"/>
    <a href="${sighting.link}" target="_blank">Here's a video about the ${sighting.species} species!</a>`
    let deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-button'
    deleteBtn.innerText = 'Delete Sighting!'
    list.append(deleteBtn)
    animals.append(list)
}


function renderForm(e){
    e.preventDefault()
    
    let newSighting = {
        species: e.target[0].value, 
        link: e.target[1].value, 
        photo: e.target[2].value,
        description: e.target[3].value,
        travelerId: 1
    }
    updateSightings(newSighting)   
}

function updateSightings(newSighting){
    fetch('http://localhost:3000/animalSightings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSighting)
    })
    .then(res => res.json())
    .then(data => {
        displaySighting(data)
    })
}

function addLike(){
    newLike = parseInt(likes.innerText) + 1
    fetch('http://localhost:3000/travelers/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({likes: newLike})
    })
    .then(res => res.json())
    .then(data => {
        
        likes.innerText = `${data.likes} Likes`
    })

}

function deleteSighting(e){
    
    if(e.target.className === 'delete-button'){
        li = e.target.closest('li')
        li.remove()
        fetch(`http://localhost:3000/animalSightings/${parseInt(li.dataset.id)}`,{
            method: 'DELETE',        
        })
    }
}


showTraveler()
showsightings()

form.addEventListener('submit', renderForm)
likeButton.addEventListener('click', addLike)
animals.addEventListener('click', deleteSighting)