function animateTile(tile) {
    tile.classList.add('clicked');
    setTimeout(function () {
        tile.classList.remove('clicked');
    }, 300);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function animateTile(element) {
    element.classList.add('clicked');

    element.style.backgroundColor = getRandomColor();

    setTimeout(function () {
        element.classList.remove('clicked');
    }, 300);
}
