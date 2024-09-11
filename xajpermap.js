function blokujMysz(event) {
    if (event.button === 2 || event.which === 3) {
        event.preventDefault();
    }
}
  
function blokujKlawisze(event) {
    if (event.key === 'F12') {
        event.preventDefault();
    }
  
    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
    }
}
  
document.addEventListener('mousedown', blokujMysz);
  
document.addEventListener('keydown', blokujKlawisze);

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdownsort-toggle');
    const dropdownContainer = document.querySelector('.dropdownsort');
    const toggleIcon = dropdownToggle.querySelector('.toggle-icon');

    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownContainer.classList.toggle('active');
        toggleIcon.classList.toggle('fa-chevron-down');
        toggleIcon.classList.toggle('fa-chevron-down');
    });

    document.addEventListener('click', function(e) {
        if (!dropdownContainer.contains(e.target) && !dropdownToggle.contains(e.target)) {
            dropdownContainer.classList.remove('active');
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-down');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContainer = document.querySelector('.dropdown');
    const toggleIcon = dropdownToggle.querySelector('.toggle-icon');

    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownContainer.classList.toggle('active');
        toggleIcon.classList.toggle('fa-chevron-down');
        toggleIcon.classList.toggle('fa-chevron-down');
    });

    document.addEventListener('click', function(e) {
        if (!dropdownContainer.contains(e.target) && !dropdownToggle.contains(e.target)) {
            dropdownContainer.classList.remove('active');
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-down');
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const links = [
        "mapa/partyactivities.html",
        "mapa/ostatniatwierdza.html",
        "mapa/clickerevolved.html",
        "mapa/twojarestauracja.html",
        "mapa/agentsztajger.html"
    ];

    document.getElementById('losowa-link').addEventListener('click', function (event) {
        event.preventDefault();

        const randomLink = links[Math.floor(Math.random() * links.length)];

        window.location.href = randomLink;
    });
});
