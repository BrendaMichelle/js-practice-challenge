# JS Mini Challenge


## Setup

- Fork this repo, then run `git clone` to download your fork locally. Then `cd` into the downloaded directory and open it in your text editor with `code .`.
- Run `json-server --watch db.json --routes routes.json` to get the backend started
- Open the `index.html` file on your browser

## Endpoints

Your base URL for your API will be: http://localhost:3000

The endpoints you may need are:

- GET `/travelers/1`
- PATCH `/travelers/1`
- GET `/animalSightings`
- POST `/animalSightings`
- PATCH `/animalSightings/:id`
- DELETE `/animalSightings/:id`

Be sure to check out what data you are getting returned when you make a request to a certain route!


## Assignment

In this challenge, we're going to tie everything we learned this week together. We'll have a lot of the same deliverables, but this time, we need to add in persistence where necessary to save data! We're going to work on Raffy's Amazon trip page and give our users the ability to:

- See information about the traveler with the ID of 1 including their image, name, nickname, and number of likes when the page loads
- See all the traveler's animal sightings when the page loads
- Add a new animal sighting
- Click on the heart button to increase the number of likes for the traveler profile and still see the updated likes when I reload the page
- Click an animal sighting's like button to increase its likes
- Click an animal sighting's delete button to delete it
- Click on the animal sighting's 'Toggle Update Form' button to toggle the update form for that animal sighting
- Submit an animal sighting's form to update that animal sighting's description

__________

There's a section in this Readme file for your notes on each deliverable. As you go through the deliverables, write down some notes in this file on how you solved each problem. It'll help reinforce what you learned and give you a head start next time you see a similar problem.

## Deliverable 1: Show traveler info upon page load

When the page loads, the information about the traveler should display including their name, image, nickname, and number of likes.


**YOUR NOTES**
```
Fetches the data from the json-server and assigns the corresponding data to the suitable element.
```


## Deliverable 2: Show animal sightings upon page load

When the page loads, each animal sighting of the travler should appear on the page in the `ul#animals` section. Each animal sighting should look like:

```html
<li data-id='{id here}'>
  <p>{description here}</p>
  <img src='{image url here}' alt='{species here}'/>
  <a href='video url here' target='_blank'>Here's a video about the {species here} species!</a>
  <p class='likes-display'>{number of likes here} Likes</p>
  <button class="like-button" type="button">Like</button>
  <button class="delete-button" type="button">Delete</button>
  <button class="toggle-update-form-button" type="button">Toggle Update Form</button>
  <form class="update-form" style="display: none;">
    <input type="text" value="{description here}"/>
    <input type="submit" value="Update description">
    </form>
</li>

```

**YOUR NOTES**
```
Created a new fetch GET request and assigned the innerHTML of new "li" elements to the desired outputs and appended that to the ul#animals unordered list. Set the data-id outside the innerHTML so that I wouldn't end up with double bullet points (or in other words, an li element within another li element).
```




## Deliverable 3: Add a new animal sighting

When the user submits the form to add a new animal sighting post, the animal sighting should render on the page without reloading and should persist (it sohuld still be visible if the page reloads).Your animal sighting object must have a `travelerId` key with a value of `1` for the app to work properly.

**YOUR NOTES**
```
Factored out the code that creates new list elements for each animal sighting and organized it as its own method. This method gets called when adding new sightings and also when rendering sightings from the json server. It creates the view for each sighting.
```




## Deliverable 4: Increase traveler likes

When the user clicks on the traveler's like button, the new number of likes should display on the page without reloading the page. The new number of likes should persist (if the page reloads, the new number of likes should still display).

**YOUR NOTES**
```
Obtained the current number of likes from the json server and adds one to it for every click of the like button. This change is made in the database with a PATCH fetch() request that updates the number of likes of the traveler object. The likesVal variable is used to reference to the current number of likes at the instance of a click of the heart. This is then useful to update the number of likes to its new value in the database as well as on the screen.
```



## Deliverable 5: Like an animal sighting

When the user clicks on an animal sighting's like button, the new number of likes for that animal should display on the page without reloading the page. The new number of likes should persist (if the page reloads, the new number of likes should still display).

**YOUR NOTES**
```
Used a PATCH fetch() request and added an event listener to the like buttons on each sighting linking them to this fetch request. The fetch request is made to specific animal Sightings using their ids. This is configured as an optimistic rendering as the number of likes on the page increases before being updated in the json server.
```



## Deliverable 6: Delete an animal sighting

When the user clicks on an animal sighting's delete button, that animal should be be removed from the page without reloading the page. The deletion should persist (if the page reloads, that animal sighting does not reappear).

**YOUR NOTES**
```
A DELETE fetch() request is sent to corresponding animal sightings using their ids. This fetch is linked with the delete request. This is set up as a pessimistic rendering as the sightings are removed from the page after being deleted from the json server.
```


## Deliverable 7: Toggle the update form for an animal sighting

When the user clicks on an animal sighting's 'toggle update form' button, that animal sighting's form should should toggle between displaying and not displaying on the page.

**YOUR NOTES**
```
Added an event listener to the toggle button. This event listener checks for the current state of the form's display and changes it to its opposite (i.e. if it's "block" changes it to "none" and vice versa).
```


## Deliverable 8: Update an animal sighting's description

When the user submits an animal sighting's update form, the updated animal sighting's description should display on the page without reloading the page. The udpated description should persist (if the page refreshes, the updated description should still display).


**YOUR NOTES**
```
Added an event listener to the update form and linked it with a fetch() PATCH request that updates the description attribute of a given object. It also sets the display of the form to "none" to create a more intuitive user interaction. It also uses a pessimistic rendering technique with the page being updated after the json server is updated. The event listener of the form doesn't have a reset() function for the form because it is more intuitive to provide the users with the pre-existing description when they want to update the description of a given sighting.
```

