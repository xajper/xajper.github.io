function animateTile(tile) {
    tile.classList.add('clicked');
    setTimeout(function () {
        tile.classList.remove('clicked');
    }, 300);
}
