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
I fetch the traveler data from the database, then select each element and set the innerHTML for each to the appropriate matching data.
```


## Deliverable 2: Show animal sightings upon page load

**YOUR NOTES**
```
I fetch the animal sightings from the database, then use a helper function to display all of the sighting info for each one in li elements, which I then append to the animal sightings ul.
```




## Deliverable 3: Add a new animal sighting

**YOUR NOTES**
```
I add a listener to the form element and create a new object with the form input, then call a helper method to POST the info to the database. I then display the new animal on the page with my displayAnimalSighting helper method, after the new sighting has been successfully saved to the DB. I make the sighting IDs match the li ids for use in the delete/like deliverables later on.
I hardcore travelerId to 1, since we only have one traveler, and set likes to 0 to start.
```




## Deliverable 4: Increase likes

**YOUR NOTES**
```
I created a helper method to listen for clicks on the likes button on the traveler inside of the second .then block on my traveler fetch, since we need to know how many likes the traveler already has before updating them. I update the database based on the likes currently showing on the page, then display the new likes on the page.
```




## Deliverable 5: Toggle header color

**YOUR NOTES**
```
I created a .dark-green class in the CSS file, added a click listener on the header, and toggle the .dark-green class whenever a click is registered.
```



__________

## Advanced Deliverable 1: Persist new animal sightings

**YOUR NOTES**
```
Already completed during the initial form handling - I create a new animal object using the info from the form, then use JSON.stringify to save it into the database, and call my helper function to show it on the page after it successfully saves.
```


## Advanced Deliverable 2: Like a new animal sighting

**YOUR NOTES**
```
I created a function to add listeners (for clicks in the animals list (for the delete deliverable below as well - event propagation!), and set the id of the li element that was clicked so I can tell the database what data will need to be changed.

I match that a click occurs on a like button, then update the database for this particular sighting using the ID, and update the likes displayed on the page.

I call the function to add the listeners after the animal sightings have been displayed on the page, since there would be no buttons to listen for events on before that.
```



## Advanced Deliverable 3: Delete an animal sighting

**YOUR NOTES**
```
I used the same listener from the previous deliverable,  but match for the delete button instead, and then delete the item from the database using the id that I set when the event was first registered.
```

