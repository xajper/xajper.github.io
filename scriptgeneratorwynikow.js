const resultContainer = document.getElementById('result');
var matchData = {
    team1: {
        name: "",
        players: [],
        possession: 50,
        shots: 0,
        yellowCards: 0,
        redCards: 0,
        score: 0,
    },
    team2: {
        name: "",
        players: [],
        possession: 50,
        shots: 0,
        yellowCards: 0,
        redCards: 0,
        score: 0,
    },
    location: "",
    score: { team1: 0, team2: 0 },
    events: [],
    currentMinute: 0,
    currentSecond: 0,
    intervalId: null,
};

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
  
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

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
  
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});
  
document.addEventListener('mousedown', blokujMysz);

function initializePlayers(team) {
    team.players = []; // Wyczyść listę zawodników

    // Dodaj bramkarza
    team.players.push({
        name: "Bramkarz",
        position: "Bramkarz",
        yellowCards: 0,
        redCards: 0,
        goals: 0,
        injury: false, // Ustal, czy zawodnik ma kontuzję
        isRedCarded: false // Ustal, czy zawodnik ma czerwoną kartkę
    });

    // Dodaj obrońców
    for (let i = 1; i <= 4; i++) {
        team.players.push({
            name: `Obrońca ${i}`,
            position: "Obrońca",
            yellowCards: 0,
            redCards: 0,
            goals: 0,
            injury: false,
            isRedCarded: false
        });
    }

    // Dodaj pomocników
    for (let i = 1; i <= 4; i++) {
        team.players.push({
            name: `Pomocnik ${i}`,
            position: "Pomocnik",
            yellowCards: 0,
            redCards: 0,
            goals: 0,
            injury: false,
            isRedCarded: false
        });
    }

    // Dodaj napastników
    for (let i = 1; i <= 2; i++) {
        team.players.push({
            name: `Napastnik ${i}`,
            position: "Napastnik",
            yellowCards: 0,
            redCards: 0,
            goals: 0,
            injury: false,
            isRedCarded: false
        });
    }
}

function updateStatusIndicators() {
    var breakStatus = document.getElementById("break-status");
    var inProgressStatus = document.getElementById("in-progress-status");
    var finishedStatus = document.getElementById("finished-status");
    var brakStatus = document.getElementById("brak-status");

    if (matchData.currentMinute < 45) {
        brakStatus.style.display = "block";
        breakStatus.style.display = "none";
        inProgressStatus.style.display = "none";
        finishedStatus.style.display = "none";
    } else if (matchData.currentMinute == 45) {
        brakStatus.style.display = "none";
        breakStatus.style.display = "block";
        inProgressStatus.style.display = "none";
        finishedStatus.style.display = "none";
    } else if (matchData.currentMinute > 45 && matchData.currentMinute < 90) {
        brakStatus.style.display = "none";
        breakStatus.style.display = "none";
        inProgressStatus.style.display = "block";
        finishedStatus.style.display = "none";
    } else if (matchData.currentMinute >= 90) {
        brakStatus.style.display = "none";
        breakStatus.style.display = "none";
        inProgressStatus.style.display = "none";
        finishedStatus.style.display = "block";
    }
}

function generateResult() {
    matchData.team1.name = document.getElementById("team1").value;
    matchData.team2.name = document.getElementById("team2").value;

    // Inicjalizacja składu drużyn
    initializePlayers(matchData.team1);
    initializePlayers(matchData.team2);

    var resultContainer = document.getElementById("result");

    // Rozpocznij aktualizacje wyniku i komentarzy co sekundę
    matchData.intervalId = setInterval(updateResult, 1000);

    // Ręczne wywołanie funkcji updateResult na starcie
    updateResult();
}

function updateResult() {
    matchData.currentMinute += 1;
    simulateEvent(); // Move the simulateEvent call here

    var eventsContainer = document.getElementById("events");

    if (matchData.currentMinute >= 90) {
        clearInterval(matchData.intervalId);
        eventsContainer.innerHTML += `<p>Końcowy gwizdek! Mecz zakończony!</p>`;
    } else if (matchData.currentMinute == 45) {
        eventsContainer.innerHTML += `<p>Koniec pierwszej połowy! Rozpoczęcie przerwy.</p>`;
    } else if (matchData.currentMinute > 45 && matchData.currentMinute < 90) {
        eventsContainer.innerHTML += `<p>Mecz w trakcie drugiej połowy!'</p>`;
    } else if (matchData.currentMinute >= 90) {
        eventsContainer.innerHTML += `<p>Koniec meczu!'</p>`;
    }

    displayEvents();
    updateStats();
    updateStatusIndicators();
    displayResult();
    displayPlayers(matchData.team1, 'team1-players');
    displayPlayers(matchData.team2, 'team2-players');
    checkGameStatus();
}

function displayResult() {
    var resultContainer = document.getElementById("result");
    var statusIndicators = document.querySelector(".status-indicators");

    // Sprawdzanie, czy matchData jest prawidłowe
    console.log("matchData:", matchData);

    document.getElementById("brak-status").style.display = "block";
    document.getElementById("break-status").style.display = "none";
    document.getElementById("finished-status").style.display = "none";
    document.getElementById("in-progress-status").style.display = "none";

    resultContainer.innerHTML = `<h2><img src="szczegoly.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Szczegóły:</h2>`;
    resultContainer.innerHTML += `<p><img src="mecz.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Mecz: ${matchData.team1.name} - ${matchData.team2.name}</p>`;
    resultContainer.innerHTML += `<p><img src="wynik.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Wynik: ${matchData.score.team1}:${matchData.score.team2} (${matchData.currentMinute}') - ${getStatusText()}</p>`;

    // Wyświetlanie wskaźników statusu
    statusIndicators.style.display = "flex";
}

function getStatusText() {
    var breakStatus = document.getElementById("break-status");
    var inProgressStatus = document.getElementById("in-progress-status");
    var finishedStatus = document.getElementById("finished-status");
    var brakStatus = document.getElementById("brak-status");
    if (matchData.currentMinute < 45) {
        return "Mecz w trakcie pierwszej połowy!";
    } else if (matchData.currentMinute == 45) {
        return "Przerwa!";
    } else if (matchData.currentMinute > 45 && matchData.currentMinute < 90) {
        brakStatus.style.display = "none";
        breakStatus.style.display = "none";
        inProgressStatus.style.display = "block";
        finishedStatus.style.display = "none";
        return `Mecz w trakcie drugiej połowy!`;
    } else if (matchData.currentMinute >= 90) {
        brakStatus.style.display = "none";
        breakStatus.style.display = "none";
        inProgressStatus.style.display = "none";
        finishedStatus.style.display = "block";
        return `Koniec meczu!`;
    }
}

function checkGameStatus() {
    var eventsContainer = document.getElementById("events");

    if (matchData.currentMinute < 45) {
        hideAllStatus();
        document.getElementById("in-progress-status").style.display = "block";
    } else if (matchData.currentMinute == 45) {
        clearInterval(matchData.intervalId);
        eventsContainer.innerHTML += `<p>Koniec pierwszej połowy!</p>`;
        hideAllStatus();
        document.getElementById("break-status").style.display = "block";
    
        eventsContainer.innerHTML += `<p>Sędzia zaprasza piłkarzy do szatni...</p>`;
        setTimeout(() => {
            eventsContainer.innerHTML += `<p>Sędzia wznawia spotkanie...</p>`;
            matchData.intervalId = setInterval(updateResult, 1000);
            hideAllStatus();
            document.getElementById("in-progress-status").style.display = "block";
        }, 2000);

    } else if (matchData.currentMinute > 90) {
        clearInterval(matchData.intervalId);
        eventsContainer.innerHTML += `<p>Końcowy gwizdek! Mecz zakończony!</p>`;
        hideAllStatus();
        document.getElementById("finished-status").style.display = "block";
        displayResult();
        displayEvents();
        displayStats();
    }
}

function hideAllStatus() {
    document.getElementById("brak-status").style.display = "none";
    document.getElementById("break-status").style.display = "none";
    document.getElementById("finished-status").style.display = "none";
    document.getElementById("in-progress-status").style.display = "none";
}

function updateStats() {
    document.getElementById("possession-team1").innerText = matchData.team1.possession.toFixed(1);
    document.getElementById("possession-team2").innerText = matchData.team2.possession.toFixed(1);
    document.getElementById("yellow-cards-team1").innerText = matchData.team1.yellowCards;
    document.getElementById("yellow-cards-team2").innerText = matchData.team2.yellowCards;
    document.getElementById("red-cards-team1").innerText = matchData.team1.redCards;
    document.getElementById("red-cards-team2").innerText = matchData.team2.redCards;
    document.getElementById("shots-team1").innerText = matchData.team1.shots;
    document.getElementById("shots-team2").innerText = matchData.team2.shots;
}

function createCardImages(cardArray, cardType, player, teamId) {
    var cardImages = document.createElement("span");
    
    cardArray[`team${teamId}`].forEach(card => {
        if (card.name === player.name) {
            var cardImage = document.createElement("img");
            cardImage.src = `${cardType}_card.png`;
            cardImage.alt = cardType === 'yellow' ? "Żółta kartka" : "Czerwona kartka";
            
            // Ustaw mniejsze wymiary obrazka
            cardImage.style.width = "18px";
            cardImage.style.height = "18px";
            
            // Dodaj lekki odstęp między obrazkami kartek
            cardImage.style.marginLeft = "5px";
            
            cardImage.style.verticalAlign = "middle";
            
            cardImages.appendChild(cardImage);
        }
    });

    return cardImages;
}

function displayPlayers(team, containerId) {
    let container = document.getElementById(containerId);

    if (!container) {
        console.error(`Nie znaleziono elementu o ID ${containerId}`);
        return;
    }

    container.innerHTML = ''; // Wyczyść zawartość kontenera

    team.players.forEach(player => {
        let playerItem = document.createElement('li');

        // Aktualizacja wyświetlania zawodnika
        if (player.isRedCarded) {
            // Przekreślenie zawodnika z czerwoną kartką
            playerItem.innerHTML = `<s>${player.name}</s>`; // Tylko przekreślenie
        } else {
            // Aktualizacja wyświetlania imienia zawodnika
            playerItem.innerHTML = `${player.name}`;
            if (player.injury) {
                playerItem.innerHTML = `<s>${player.name} (${player.position})</s> <img src="injury_icon.png" style="width: 20px; height: 20px;">`; // Przekreślenie i znacznik kontuzji
            }
        }

        // Wyświetl gole
        for (let i = 0; i < player.goals; i++) {
            let goalImg = document.createElement('img');
            goalImg.src = 'zdobytygol.png'; // Upewnij się, że to jest właściwy obrazek
            goalImg.style.width = '20px';
            goalImg.style.height = '20px';
            playerItem.appendChild(goalImg);
        }

        // Wyświetl żółte kartki
        for (let i = 0; i < player.yellowCards; i++) {
            let yellowCardImg = document.createElement('img');
            yellowCardImg.src = 'yellow_card.png';
            yellowCardImg.style.width = '20px';
            yellowCardImg.style.height = '20px';
            playerItem.appendChild(yellowCardImg);
        }

        // Wyświetl czerwone kartki
        if (player.isRedCarded) {
            let redCardImg = document.createElement('img');
            redCardImg.src = 'red_card.png';
            redCardImg.style.width = '20px';
            redCardImg.style.height = '20px';
            playerItem.appendChild(redCardImg);
        }

        container.appendChild(playerItem);
    });
}

function displayEvents() {
    var eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = `<h2><img src="events.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Aktualne wydarzenia:</h2>`;

    matchData.events.forEach((eventData) => {
        var eventMinute = eventData.minute || matchData.currentMinute; // Użyj minute z obiektu zdarzenia lub aktualną minutę
        var formattedTime = formatTime(eventMinute);
        eventsContainer.innerHTML += `<p>${formattedTime} ${eventData.event}</p>`;
    });
}

function simulateEvent() {
    // Sprawdź, czy mecz jest zakończony
    if (matchData.currentMinute > 90) {
        // Mecz zakończony, nie dodawaj nowych zdarzeń
        return;
    }

    // Prawdopodobieństwa
    const probabilityGoal = 0.05;
    const probabilityYellowCard = 0.04;
    const probabilityRedCard = 0.02;
    const probabilityInjury = 0.03;
    const probabilityShot = 0.20;
    const probabilityNeutral = 0.66;
    // Suma wszystkich prawdopodobieństw powinna wynosić 1

    var players = ["Napastnik 1", "Napastnik 2", "Pomocnik 1", "Pomocnik 2", "Pomocnik 3", "Pomocnik 4", "Obrońca 1", "Obrońca 2", "Obrońca 3", "Obrońca 4", "Bramkarz"];
    var randomPlayerIndex = Math.floor(Math.random() * players.length);
    var randomPlayer = players[randomPlayerIndex];

    var team1Strength = 0.8;  // Przykładowa siła drużyny 1
    var team2Strength = 0.6;  // Przykładowa siła drużyny 2

    var scoringTeam = Math.random() < team1Strength / (team1Strength + team2Strength) ? matchData.team1.name : matchData.team2.name;

    // Zaktualizuj statystyki posiadania piłki
    updatePossession();

    // Losowanie zdarzenia na podstawie prawdopodobieństw
    var randomNum = Math.random();
    var randomEvent = '';

    // Sprawdź, co się wydarzy
    if (randomNum < probabilityGoal) {
        // Wybór zdarzenia związanego z bramką
        const goalEvents = [
            `Bramka! ${randomPlayer} <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
            `Karny! Bramka! ${randomPlayer} <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
            `Strzał zza pola karnego! ${randomPlayer} <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
            `${randomPlayer} zdecydował się na strzał z dystansu, i piłka ląduje w siatce! Fantastyczny gol <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`
        ];
        randomEvent = goalEvents[Math.floor(Math.random() * goalEvents.length)];
        assignGoal(randomPlayer, scoringTeam); // Wywołanie funkcji do przydzielenia gola
        scoringTeam.score += 1; // Zwiększ wynik drużyny

        // Zwiększanie statystyk dla odpowiedniej drużyny
        if (scoringTeam === matchData.team1.name) {
            matchData.score.team1 += 1;
            matchData.team1.shots += 1; // Zwiększ liczbę strzałów dla team1
        } else {
            matchData.score.team2 += 1;
            matchData.team2.shots += 1; // Zwiększ liczbę strzałów dla team2
        }

    } else if (randomNum < probabilityGoal + probabilityYellowCard) {
        // Wybór zdarzenia związanego z żółtą kartką
        const yellowCardEvents = [
            `Żółta kartka dla ${randomPlayer}! <img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> ŻÓŁTA KARTKA (${scoringTeam})`,
            `Sędzia pokazuje żółtą kartkę ${randomPlayer}! <img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> ŻÓŁTA KARTKA (${scoringTeam})`,
            `${randomPlayer} dostaje żółtą kartkę za faul! <img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> ŻÓŁTA KARTKA (${scoringTeam})`
        ];
        randomEvent = yellowCardEvents[Math.floor(Math.random() * yellowCardEvents.length)];
        assignCard('yellow', randomPlayer, scoringTeam); // Przypisz żółtą kartkę

        // Zwiększanie statystyk dla odpowiedniej drużyny
        if (scoringTeam === matchData.team1.name) {
            matchData.team1.yellowCards += 1; // Zwiększ liczbę żółtych kartek dla team1
        } else {
            matchData.team2.yellowCards += 1; // Zwiększ liczbę żółtych kartek dla team2
        }

    } else if (randomNum < probabilityGoal + probabilityYellowCard + probabilityRedCard) {
        // Wybór zdarzenia związanego z czerwoną kartką
        const redCardEvents = [
            `Czerwona kartka dla ${randomPlayer}! <img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> CZERWONA KARTKA (${scoringTeam})`,
            `Wykluczenie dla ${randomPlayer}! <img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> CZERWONA KARTKA (${scoringTeam})`,
            `Sędzia pokazuje czerwoną kartkę ${randomPlayer}! <img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> CZERWONA KARTKA (${scoringTeam})`
        ];
        randomEvent = redCardEvents[Math.floor(Math.random() * redCardEvents.length)];
        assignCard('red', randomPlayer, scoringTeam); // Przypisz czerwoną kartkę

        // Zwiększanie statystyk dla odpowiedniej drużyny
        if (scoringTeam === matchData.team1.name) {
            matchData.team1.redCards += 1; // Zwiększ liczbę czerwonych kartek dla team1
        } else {
            matchData.team2.redCards += 1; // Zwiększ liczbę czerwonych kartek dla team2
        }

    } else if (randomNum < probabilityGoal + probabilityYellowCard + probabilityRedCard + probabilityInjury) {
        // Wybór zdarzenia związanego z kontuzją
        const injuryEvents = [
            `Kontuzja: ${randomPlayer} opuszcza boisko.`,
            `Kontuzja: ${randomPlayer} zmuszony do zmiany.`,
            `Kontuzja: ${randomPlayer} nie może kontynuować gry.`
        ];
        randomEvent = injuryEvents[Math.floor(Math.random() * injuryEvents.length)];
        randomPlayer.injury = true; // Zaznacz kontuzję zawodnika

    } else if (randomNum < probabilityGoal + probabilityYellowCard + probabilityRedCard + probabilityInjury + probabilityShot) {
        // Wybór zdarzenia związanego z niecelnym strzałem
        const shotEvents = [
            `${randomPlayer} próbował zaskoczyć bramkarza, ale piłka poszła daleko obok bramki, słaby strzał`,
            `${randomPlayer} chciał zaskoczyć golkipera, ale piłka minęła bramkę o kilka metrów, nieudany strzał`,
            `${randomPlayer} próbował zrobić niespodziankę bramkarzowi, ale piłka poleciała daleko w bok, kiepski strzał`,
            `${randomPlayer} zamierzał zagiąć bramkarza, ale piłka nie trafiła w światło bramki, słaba próba`,
            `${randomPlayer} strzelił, ale piłka poszybowała daleko obok słupka, marny strzał`,
            `${randomPlayer} postanowił uderzyć, lecz piłka nie miała szans na trafienie do siatki, beznadziejny strzał`,
            `${randomPlayer} próbuje szczęścia z daleka, ale nie trafia w światło bramki`,
            `${randomPlayer} oddaje strzał z dalekiego dystansu, jednak piłka mija bramkę o wiele metrów`,
            `${randomPlayer} uderza z daleka, lecz piłka leci wysoko nad poprzeczką`,
            `${randomPlayer} strzela z dalekiego zasięgu, ale niecelnie i piłka ląduje poza boiskiem`,
            `${randomPlayer} wykonuje strzał z daleka, lecz piłka nie ma szans na trafienie do bramki`,
            `${randomPlayer} decyduje się na strzał z dystansu, lecz piłka leci daleko od bramki`,
            `Strzał w słupek przez ${randomPlayer}!`,
            `Trafienie w poprzeczkę przez ${randomPlayer}!`,
            `Strzał w obramowanie bramki przez ${randomPlayer}!`,
            `Uderzenie w słupek przez ${randomPlayer}!`,
            `Strzał w spojenie przez ${randomPlayer}!`,
            `Piłka odbija się od słupka po strzale ${randomPlayer}!`,
            `Strzał w słupek przez ${randomPlayer}!`,
            `Trafienie w poprzeczkę przez ${randomPlayer}!`,
            `Strzał w metal przez ${randomPlayer}!`,
            `Uderzenie w słupek przez ${randomPlayer}!`,
            `Strzał w spojenie przez ${randomPlayer}!`,
            `Piłka odbija się od słupka po strzale ${randomPlayer}!`,
            `Korner: ${randomPlayer} zmusił do interwencji bramkarza przeciwnika`

        ];
        randomEvent = shotEvents[Math.floor(Math.random() * shotEvents.length)];

        // Zwiększanie statystyk dla odpowiedniej drużyny
        if (scoringTeam === matchData.team1.name) {
            matchData.team1.shots += 1; // Zwiększ liczbę strzałów dla team1
        } else {
            matchData.team2.shots += 1; // Zwiększ liczbę strzałów dla team2
        }

    } else {
        // Wybór neutralnego wydarzenia, jeśli nie było innych zdarzeń
        const neutralEvents = [
            `${randomPlayer} powstrzymał niebezpieczną akcję rywala i odbił piłkę na aut`,
            `Drużyna gości buduje atak pozycyjny`,
            `Drużyna gości nie może przedostać się na połowę przeciwnika`,
            `Drużyna przyjezdnych powoli rozgrywa akcję`,
            `Drużyna gospodarzy buduje atak pozycyjny`,
            `Drużyna gospodarzy nie może przedostać się na połowę przeciwnika`,
            `Gospodarze powoli rozgrywają akcję`,
            `Zmiana: ${randomPlayer} za ${players[randomPlayerIndex - 1]}`,
            `Zmiana: ${randomPlayer} za ${players[randomPlayerIndex + 1]}`,
            `${randomPlayer} był na pozycji spalonej`,
            `Spalony: ${randomPlayer} znalazł się za linią obrony przeciwnika`,
            `Spalony, ${randomPlayer} zagrał z ofsajdu`,
            `Spalony: ${randomPlayer} był przedostatnim zawodnikiem na boisku`,
            `Spalony: ${randomPlayer} nie zdołał wrócić na czas za linię obrońców`,
            `Faul: ${randomPlayer} sfaulował ${players[randomPlayerIndex + 1]} i dostaje upomnienie od sędziego`,
            `Przewinienie, ${randomPlayer} zagrał nieczysto na ${players[randomPlayerIndex + 1]} i otrzymuje ostrzeżenie od sędziego`,
            `Niebezpieczna gra: ${randomPlayer} podciął ${players[randomPlayerIndex + 1]}`,
            `${randomPlayer} zaatakował ${players[randomPlayerIndex + 1]} i musi się liczyć z konsekwencjami od sędziego`,
            `${randomPlayer} powalił ${players[randomPlayerIndex + 1]} i słyszy gwizdek sędziego`,
            `${randomPlayer} próbował zaskoczyć bramkarza, ale piłka poszła daleko obok bramki, słaby strzał`,
            `${randomPlayer} chciał zaskoczyć golkipera, ale piłka minęła bramkę o kilka metrów, nieudany strzał`,
            `${randomPlayer} zatrzymał groźny atak przeciwnika i wybił piłkę na aut`,
            `${randomPlayer} powstrzymał niebezpieczną akcję rywala i odbił piłkę na aut`,
            `${randomPlayer} zniweczył groźną ofensywę przeciwnika i wykopał piłkę na aut`,
            `${randomPlayer} zatrzymał zagrożenie ze strony rywala i wyrzucił piłkę na aut`,
            `${randomPlayer} udaremnił niepokojący atak przeciwnika i wybił piłkę poza boisko`,
            `${randomPlayer} zakończył groźną sytuację rywala i odbił piłkę na linię boczną`,
            `Rzut rożny: ${randomPlayer} wywalczył korner dla swojej drużyny`,
            `Róg: ${randomPlayer} wypracował sobie dogodną sytuację do dośrodkowania`,
            `Rzut z narożnika: ${randomPlayer} zaskoczył obrońcę i wywalczył rzut rożny`,
            `Rzut z rogu: ${randomPlayer} zagrał sprytnie i zyskał korner dla swojej drużyny`,
            `Rzut rożny: ${randomPlayer} zagrał na aut bramkarza rywali`
        ];
        randomEvent = neutralEvents[Math.floor(Math.random() * neutralEvents.length)];
    }

    checkForWalkover();

    // Dodaj minutę meczu do treści zdarzenia
    var eventMinute = matchData.currentMinute;
    matchData.events.push({ minute: eventMinute, event: `・ ${randomEvent}` });

    // Aktualizuj wynik tylko w przypadku bramki
    if (!matchData.goalScorers) {
        matchData.goalScorers = {
            team1: [],
            team2: []
        };
    }

    if (!matchData.yellowCards) {
        matchData.yellowCards = {
            team1: [],
            team2: []
        };
    }

    if (!matchData.redCards) {
        matchData.redCards = {
            team1: [],
            team2: []
        };
    }
}
function isPlayerInGame(teamPlayers, playerName) {
    return teamPlayers.some(player => player.name === playerName);
}

function formatTime(minutes) {
    var minutesPart = Math.floor(minutes);
    return `${String(minutesPart)}'`;
}

function assignGoal(playerName, teamName) {
    let team = teamName === matchData.team1.name ? matchData.team1 : matchData.team2;
    let player = team.players.find(player => player.name === playerName);
    
    if (player) {
        player.goals += 1; // Zwiększa liczbę goli        
        matchData.events.push(`Gol! ${playerName} zdobywa bramkę dla ${teamName}!`);
    } else {
        console.error(`Zawodnik ${playerName} nie został znaleziony w drużynie ${teamName}`);
    }
}

function assignCard(cardType, playerName, teamName) {
    let team = teamName === matchData.team1.name ? matchData.team1 : matchData.team2;
    let player = team.players.find(player => player.name === playerName);

    if (player) {
        if (cardType === 'yellow') {
            player.yellowCards += 1; // Zwiększa liczbę żółtych kartek
            if (player.yellowCards === 2) {
                player.redCards += 1; // Przypisz czerwoną kartkę
                player.isRedCarded = true; // Oznacz, że zawodnik ma czerwoną kartkę
                matchData.events.push(`Czerwona kartka dla ${playerName} (z powodu 2 żółtych)! (${teamName})`);
            } else {
                matchData.events.push(`Żółta kartka dla ${playerName}! (${teamName})`);
            }
        } else if (cardType === 'red') {
            player.redCards += 1; // Zwiększa liczbę czerwonych kartek
            player.isRedCarded = true; // Oznacz, że zawodnik ma czerwoną kartkę
            matchData.events.push(`Czerwona kartka dla ${playerName}! (${teamName})`);
        }
    } else {
        console.error(`Zawodnik ${playerName} nie został znaleziony w drużynie ${teamName}`);
    }
}

function checkForWalkover() {
    // Sprawdzanie drużyny 1
    if (matchData.team1.players.filter(player => !player.isRedCarded).length < 7) {
        matchData.team2.score += 3; // Przyznaj 3 punkty drużynie 2
        matchData.events.push(`Walkower dla ${matchData.team2.name} (za mało zawodników w ${matchData.team1.name})`);
    } 
    // Sprawdzanie drużyny 2
    else if (matchData.team2.players.filter(player => !player.isRedCarded).length < 7) {
        matchData.team1.score += 3; // Przyznaj 3 punkty drużynie 1
        matchData.events.push(`Walkower dla ${matchData.team1.name} (za mało zawodników w ${matchData.team2.name})`);
    }
}

function displayStats() {
    var statsContainer = document.getElementById("stats");
    statsContainer.innerHTML = "<h2>Statystyki:</h2>";
    
    statsContainer.innerHTML +=
        `<p><img src="posiadanie.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Posiadanie piłki: ${matchData.team1.possession}% - ${matchData.team2.possession}%</p>`;
    
    statsContainer.innerHTML +=
        `<p><img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Żółte kartki: ${matchData.team1.yellowCards} - ${matchData.team2.yellowCards}</p>`;
    
    statsContainer.innerHTML += 
        `<p><img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Czerwone kartki: ${matchData.team1.redCards} - ${matchData.team2.redCards}</p>`;
    
    statsContainer.innerHTML += 
        `<p><img src="shoot.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Strzały: ${matchData.team1.shots} - ${matchData.team2.shots}</p>`;
}

function updatePossession() {
    // 50% szansy na zmianę posiadania piłki jednej z drużyn
    if (Math.random() < 0.5) {
        matchData.team1.possession += 0.5; // Przykładowa implementacja, posiadanie rośnie dla drużyny 1
        matchData.team2.possession = 100 - matchData.team1.possession;
    } else {
        matchData.team2.possession += 0.5; // Przykładowa implementacja, posiadanie rośnie dla drużyny 2
        matchData.team1.possession = 100 - matchData.team2.possession;
    }
}

function handleWalkover(team) {
    matchData.events.push(`Walkower! Drużyna ${matchData[team].name} ma mniej niż 7 graczy na boisku.`);
    // You can update the match result or take any other necessary actions
    // For example, end the match and declare the opposing team as the winner.
}


function getPlayerTeam(player) {
    if (matchData.team1.name && matchData.team2.name) {
        return players.indexOf(player) < 6 ? "team1" : "team2";
    }
    return null;
}

function getPlayerIndex(player, team) {
    if (team) {
        return matchData[team].players.findIndex(playerData => playerData.name === player && playerData.inGame);
    }
    return -1;
}

function getIcon(iconClass) {
    return `<i class="fas ${iconClass}"></i>`;
}

// Dodaj funkcje do kontrolowania symulacji
function speedUp() {
    clearInterval(matchData.intervalId);
    matchData.intervalId = setInterval(updateResult, 500); // Przyśpiesz co 0.5 sekundy
}

function slowDown() {
    clearInterval(matchData.intervalId);
    matchData.intervalId = setInterval(updateResult, 2000); // Zwolnij co 2 sekundy
}

function skip() {
    // Ustaw czas na 90 minut
    matchData.currentMinute = 90;

    // Symuluj wydarzenia przez pozostałe minuty
    while (matchData.currentMinute < 90) {
        simulateEvent();
        matchData.currentMinute++;
    }

    // Po zakończeniu symulacji, wyświetl wynik
    displayMatchResults();
}

function finish() {
    // Ustaw czas na 90 minut
    matchData.currentMinute = 90;

    // Wyświetl wynik od razu
    displayMatchResults();
}

function displayMatchResults() {
    // Wyświetl wynik meczu
    alert(`Mecz zakończony! 
Drużyna A: ${matchData.team1.score} - ${matchData.team2.score} Drużyna B`);

    // Wyświetl wszystkie wydarzenia
    matchData.events.forEach(event => {
        console.log(`Minuta ${event.minute}: ${event.event}`);
    });

    // Możesz też dodać logikę, aby zaktualizować interfejs użytkownika
    displayPlayers(matchData.team1, 'team1-players');
    displayPlayers(matchData.team2, 'team2-players');
}

function updateRemainingStats() {
    // Aktualizuj statystyki do 90. minuty z użyciem funkcji setTimeout
    function updateStatsAsync() {
        if (matchData.currentMinute < 90) {
            updateStats();
            matchData.currentMinute += 1;
            setTimeout(updateStatsAsync, 0);
        } else {
            // Po zakończeniu aktualizacji statystyk, wyświetl wszystkie wiadomości i wynik meczu
            displayResult();
            displayEvents();
            displayStats();
        }
    }

    // Rozpocznij asynchroniczną aktualizację statystyk
    updateStatsAsync();
}


function downloadResult() {
    if (matchData.currentMinute < 90) {
        alert("Mecz jeszcze się nie zakończył. Poczekaj na końcowy gwizdek.");
        return;
    }

    const filename = "match_result.txt";
    const content = generateMatchDetails();
    const blob = new Blob([content], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function generateMatchDetails() {
    let details = `Mecz: ${matchData.team1.name} vs ${matchData.team2.name}\n`;
    details += `Wynik: ${matchData.score.team1}:${matchData.score.team2} (${matchData.currentMinute}')\n\n`;

    details += "Statystyki:\n";
    details += `Posiadanie piłki: ${matchData.team1.possession.toFixed(1)}% - ${matchData.team2.possession.toFixed(1)}%\n`;
    details += `Żółte kartki: ${matchData.team1.yellowCards} - ${matchData.team2.yellowCards}\n`;
    details += `Czerwone kartki: ${matchData.team1.redCards} - ${matchData.team2.redCards}\n`;
    details += `Strzały: ${matchData.team1.shots} - ${matchData.team2.shots}\n\n`;

    details += "Wydarzenia:\n";
    matchData.events.forEach((event, index) => {
        details += `${matchData.currentMinute + index}' - ${event}\n`;
    });

    return details;
}

function toggleMatch() {
    var matchElement = document.querySelector('.match');
    var overlayElement = document.querySelector('.overlay');

    if (matchElement.style.display === 'none' || matchElement.style.display === '') {
        matchElement.style.display = 'flex';
        overlayElement.classList.add('active');
    } else {
        matchElement.style.display = 'none';
        overlayElement.classList.remove('active');
    }
}
