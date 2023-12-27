function updateWorldClock() {
    const worldClockElement = document.getElementById("worldClock");
    const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const months = [
        'Stycznia', 'Lutego', 'Marca', 'Kwietnia', 'Maja', 'Czerwca',
        'Lipca', 'Sierpnia', 'Września', 'Października', 'Listopada', 'Grudnia'
    ];

    const currentTime = new Date();
    const dayOfWeek = daysOfWeek[currentTime.getDay()];
    const day = currentTime.getDate();
    const month = months[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    const formattedTime = `${dayOfWeek}, ${day} ${month} ${year} - ${hours}:${minutes}:${seconds}`;
    worldClockElement.textContent = formattedTime;
}

setInterval(updateWorldClock, 1000);
