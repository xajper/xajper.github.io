document.addEventListener("DOMContentLoaded", function () {

    const currentDate = new Date();

    const formattedDate = currentDate.toISOString().split('T')[0];

    document.getElementById("wg-api-football-fixtures").setAttribute("data-date", formattedDate);

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://widgets.api-sports.io/football/1.1.8/widget.js";
    document.body.appendChild(script);
});
