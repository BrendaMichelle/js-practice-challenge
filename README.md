# JS Mini Challenge


## Setup

- Fork this repo, then run `git clone` to download your fork locally. Then `cd` into the downloaded directory and open it in your text editor with `code .`.
- Run `json-server --watch db.json` to get the backend started
- Open the `index.html` file on your browser

## Endpoints

Your base URL for your API will be: http://localhost:3000

The endpoints you will need are:

- GET `/travelers/1`
- PATCH `/travelers/1`
- GET `/animalSightings`
- POST `/animalSightings`
- PATCH `/animalSightings/:id`
- DELETE `/animalSightings/:id`


## Assignment

In this challenge, we're going to work on Raffy's Amazon trip page and give our users the ability to:

- See information about a traveler including their image, name, nickname, and number of likes when the page loads
- See all their animal sightings when the page loads
- Add a new animal sighting
  - Your animal sighting object must have a `travelerId` key with a value of `1` for it to work
- Click on the heart button to increase the number of likes for the traveler profile and still see the updated likes when I reload the page
- Toggle the header color between black and green


## Advanced Deliverables  
- Add a like button to each sighting and implement a like feature that persists
- Add a delete button to each sighting and implement a delete feature that persists

__________

There's a section in this Readme file for your notes on each deliverable. As you go through the deliverables, write down some notes in this file on how you solved each problem. It'll help reinforce what you learned and give you a head start next time you see a similar problem.

## Deliverable 1: Show traveler info upon page load


**YOUR NOTES**
```
I knew I had to fetch the Traveler from the db.json with the ID of 1, so I put '...travlers/1' in the fetch request. Then I took that promise and converted it to json. I used that object to alter the innerHTML of the Div that contains the traveler information.
```


## Deliverable 2: Show animal sightings upon page load

**YOUR NOTES**
```
I used the same 'get' method for deliverable 1, just making sure to get all the animal sightings as an array. I then knew I could iterate over the array with forEach, taking a callback function. I did have to look back to the earlier challenges to copy the innerHTML, but I suppose I could have figured out my own html configuration. Lastly, I had to append each Li to the Ul parent element, so it would show on the DOM.
```




## Deliverable 3: Add a new animal sighting

**YOUR NOTES**
```
I used the 'submit' event listener. I collected all the data from the form and compiled it into an object, which I passed into the body of a POST request to the server. Then I created 
```




## Deliverable 4: Increase likes

**YOUR NOTES**
```
I got stuck on this only because the Like Button wasn't registering my clicks. I figured out to assign the event listener to the outer Div and listen only for the 'button' inside the div. The rest was just sending a patch request to the database and creating a "likes object" by increasing the likes by one. Then I set the textcontent to the p tag to ${likes + 1}
```




## Deliverable 5: Toggle header color

**YOUR NOTES**
```
I added a click listener on the header and used a ternary operator to turn it either black or green.
```



__________

## Advanced Deliverable 1: Persist new animal sightings

**YOUR NOTES**
```
I just made sure to send a POST request to the DB before updating the HTML. Just like the submit form one.
```


## Advanced Deliverable 2: Like a new animal sighting

**YOUR NOTES**
```

```



## Advanced Deliverable 3: Delete an animal sighting

**YOUR NOTES**
```

```

