const $counters = document.querySelectorAll('.counter');

document.getElementById('team1').addEventListener('input', function() {
    this.value = this.value.toUpperCase(); // Zamień na wielkie litery
});

document.getElementById('team2').addEventListener('input', function() {
    this.value = this.value.toUpperCase(); // Zamień na wielkie litery
});

function blokujMysz(event) {
    if (event.button === 2 || event.which === 3) {

      event.preventDefault();
    }
  }
  
function celebrate() {
    const confettiSettings = { target: 'my-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    const celebrationContainer = document.querySelector('.containersub');
    celebrationContainer.innerHTML += '<div class="emoji">🎉</div>';
}

$counters.forEach(($counter) => {
    $counter.innerText = '0';
    const updateCounter = () => {
        const target = Number($counter.getAttribute('data-target'));
        const count = Number($counter.innerText);
        const increment = target / 200;
        if (count < target) {
            $counter.innerText = `${Math.ceil(count + increment)}`;
            setTimeout(updateCounter, 20);
        } else {
            $counter.innerText = target;

            if (target >= 1000) {
                celebrate();
            }
        }
    };
    updateCounter();
});
