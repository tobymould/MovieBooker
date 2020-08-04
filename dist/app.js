// 1. DOM Elements:
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

PopulateUI();

//2. Values
let ticketPrice = +movieSelect.value; //'+' turns string datatype into integer.

// SAVE SELECTED MOVIE - index and price:
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// 3. Support Functions:
// updates total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // SAVE THE SELECTED SEATS - using the Spread Operator (...) 1) Copy selected seats into arr, 2) Map through array, & 3) Return a new array of indexes.
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and Populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// 4. Event Listener:
// Movie Select Event:
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;

  updateSelectedCount();
});
// Seat Click Event:
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
  //accesses the target classlist if it contains 'seat' and NOT contain 'occupied'.
  //...toggle the classlist of the target element to include 'selected' temporarily while selected.
});

// Initial count and total set
updateSelectedCount();

//
//
/* Lessons Learned
> How to structure a Javascript file:
    1. GRAB DOM Elements  - Grab all the elements you wanna apply JS to:
        a. -
    2. GRAB DOM Values    - If you assigned any 'value' properties to elements, can grab here if need them.
    3. Support Functions  - Create all of the functions you will run inside the Event Listeners Handler (function): 
        a. -
        b. -
        c. -
    4. EventListeners     - Apply to the container (parent) of the area of interest (child/children): 
        a. Set up 'if-conditional' criteria, looking at the 'classList' of the 'event parameter-target' 
        b. Afterward, CALLOUT the support functions in order of use to do specific tasks.


> You should apply the event listener to the parent container element instead of any of the children. 

> '+' - put as prefix on variable name to ensure turns datatype 'string' into 'integer'.

> classList.
    a) .add    - Adds permanently to the classList of that element once activated.
    b) .remove - Removes permanently from the classList of that element once activated.
    c) .toggle - Allows for users to add A CLASS to classList of an element TEMPORARILY WHILE SELECTED, but will be removed when deselected.

*/
