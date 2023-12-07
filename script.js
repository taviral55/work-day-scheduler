// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // Add a listener for click events on the save button
    $(".saveBtn").on("click", function () {
        // Get the id of the parent time-block
        var blockId = $(this).parent().attr("id");

        // Get the user input from the textarea
        var userInput = $(this).siblings(".description").val();

        // Save the user input to local storage using the blockId as the key
        localStorage.setItem(blockId, userInput);

        // Update the latest time when a new event is added
        updateLatestTime();
    });

    // Function to update the latest time
    function updateLatestTime() {
        var latestTime = new Date();
        var formattedLatestTime = latestTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        $("#latestTimeValue").text(formattedLatestTime);
    }

    // Apply past, present, or future class to each time block
    var currentHour = new Date().getHours();
    $(".time-block").each(function () {
        var blockId = $(this).attr("id");
        var blockHour = parseInt(blockId.split("-")[1]);

        if (blockHour < currentHour) {
            $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
            $(this).removeClass("past future").addClass("present");
        } else {
            $(this).removeClass("past present").addClass("future");
        }
    });

    // Get user input from localStorage and set values in textarea elements
    $(".time-block").each(function () {
        var blockId = $(this).attr("id");
        var storedInput = localStorage.getItem(blockId);

        if (storedInput) {
            $(this).find(".description").val(storedInput);
        }
    });

    // Display the current date in the header of the page
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var currentDate = new Date();
    var formattedDate = daysOfWeek[currentDate.getDay()] + ", " + months[currentDate.getMonth()] + " " + currentDate.getDate();

    $("#currentDay").text(formattedDate);

    // Add the latest time element to display at the top of the calendar
    var latestTimeElement = $("<p>").addClass("lead").html("Latest Time: <span id='latestTimeValue'></span>");
    $("#currentDay").after(latestTimeElement);

    // Initialize the latest time when the page loads
    updateLatestTime();
});


// // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// // the code isn't run until the browser has finished rendering all the elements
// // in the html.
// $(function () {
//   // TODO: Add a listener for click events on the save button. This code should
//   // use the id in the containing time-block as a key to save the user input in
//   // local storage. HINT: What does `this` reference in the click listener
//   // function? How can DOM traversal be used to get the "hour-x" id of the
//   // time-block containing the button that was clicked? How might the id be
//   // useful when saving the description in local storage?
//   //
//   // TODO: Add code to apply the past, present, or future class to each time
//   // block by comparing the id to the current hour. HINTS: How can the id
//   // attribute of each time-block be used to conditionally add or remove the
//   // past, present, and future classes? How can Day.js be used to get the
//   // current hour in 24-hour time?
//   //
//   // TODO: Add code to get any user input that was saved in localStorage and set
//   // the values of the corresponding textarea elements. HINT: How can the id
//   // attribute of each time-block be used to do this?
//   //
//   // TODO: Add code to display the current date in the header of the page.
// });
