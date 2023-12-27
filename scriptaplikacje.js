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

document.addEventListener('DOMContentLoaded', function () {
    addMouseTrailEffect();
});

function addMouseTrailEffect() {
    document.addEventListener('mousemove', function (e) {
        createTrail(e);
    });
}

function createTrail(e) {
    var trail = document.createElement('div');
    trail.classList.add('trail');
    document.body.appendChild(trail);

    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';

    setTimeout(function () {
        document.body.removeChild(trail);
    }, 500);
}
