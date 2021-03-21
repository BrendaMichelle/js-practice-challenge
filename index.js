/*   Global variables   */
const divProfile = document.querySelector('div.traveler div#profile')
const pLikes = divProfile.querySelector('p.likes')
const likeBtn = divProfile.querySelector('button.like-button')
const ulAnimals = document.querySelector('div.traveler ul#animals')
const formNew = document.body.querySelector('form#new-animal-sighting-form')
// Deliverable 1: Show traveler info upon page load

const renderProfile = () => {
    fetch('http://localhost:3000/travelers/1')
        .then(response => response.json())
        .then(travelerObj => {

            const img = divProfile.querySelector('img')
            img.src = travelerObj.photo
            img.alt = travelerObj.name

            const h2 = divProfile.querySelector('h2')
            h2.textContent = travelerObj.name

            const em = divProfile.querySelector('em')
            em.textContent = travelerObj.nickname

            pLikes.textContent = `${travelerObj.likes} Likes`
        })
}
renderProfile()

// Deliverable 2: Show animal sightings upon page load

const renderAllSightings = () => {
    fetch('http://localhost:3000/animalSightings')
        .then(response => response.json())
        .then(animalSightings => {
        animalSightings.forEach(animalSighting => {
            renderOneSighting(animalSighting)
        })
    })
}
const renderOneSighting = sightingObj => {
    const li = document.createElement('li')
    li.dataset.id = sightingObj.id
    li.innerHTML = `
        <p>${sightingObj.description}</p>
        <img src='${sightingObj.photo}' alt='${sightingObj.species}'/>
        <a href='${sightingObj.link}' target='_blank'>Here's a video about the ${sightingObj.species} species!</a>
        <p class='likes-display'>${sightingObj.likes} Likes</p>
        <button class="like-button" type="button">Like</button>
        <button class="delete-button" type="button">Delete</button>
        <button class="toggle-update-form-button" type="button">Toggle Update Form</button>
        <form class="update-form" style="display: none;">
        <input type="text" value="${sightingObj.description}"/>
        <input type="submit" value="Update description">
        </form>
      `
    ulAnimals.appendChild(li)
}

renderAllSightings()

// Deliverable 3: Add a new animal sighting
const handleNewSighting = (event) => {
    event.preventDefault()

    const species = event.target[0].value
    const video = event.target[1].value
    const photo = event.target[2].value
    const description = event.target[3].value
    formNew.reset()

    fetch('http://localhost:3000/animalSightings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            travelerId: 1,
            species: species,
            photo: photo,
            link: video,
            description: description,
            likes: 0
        })
    })
        .then(response => response.json())
        .then(newSighting => {
            renderOneSighting(newSighting)
        })
        .catch((error) => {
            alert("Oopsie!")
            console.error('Error:', error)
        })
}

formNew.addEventListener('submit', handleNewSighting)

// Deliverable 4: Increase traveler likes

const handleTravelerLikes = () => {
    const newLikes = parseInt(pLikes.textContent) + 1
    pLikes.textContent = `${newLikes} Likes`

    fetch('http://localhost:3000/travelers/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify( {likes: newLikes} )
    })
        .then(response => response.json())
        .then(data => { console.log(data) })
}

likeBtn.addEventListener('click', handleTravelerLikes)


// Deliverable 5: Like an animal sighting + Deliverable 6: Delete an animal sighting + Deliverable 7: Toggle the update form for an animal sighting

const handleSightingClick = (event) => {
    const li = event.target.closest('li')
    if (event.target.matches('button.like-button')) {
        
        const pLikes = event.target.previousElementSibling
        const newLikes = parseInt(pLikes.textContent) + 1 
        pLikes.textContent = `${newLikes} Likes`

        fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify( {likes: newLikes} )
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }
    else if (event.target.matches('button.delete-button')) {
        fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
            method: 'DELETE'
        }) 
        li.remove()
    }
    else if (event.target.matches('button.toggle-update-form-button')) {
        const formUpdate = li.querySelector('form.update-form')
        formUpdate.style.display = formUpdate.style.display === 'block' ? 'none' : 'block'

        if (formUpdate.style.display === 'block') {
            const p = li.firstChild
            formUpdate.addEventListener('submit', event => {
                event.preventDefault()
                const newDesc = event.target[0].value 
                p.textContent = newDesc
                formUpdate.reset()

                fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify( {description: newDesc} )
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
            })
        }
    }
}

ulAnimals.addEventListener('click', handleSightingClick)

// ulAnimals.addEventListener('submit', function (event) {
//     if (event.target.matches('form.update-form')) {
//         event.preventDefault()
//         const newDesc = event.target[0].value
//         const li = event.target.closest('li')
//         const p = li.firstChild
//         p.textContent = newDesc
//         fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
//                     method: 'PATCH',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json'
//                     },
//                     body: JSON.stringify( {description: newDesc} )
//                 })
//                     .then(response => response.json())
//                     .then(data => console.log(data))
//     }
// })
