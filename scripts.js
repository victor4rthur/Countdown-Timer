// Declare a variable to store the interval ID for the countdown
let countdown;

// Select the DOM element with the class 'display__time-left' and store it in a variable
const timerDisplay = document.querySelector('.display__time-left');

// Select the DOM element with the class 'display__end-time' and store it in a variable
const endTime = document.querySelector('.display__end-time');

// Select all the DOM elements with the attribute 'data-time' and store them in a NodeList
const buttons = document.querySelectorAll('[data-time]');

// Function to start a timer with a given number of seconds
function timer(seconds){
    // Clear any existing countdown intervals
    clearInterval(countdown);

    // Get the current timestamp
    const now = Date.now();

    // Calculate the timestamp when the timer should end
    const then = now + seconds * 1000;

    // Display the initial time left and end time
    displayTimeLeft(seconds);
    displayEndTime(then);

    // Set up a countdown interval to update the display every second
    countdown = setInterval (() => {
        // Calculate the remaining seconds
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // If the timer has reached 0, clear the interval and return
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        // Update the display with the remaining time
        displayTimeLeft(secondsLeft);
    }, 1000);
}

// Function to display the time left in the timer
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds} `;
    document.title = display;
    timerDisplay.textContent = display;
}

// Function to display the end time when the timer will finish
function displayEndTime (timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Function to start the timer when a button is clicked
function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

// Add a click event listener to each button, calling startTimer when clicked
buttons.forEach(button => button.addEventListener('click', startTimer));

// Add a submit event listener to a form with the name 'customForm'
document.customForm.addEventListener('submit', function(e){
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the value of the 'minutes' input in the form
    const mins = this.minutes.value;

    // Start the timer with the specified number of minutes converted to seconds
    timer(mins * 60);

    // Reset the form
    this.reset();
});
