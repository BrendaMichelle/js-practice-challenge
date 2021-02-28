/************************** EVENTS JS MINI CHALLENGE WITH JSON SERVER ******************************/

// Global Variables //
const profileDiv = document.querySelector('div#profile');
const animalsUl = document.querySelector('ul#animals');
const form = document.querySelector('form#new-animal-sighting-form');
const header = document.querySelector('h1#header');

// Function Definitions //

function renderTraveler() {
    fetch('http://localhost:3000/travelers/1')
        .then(response => response.json())
        .then(travelerObj => {
            profileDiv.innerHTML =
            `<img src="${travelerObj.photo}"
            alt="${travelerObj.name}">
            <h2>${travelerObj.name}</h2>
            <em>${travelerObj.nickname}</em>
            <p class="likes">${travelerObj.likes} Likes</p>
            <button id="like-button">❤️</button>`
        })
    }
    
function renderSightings() {
    fetch('http://localhost:3000/animalSightings')
    .then(response => response.json())
    .then(sightingsArr => {
        sightingsArr.forEach(sighting => {
            const sightingLi = document.createElement('li')
            sightingLi.innerHTML =
            `<li data-id="${sighting.id}">
            <p>${sighting.description}</p>
            <img src="${sighting.photo}" alt="${sighting.species}"/>
            <a href="${sighting.link}" target="_blank">Here's a video about the ${sighting.species} species!</a>
            <button id="delete"> Delete </button>
            </li>`;
            animalsUl.append(sightingLi);
        })
    })
}


// Add Event Listeners //
form.addEventListener('submit', function (event) {
    event.preventDefault()
    
    const travelerId = 1;
    const species = event.target[0].value;
    const link = event.target[1].value;
    const photo = event.target[2].value;
    const description = event.target[3].value;
    const likes = 0;
    
    
    const animalObj = { travelerId, species, link, photo, description, likes };
    
    fetch('http://localhost:3000/animalSightings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(animalObj)
    })
    .then(response => response.json())
    .then(oneAnimalObj => {
        const sightingLi = document.createElement('li')
        sightingLi.innerHTML =
        `<li data-id="${oneAnimalObj.id}">
        <p>${oneAnimalObj.description}</p>
        <img src="${oneAnimalObj.photo}" alt="${oneAnimalObj.species}"/>
        <a href="${oneAnimalObj.link}" target="_blank">Here's a video about the ${oneAnimalObj.species} species!</a>
        </li>`;
        animalsUl.append(sightingLi);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    event.target.reset();
})
    
    
    
header.addEventListener('click', function (event) {
    event.target.style.color == 'green' ? event.target.style.color = 'black' : event.target.style.color = 'green'
})

    
profileDiv.addEventListener('click', function (event) {
    if (event.target.id === 'like-button') {
        const pTag = profileDiv.querySelector('p.likes');
        const currLikes = parseInt(pTag.textContent);
        const newLikesObj = { likes: currLikes + 1 }
        console.log(newLikesObj)

        fetch('http://localhost:3000/travelers/1', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLikesObj)
        })
            .then(response => response.json())
            .then(data => {
                pTag.textContent = `${data.likes} Likes`
            })
            .catch(error => {
                alert(error)
            })
    }
})

animalsUl.addEventListener('click', function (event) {
    if (event.target.id === 'delete') {
        const animalId = event.target.closest('li')

        fetch(`http://localhost:3000/animalSightings/${animalId.dataset.id}`, {
            method: 'Delete'
            
        })
            .then(response => response.json())
            .then(data => {
                animalId.remove();
            })

    }
})
    
// INIT //
renderTraveler();
renderSightings();
    