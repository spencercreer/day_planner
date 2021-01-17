$(document).ready(function() {

// Get items from localStorage for each hour
function init(){
    let dt = new Date();
    let todaysDate = `${
      dt.getMonth() + 1
    } / ${dt.getDate()} / ${dt.getFullYear()}`;

    var storedDate = localStorage.getItem("today");
    if(!localStorage.getItem("Style")){
        localStorage.setItem("Style","style.css")
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
    let todaysDate = `${
      dt.getMonth() + 1
    } / ${dt.getDate()} / ${dt.getFullYear()}`;

    $("#currentDay").text(todaysDate);
    // let currentHour = dt.getHours();
    let currentHour = 14;
    let currentTime = dt.toLocaleTimeString();
    document.getElementById("currentTime").innerHTML = currentTime;

    $("textarea").each(function(){
        var blockTime = parseInt($(this).attr("id"));

        // Check if past
        if(blockTime < currentHour){
            $(this).removeClass("present")
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
    if(style === "style.css"){
        $("#pagestyle").attr("href","dark_style.css");
        localStorage.setItem("Style", "dark_style.css");
    } else{
        $("#pagestyle").attr("href","style.css");
        localStorage.setItem("Style", "style.css");
    }
})

currentTime();
init();
});
