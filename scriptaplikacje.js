function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('DOMContentLoaded', function () {
    var tiles = document.getElementsByClassName('tile');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.add('random-color');
        tiles[i].style.backgroundColor = getRandomColor();
    }
});

function animateTile(element) {
    element.classList.add('clicked');

    element.style.backgroundColor = getRandomColor();

    setTimeout(function () {
        element.classList.remove('clicked');
    }, 300);
}
