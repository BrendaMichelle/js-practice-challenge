
// write code here
 // deliverable 1 - get travelers profile

 fetch('http://localhost:3000/travelers/1')
 .then(response => response.json())
 .then(travelerObject => {
        const profileImg = document.querySelector("#profile img")
        profileImg.src = travelerObject.photo
        profileImg.alt = travelerObject.name
        
        const profileH2 = document.querySelector("#profile h2")
        profileH2.textContent = travelerObject.name
        
        const profileEm = document.querySelector("#profile em")
        profileEm.textContent = travelerObject.nickname
        
        const likes = document.querySelector("#profile p.likes")
        likes.textContent = `${travelerObject.likes} Likes`   
        

 })

//deliverable 2 - show animal sightings upon page load

function renderAllCards() {
    fetch('http://localhost:3000/animalSightings')
        .then(response => response.json())
        .then(animalSightings => {
            animalSightings.forEach(animalSighting => {
                renderAnimalSightingPost(animalSighting)
            })
        })
}
const ul = document.querySelector('ul#animals')

function renderAnimalSightingPost(animalSighting) {

    const li = document.createElement('li')
        li.dataset.id = animalSighting.id

        li.innerHTML = `<p>${animalSighting.description}</p>
            <img src="${animalSighting.photo}" alt="${animalSighting.species}"/>
            <a href="${animalSighting.link}" target="_blank">Here's a video about the ${animalSighting.species} species!</a> <p class='likes-display'>${animalSighting.likes} Likes</p>
            <button class="like-button" type="button">Like</button>
            <button class="delete-button" type="button">Delete</button>
            <button class="toggle-update-form-button" type="button">Toggle Update Form</button>
            <form class="update-form" style="display: none;">
            <input type="text" value="{description here}"/>
            <input type="submit" value="Update description">
            </form>`
       
        ul.append(li)

}

// deliverable 3 - add a new animal sighting through submit form
const form = document.querySelector('form#new-animal-sighting-form')

form.addEventListener('submit', function (event) {
    event.preventDefault()

    const species = event.target[0].value
    const video = event.target[1].value
    const photo = event.target[2].value
    const description = event.target[3].value

    const newAnimalSighting = {
        species: species,
        video: video,
        photo: photo,
        description: description,
        likes: 0
    }

    fetch('http://localhost:3000/animalSightings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newAnimalSighting)
    })
        .then(response => response.json())
        .then(newAnimalSightingObject => {
            renderAnimalSightingPost(newAnimalSightingObject)
        })

   
    form.reset()
})


// deliverable 4 -  Increase traveler likes
travelerLikes = document.querySelector('#profile button.like-button')
travelerLikes.addEventListener('click', function (event) {
    
        const profile = event.target.closest('div#profile')
        const likesPtag = event.target.previousElementSibling
        console.log(likesPtag)
        const likesNum = parseInt(likesPtag.textContent) + 1
        likesPtag.textContent = `${likesNum} Likes`

        fetch(`http://localhost:3000/travelers/1`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ likes: likesNum })
        })
            .then(response => response.json())
            .then(data => console.log(data))
    
}
)
// Deliverable 5/6/7: Like an animal sighting/delete animal sighting/toggle update form
// event listener, event delegation

ul.addEventListener('click', function (event) {
    if (event.target.matches('button.like-button')) {
        handleLike(event)
    } else if (event.target.matches('button.delete-button')) {
        handleDelete(event)
    } else if(event.target.matches('button.toggle-update-form-button')) {
        handleToggleUpdate(event)
    }
})

function handleLike(event){
    const li = event.target.closest('li')
        const likesPtag = event.target.previousElementSibling
        const likesNum = parseInt(likesPtag.textContent) + 1
        likesPtag.textContent = `${likesNum} Likes`

        fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ likes: likesNum })
        })
            .then(response => response.json())
            .then(data => console.log(data))
}

function handleDelete(event){
    const li = event.target.closest('li')

        fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
            method: 'DELETE'
        })
        li.remove()
}

function handleToggleUpdate(event){
    const updateForm = event.target.nextElementSibling
    toggleHidden(updateForm)
}

function toggleHidden(element){
    element.style.display === "none" ? element.style.display = "block" : element.style.display = "none"
}

// deliverable 8 - update animal sighting description

ul.addEventListener('submit', function(event){
    event.preventDefault()
    if (event.target.matches('.update-form')){
        handleUpdateFormSubmission(event)
    }

})

function handleUpdateFormSubmission(event) {
    event.preventDefault()
    const li =  event.target.closest('li')
    const descriptionPtag = li.querySelector('p')
    descriptionPtag.textContent = event.target[0].value
  
    fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({description: descriptionPtag.textContent})
        })
            .then(response => response.json())
            .then(data => console.log(data))
}

/// APP INIT
renderAllCards()