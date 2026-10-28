// ========================================
// PARKING MANAGEMENT SYSTEM
// Stack Principle: Last In, First Out (LIFO)
// ========================================


// 1. CREATE AN EMPTY STACK
// This array stores the registration numbers of parked cars.

let parkingStack = [];


// 2. SELECT HTML ELEMENTS

const parkingForm = document.getElementById("parkingForm");
const carNumberInput = document.getElementById("carNumber");
const parkingArea = document.getElementById("parkingArea");
const carCount = document.getElementById("carCount");
const message = document.getElementById("message");

const removeBtn = document.getElementById("removeBtn");
const peekBtn = document.getElementById("peekBtn");
const clearBtn = document.getElementById("clearBtn");


// 3. DISPLAY MESSAGES

function showMessage(text) {
    message.textContent = text;
}


// 4. PARK A CAR
// PUSH adds a new car to the top of the stack.

function parkCar(carNumber) {

    const car = carNumber.trim();

    // Check whether the input is empty.
    if (car === "") {
        showMessage("Please enter a car registration number.");
        return;
    }

    // Check whether the car is already parked.
    const alreadyParked = parkingStack.some(
        parkedCar =>
            parkedCar.toLowerCase() === car.toLowerCase()
    );

    if (alreadyParked) {
        showMessage("This car is already parked.");
        return;
    }

    // Add the car to the stack.
    parkingStack.push(car);

    // Display a success message.
    showMessage(car + " has been parked successfully.");

    // Clear the input box.
    carNumberInput.value = "";

    // Update the displayed parking area.
    displayCars();
}


// 5. HANDLE THE PARK CAR FORM

parkingForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing when the form is submitted.
    event.preventDefault();

    // Park the entered car.
    parkCar(carNumberInput.value);

});


// 6. REMOVE THE TOP CAR
// POP removes the last car added to the stack.

function removeCar() {

    // Check whether the stack is empty.
    if (parkingStack.length === 0) {
        showMessage("The parking area is empty.");
        return;
    }

    // Remove the last car from the stack.
    const removedCar = parkingStack.pop();

    // Display a message.
    showMessage(removedCar + " has left the parking area.");

    // Update the parking area.
    displayCars();
}


// Connect the Remove Top Car button.
removeBtn.addEventListener("click", removeCar);


// 7. VIEW THE TOP CAR
// PEEK displays the last car added without removing it.

function viewTopCar() {

    // Check whether the stack is empty.
    if (parkingStack.length === 0) {
        showMessage("There is no car in the parking area.");
        return;
    }

    // Get the last car in the stack.
    const topCar = parkingStack[parkingStack.length - 1];

    // Display the top car.
    showMessage("The top car is " + topCar + ".");
}


// Connect the View Top Car button.
peekBtn.addEventListener("click", viewTopCar);


// 8. CLEAR THE PARKING AREA

function clearParking() {

    // Check whether the stack is already empty.
    if (parkingStack.length === 0) {
        showMessage("The parking area is already empty.");
        return;
    }

    // Empty the stack.
    parkingStack = [];

    // Display a message.
    showMessage("The parking area has been cleared.");

    // Update the display.
    displayCars();
}


// Connect the Clear Parking button.
clearBtn.addEventListener("click", clearParking);


// 9. DISPLAY PARKED CARS

function displayCars() {

    // Clear the current display.
    parkingArea.innerHTML = "";

    // Update the total number of parked cars.
    carCount.textContent = parkingStack.length;

    // Show a message if no cars are parked.
    if (parkingStack.length === 0) {

        parkingArea.innerHTML =
            '<p class="empty-message">No cars are parked yet.</p>';

        return;
    }

    // Display cars from the top of the stack downward.
    for (let i = parkingStack.length - 1; i >= 0; i--) {

        // Create a new HTML element for each car.
        const carElement = document.createElement("div");

        // Apply the car styling.
        carElement.className = "car";

        // Highlight the car at the top of the stack.
        if (i === parkingStack.length - 1) {

            carElement.classList.add("top-car");

            carElement.textContent =
                parkingStack[i] + " — TOP OF STACK";

        } else {

            carElement.textContent = parkingStack[i];

        }

        // Add the car to the parking area.
        parkingArea.appendChild(carElement);
    }
}


// 10. DISPLAY THE INITIAL PARKING AREA

displayCars();