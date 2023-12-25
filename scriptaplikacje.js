function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Funkcja do animowania kafelka
function animateTile(element) {
    element.classList.add('clicked');

    // Usuń poprzednią klasę 'random-color' i dodaj nowy losowy kolor
    element.classList.remove('random-color');
    element.style.backgroundColor = getRandomColor();

    setTimeout(function () {
        element.classList.remove('clicked');
    }, 300);
}

// Przypisz klasę 'random-color' do każdego kafelka przy ładowaniu strony
document.addEventListener('DOMContentLoaded', function () {
    var tiles = document.getElementsByClassName('tile');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.add('random-color');
    }
});
