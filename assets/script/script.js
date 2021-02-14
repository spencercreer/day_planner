$(document).ready(function() {
// Month and weekday array
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var time = ["6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm"]

function init(){
    // Get date using JavaScript date methods
    let dt = new Date();
    let todaysDate = `${
      dt.getMonth() + 1
    } / ${dt.getDate()} / ${dt.getFullYear()}`;


    // Create timeblocks using template literals
    for (let i = 0; i < time.length; i++) {
        const timeblock = `
        <div class="row">
            <div class="col-sm-2 hour">${time[i]}</div>
            <textarea class="col-sm-8" id="${6+i}" rows="2"></textarea>
            <button class="col-sm-2 saveBtn far fa-save"></button>
        </div>
        `;
        $("#time-blocks").append(timeblock);
    }

    // Get items from localStorage for each hour
    var storedDate = localStorage.getItem("today");
    if(!localStorage.getItem("Style")){
        localStorage.setItem("Style","assets/style/style.css")
    }
    var storedStyle = localStorage.getItem("Style");

    $("#pagestyle").attr("href",storedStyle);
    
    // if storedDate equals todaysDate, get all localStorage elements and load into textarea value
    if(storedDate === todaysDate){
        $("textarea").each(function(){
            let noteHour = $(this).prev().text();
            $(this).val(localStorage.getItem(noteHour))
        })
    // else clear all localStorage and store todaysDate
    } else{
        localStorage.clear();
        localStorage.setItem("today", todaysDate);
    }
}

setInterval(currentTime,1000)

// Get current time update time blocks
function currentTime(){
    let dt = new Date();
    let day = dt.getDate();
    let weekDay = weekdays[dt.getDay()]
    let month = months[dt.getMonth()];
    let year = dt.getFullYear();
    let todaysDate = day + " " + month + " " + year;

    $("#currentDay").text(todaysDate);
    $("#weekDay").text(weekDay);

    let currentHour = dt.getHours();
    let currentTime = dt.toLocaleTimeString();
    document.getElementById("currentTime").innerHTML = currentTime;

    $("textarea").each(function(){
        var blockTime = parseInt($(this).attr("id"));

        // Check if past
        if(blockTime < currentHour){
            $(this).removeClass("future");
            $(this).removeClass("present");
            $(this).addClass("past");
        // Check if present
        } else if(currentHour === blockTime){
            $(this).removeClass("future");
            $(this).addClass("present");
        // Check if future
        } else {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });
};

// On button click, save textarea content to localStorage
$(".saveBtn").on("click", function(){
    let notes = $(this).prev().val();
    let noteHour = $(this).siblings(".hour").text()
    localStorage.setItem(noteHour, notes);
});

// On change style button click, change style
$(".swapStyle").on("click",function(){
    let style = $("#pagestyle").attr("href")
    if(style === "assets/style/style.css"){
        $("#pagestyle").attr("href","assets/style/dark_style.css");
        localStorage.setItem("Style", "assets/style/dark_style.css");
    } else{
        $("#pagestyle").attr("href","assets/style/style.css");
        localStorage.setItem("Style", "assets/style/style.css");
    }
})

currentTime();
init();
});
