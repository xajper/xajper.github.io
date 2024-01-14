document.addEventListener("DOMContentLoaded", function () {
    // Get the current date
    const currentDate = new Date();
    
    // Format the date as "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Set the current date to the data-date attribute
    document.getElementById("wg-api-football-fixtures").setAttribute("data-date", formattedDate);

    // Load the football widget script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://widgets.api-sports.io/football/1.1.8/widget.js";
    document.body.appendChild(script);
});