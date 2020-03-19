// DOM Elements:
const container = document.getElementById(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//Values
const ticketPrice = +movieSelect.value; //'+' turns string datatype into integer.

// Functions:
// updates total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seats .selected");
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Event Listener:
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //accesses the target classlist if it contains 'seat' and NOT contain 'occupied'.
    e.target.classList.toggle("selected");
  }

  updateSelectedCount();
}); //...toggle the classlist of the target element to include 'selected' temporarily while selected.

/* Lessons Learned
> You should apply the event listener to the parent container element instead of any of the children. 

> classList.
    a) .add    - Adds permanently to the classList of that element once activated.
    b) .remove - Removes permanently from the classList of that element once activated.
    c) .toggle - Allows for users to add A CLASS to classList of an element TEMPORARILY WHILE SELECTED, but will be removed when deselected.

*/
