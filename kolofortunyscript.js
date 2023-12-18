let customValuesArray = [];

function addValue() {
    const customValuesInput = document.getElementById('customValues');
    const menu = document.getElementById('menu');
    const resultDiv = document.getElementById('result');
    const wheel = document.getElementById('wheel');

    const newValues = customValuesInput.value.split(',').map(value => value.trim());

    if (newValues.length > 0 && newValues[0] !== '') {
        customValuesArray = [...customValuesArray, ...newValues];

        // Dodaj nową wartość do menu
        newValues.forEach(newValue => {
            const valueTag = document.createElement('span');
            valueTag.className = 'menu-value';
            valueTag.textContent = newValue;
            valueTag.onclick = function() {
                removeValue(newValue);
            };
            menu.insertBefore(valueTag, customValuesInput);
        });

        customValuesInput.value = ''; // Wyczyść pole po dodaniu wartości

        // Usuń stare sekcje koła
        const existingSections = document.querySelectorAll('.wheel-section');
        existingSections.forEach(section => section.remove());

        // Dodaj nowe sekcje do koła
        const angle = 360 / customValuesArray.length;
        let rotation = 0;

        for (let i = 0; i < customValuesArray.length; i++) {
            const section = document.createElement('div');
            section.className = 'wheel-section';
            section.style.background = getRandomColor();
            section.style.transform = `rotate(${rotation}deg)`;
            section.setAttribute('data-value', customValuesArray[i]); // Dodaj atrybut z wartością
            wheel.appendChild(section);

            rotation += angle;
        }

        resultDiv.innerText = ''; // Wyczyść wynik po dodaniu nowej wartości
    } else {
        resultDiv.innerText = 'Proszę wprowadzić co najmniej jedną wartość przed dodaniem do menu.';
    }
}

function removeValue(value) {
    const index = customValuesArray.indexOf(value);
    if (index !== -1) {
        customValuesArray.splice(index, 1);

        // Usuń tag z menu
        const menuValues = document.querySelectorAll('.menu-value');
        menuValues[index].remove();

        // Usuń stare sekcje koła
        const existingSections = document.querySelectorAll('.wheel-section');
        existingSections.forEach(section => section.remove());

        // Dodaj nowe sekcje do koła
        const wheel = document.getElementById('wheel');
        const angle = 360 / customValuesArray.length;
        let rotation = 0;

        for (let i = 0; i < customValuesArray.length; i++) {
            const section = document.createElement('div');
            section.className = 'wheel-section';
            section.style.background = getRandomColor();
            section.style.transform = `rotate(${rotation}deg)`;
            section.setAttribute('data-value', customValuesArray[i]); // Dodaj atrybut z wartością
            wheel.appendChild(section);

            rotation += angle;
        }
    }
}

function spinWheel() {
    const resultDiv = document.getElementById('result');
    const wheel = document.getElementById('wheel');
    const pointer = document.getElementById('pointer');
    const confettiContainer = document.getElementById('confetti-container');

    if (customValuesArray.length < 2) {
        resultDiv.innerText = 'Proszę dodać co najmniej dwie wartości.';
        return;
    }

    // Wylosuj jedną z wartości
    const randomIndex = Math.floor(Math.random() * customValuesArray.length);
    const selectedValue = customValuesArray[randomIndex];

    // Oblicz kąt obrotu dla wylosowanej wartości
    const angle = 360 / customValuesArray.length;
    const rotation = randomIndex * angle + 720; // Dodaj 720 stopni, aby wykonać pełny obrót przed zatrzymaniem

    // Zaktualizuj wynik
    resultDiv.innerText = `Wylosowano: ${selectedValue}`;

    // Zatrzymaj animację kręcenia kołem
    wheel.style.animation = 'none';

    // Zaktualizuj wskaźnik
    pointer.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

    // Dodaj animację kręcenia kołem po pewnym czasie (100ms opóźnienia)
    setTimeout(() => {
        wheel.style.animation = 'spin 3s ease-out';
        // Dodaj animację konfetti
        for (let i = 0; i < 20; i++) {
            createConfetti();
        }
    }, 100);
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 2 + 1) + 's'; // Różne prędkości
    confettiContainer.appendChild(confetti);

    // Usuń konfetti po zakończeniu animacji
    confetti.addEventListener('animationend', () => {
        confetti.remove();
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
