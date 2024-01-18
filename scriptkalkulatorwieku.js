function calculateAge() {
    const birthdateInput = document.getElementById('birthdate');
    const resultDiv = document.getElementById('result');

    const birthdate = new Date(birthdateInput.value);
    const today = new Date();

    const ageInMilliseconds = today - birthdate;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    const ageInMonths = ageInDays / 30.44; 
    const ageInYears = ageInDays / 365.25; 

    const years = Math.floor(ageInYears);
    const months = Math.floor((ageInYears - years) * 12);
    const days = Math.floor((ageInDays - (years * 365.25 + months * (365.25 / 12))));

    const resultMessage = `Twój wiek to ${years} lat, ${months} miesięcy i ${days} dni.`;
    resultDiv.innerText = resultMessage;

    
    const isBirthday = birthdate.getDate() === today.getDate() && birthdate.getMonth() === today.getMonth();
    if (isBirthday) {
        playConfettiAnimation();
    }
}

function playConfettiAnimation() {
    const confettiContainer = document.getElementById('confetti-container');
    const confettiCount = 100;
    const confettiColors = ['#ff0000', '#00ff00', '#0000ff'];

    for (let i = 0; i < confettiCount; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti';
        confettiPiece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        confettiContainer.appendChild(confettiPiece);

        animateConfetti(confettiPiece);
    }
}

function animateConfetti(confettiPiece) {
    const angle = Math.random() * 360;
    const velocity = Math.random() * 20 + 5;

    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity;

    confettiPiece.style.animation = `confetti-fall 3s linear infinite`;
    confettiPiece.style.transform = `translate(${x}vw, ${-y}vh) rotate(${angle}deg)`;

    setTimeout(() => {
        confettiPiece.remove();
    }, 3000);
}
