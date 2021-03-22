// DELIVERABLE 1: Show traveler info upon page load

function travelerObject() {
fetch('http://localhost:3000/travelers/1')
    .then(response => response.json())
    .then(traveler => {

        // Locate the parent "div" and id "profile"
        const profile = document.querySelector('div#profile')
        // 1. Image 
        const img = profile.querySelector('img')
        img.src = traveler.photo
        img.alt = traveler.name
        // 2. Name
        const h2 = profile.querySelector('h2')
        h2.textContent = traveler.name
        // 3. Nickname
        const em = profile.querySelector('em')
        em.textContent = traveler.nickname
        // 4. Number of likes
        const likes = profile.querySelector('p')
        likes.textContent = `${traveler.likes} Likes`
        // console.log(profile)
    })
}
travelerObject()

    // Deliverable 2: Show animal sightings upon page load

function animalSightingsPost() {
    // 1. Get the animalSightings JSON file
   fetch('http://localhost:3000/animalSightings')
        .then(response => response.json())
        .then(animalSightings =>{ 
    // 2. Show each animalSighting post
            animalSightings.forEach(animalSighting => {
    // 3. Create the "li" tag
                const li = document.createElement('li')
    // 4. Data id
                li.dataset.id = animalSighting.id
    // 5. Create HTML in JS "innerHTML" in side the "li" tag
                li.innerHTML =`
                <p>${animalSighting.description}</p>
                <img src="${animalSighting.photo}" alt="${animalSighting.species}"/>
                <a href="${animalSighting.link}" target="_blank">Here's a video about the ${animalSighting.species} species!</a>
                <p class='likes-display'>${animalSighting.likes} Likes</p>
                <button class="like-buttons" type="button">Like</button>
                <button class="delete-button" type="button">Delete</button>
                <button class="toggle-update-form-button" type="button">Toggle Update Form</button>
                <form class="update-form" style="display: none;">
                <input type="text" value="${animalSighting.description}"/>
                <input type="submit" value="Update description">
                </form>`
    // 6. Create the "li's" parent "ul#animal"
                //console.log(li)
                const ul = document.querySelector('ul#animals')
    // 7. "li" inside the "ul#animal"
                ul.append(li)

            })
        })  
}
animalSightingsPost()
    
    // Deliverable 3: Add a new animal sighting
    
const form = document.querySelector('form#new-animal-sighting-form')

form.addEventListener('submit', e => {
    e.preventDefault()
    // console.dir(event.target)
    // console.log(event.target)
    // GET THE USER INPUT FROM THE FORM
    const species = e.target[0].value
    const video = e.target[1].value
    const photo = e.target[2].value
    const description = e.target[3].value
    // lastIndex will give you the last object in the article array, then +1 to create new id
    // const lastIndex = traveler.animalSightings.length - 1
    const newAnimalSighting = { 
    //id: traveler.animalSightings[lastIndex].id + 1,
        travelerId: 1, // hard coding in travelerId
        species: species,
        photo: photo,
        link: video,
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
        .then(newAnimalSightingsPost => {
            animalSightingsPost(newAnimalSightingsPost)
        })
        form.reset()
})


//  Deliverable 4: Increase traveler likes

const profile = document.querySelector('div#profile')
    profile.addEventListener('click', function (e) {

        if (e.target.matches('button.like-button')) {
            const likes = document.querySelector("#profile .likes")
            const likesNum = parseInt(likes.textContent) + 1
            likes.textContent = `${likesNum} Likes`

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
            // .catch()
        }
    })


    // Deliverable 5: Like an animal sighting
    const animalCollection = document.querySelector('ul#animals')

    animalCollection.addEventListener('click', function(event) {
    
        const li = event.target.closest('li')
    
    if(event.target.matches('button.like-buttons')) {
       
        const likesPtag = li.querySelector('p.likes-display')
        const currLikes = parseInt(likesPtag.textContent) + 1
        likesPtag.textContent = `${currLikes} Likes`

        fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify({ likes: currLikes })

        })

            .then(response => response.json())
            .then(likeNum => console.log(likeNum))

    }

    // Deliverable 6: Delete an animal sighting

    else if (event.target.matches('button.delete-button')) {
        const li = event.target.closest('li')

        fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
            method: 'DELETE'
        })
        // .then(response => response.json())
        // .then(() => li.remove()) // pessimistic rendering
        // optimistic rendering
        li.remove()
    }

    // Deliverable 7: Toggle the update form for an animal sighting

    else if(event.target.matches('button.toggle-update-form-button')){
        // we have to define the form
        const form = li.querySelector('form')
        const updateForm = event.target.nextElementSibling
        if(form.style.display === 'block'){
            form.style.display = 'none'
        }
        else {
            form.style.display = 'block'
        }
    }
})

    // Deliverable 8: Update an animal sighting's description

    const updateForm = document.querySelector('form.update-form')
    updateForm.addEventListener('submit', function (event){
        if (event.target.matches('form.update-form')){
            event.preventDefault()
            const li = event.target.closest('li')
            const descriptionInput = event.target[0].value
            const descriptionPtag = li.querySelector('p')
            descriptionPtag.textContent = descriptionInput

            fetch(`http://localhost:3000/animalSightings/${li.dataset.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
            body: JSON.stringify({description: descriptionInput})
    })
            .then(response => response.json())
            .then(newDescription => console.log(newDescription))
             // animalSightingsPost(newDescription)
             updateForm.reset()
        }
        
    })