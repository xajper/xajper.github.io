document.addEventListener("DOMContentLoaded", function() {
    startDownload();
});

function startDownload() {
    var progressBar = document.querySelector('.progress .bar span');
    var completionText = document.querySelector('.progress .completion');
    var doneIcon = document.getElementById("done");

    var progress = 0;
    var intervalId = setInterval(function () {
        progress += 1;
        progressBar.style.width = progress + '%';
        completionText.innerHTML = progress + '%';

        if (progress >= 100) {
            clearInterval(intervalId);
            doneIcon.style.display = 'block';
            setTimeout(function () {
                window.location.href = 'mapy.html';
            }, 1000);
        }
    }, 50);
}