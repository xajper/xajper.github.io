function updateClock(elementId, timeZone, label) {
    const clockElement = document.getElementById(elementId);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timeZone,
        timeZoneName: 'short'
    };

    const currentTime = new Date();
    const formattedTime = new Intl.DateTimeFormat('pl-PL', options).format(currentTime);
    clockElement.textContent = `${label}: ${formattedTime}`;
}

function updateAllClocks() {
    // Polska
    updateClock('polskaClock', 'Europe/Warsaw', 'Polska');

    // Afryka
    updateClock('johannesburgClock', 'Africa/Johannesburg', 'Johannesburg');
    updateClock('nairobiClock', 'Africa/Nairobi', 'Nairobi');

    // Azja
    updateClock('beijingClock', 'Asia/Shanghai', 'Pekin');
    updateClock('tokyoClock', 'Asia/Tokyo', 'Tokio');
    updateClock('dubaiClock', 'Asia/Dubai', 'Dubaj');

    // Europa
    updateClock('londonClock', 'Europe/London', 'Londyn');
    updateClock('parisClock', 'Europe/Paris', 'Paryż');
    updateClock('berlinClock', 'Europe/Berlin', 'Berlin');

    // Ameryka Północna
    updateClock('newYorkClock', 'America/New_York', 'Nowy Jork');
    updateClock('torontoClock', 'America/Toronto', 'Toronto');
    updateClock('mexicoCityClock', 'America/Mexico_City', 'Miasto Meksyk');

    // Ameryka Południowa
    updateClock('saoPauloClock', 'America/Sao_Paulo', 'São Paulo');
    updateClock('buenosAiresClock', 'America/Argentina/Buenos_Aires', 'Buenos Aires');

    // Oceania
    updateClock('sydneyClock', 'Australia/Sydney', 'Sydney');
    updateClock('aucklandClock', 'Pacific/Auckland', 'Auckland');
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.addEventListener('DOMContentLoaded', function() {
    openTab({currentTarget: document.querySelector('.tablink')}, 'polska');
    setInterval(updateAllClocks, 1000);
});
