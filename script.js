$(document).ready(function() {
    setInterval(currentTime,1000)
    
dateEl = document.querySelector("#currentDay");

// Display date to currentDay
// dateEl.textContent = todayDate;

// Update time blocks color to todayTime

// Get current time
function currentTime(){
    let dt = new Date();
    let todaysDate = `${
      dt.getMonth() + 1
    } / ${dt.getDate()} / ${dt.getFullYear()}`;
    $("#currentDay").text(todaysDate);
    let currentHour = dt.getHours();
    let currentTime = dt.toLocaleTimeString();
    document.getElementById("currentTime").innerHTML = currentTime;

    $("textarea").each(function(){
        var blockTime = parseInt($(this).attr("id"));
        
        // console.log(blockTime)
        // Check if past
        if(blockTime < currentHour){
            $(this).addClass("past");
        // Check if present
        } else if(currentHour === blockTime){
            $(this).removeClass("future")
            $(this).addClass("present");
        // Check if future
        } else {
            $(this).removeClass("past")
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });
};

// On button click, save textarea content to localStorage

currentTime();
});
