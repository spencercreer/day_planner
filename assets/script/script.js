$(document).ready(function () {
    let buttonText = $(".swapStyle")

    function main() {
        setInterval(currentTime, 1000)
        displayTimeBlocks()
        getLocalStorageStyle()
        getLocalStorageText()
    }

    // Get current time update time blocks
    function currentTime() {
        displayDate()
        updateTimeBlocks()
    };

    function displayDate() {
               // Get date, day, and time using moment.js
               let todaysDate = moment().format('MMMM Do YYYY');
               let weekDay = moment().format('dddd')
               let currentTime = moment().format('LT');
       
               $("#currentTime").text(currentTime);
               $("#currentDay").text(todaysDate);
               $("#weekDay").text(weekDay);
    }

    function displayTimeBlocks() {
        let time = ["6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm"]
        // Create timeblocks using template literals
        for (let i = 0; i < time.length; i++) {
            const timeblock = `
            <div class="row">
                <div class="col-2 hour">${time[i]}</div>
                <textarea class="col-8" id="${6 + i}" rows="2"></textarea>
                <button class="col-2 saveBtn far fa-save"></button>
            </div>
            `;
            $("#time-blocks").append(timeblock);
        }
    }

    function updateTimeBlocks() {
        $("textarea").each(function () {
            let currentHour = moment().hour();
            let blockTime = parseInt($(this).attr("id"));

            // Check if past
            if (blockTime < currentHour) {
                $(this).addClass("past");
                $(this).removeClass("future");
                $(this).removeClass("present");
                // Check if present
            } else if (currentHour === blockTime) {
                $(this).removeClass("past");
                $(this).addClass("present");
                $(this).removeClass("future");
                // Check if future
            } else {
                $(this).removeClass("past");
                $(this).removeClass("present");
                $(this).addClass("future");
            }
        });
    }

    function getLocalStorageStyle() {
        let storedStyle = localStorage.getItem("Style");
        // Get items from localStorage for each hour
        if (!localStorage.getItem("Style")) {
            localStorage.setItem("Style", "assets/style/style.css")
        }
        if (storedStyle === "assets/style/style.css") {
            buttonText.text("Light Mode")
        } else {
            buttonText.text("Dark Mode")
        }

        $("#pagestyle").attr("href", storedStyle);
    }

    function getLocalStorageText() {
        // if storedDate equals todaysDate, get all localStorage elements and load into textarea value
        let storedDate = localStorage.getItem("today");
        let todaysDate = moment().format('MMMM Do YYYY');
        if (storedDate === todaysDate) {
            $("textarea").each(function () {
                let noteHour = $(this).prev().text();
                $(this).val(localStorage.getItem(noteHour))
            })
        } else {
            // clear all localStorage and store todaysDate
            localStorage.clear();
            localStorage.setItem("today", todaysDate);
        }
    }

    // On button click, save textarea content to localStorage
    $(".saveBtn").on("click", function () {
        let notes = $(this).prev().val();
        let noteHour = $(this).siblings(".hour").text()
        localStorage.setItem(noteHour, notes);
    });

    // On change style button click, change style
    $(".swapStyle").on("click", function () {
        let style = $("#pagestyle").attr("href")
        if (style === "assets/style/style.css") {
            $("#pagestyle").attr("href", "assets/style/dark_style.css");
            buttonText.text("Dark Mode")
            localStorage.setItem("Style", "assets/style/dark_style.css");
        } else {
            $("#pagestyle").attr("href", "assets/style/style.css");
            buttonText.text("Light Mode")
            localStorage.setItem("Style", "assets/style/style.css");
        }
    })

    main();
});