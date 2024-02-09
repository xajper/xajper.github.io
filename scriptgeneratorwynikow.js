const resultContainer = document.getElementById('result');
var matchData = {
    team1: {
        name: "",
        players: [],
        possession: 50,
        shots: 0,
        yellowCards: 0,
        redCards: 0,
    },
    team2: {
        name: "",
        players: [],
        possession: 50,
        shots: 0,
        yellowCards: 0,
        redCards: 0,
    },
    location: "",
    score: { team1: 0, team2: 0 },
    events: [],
    currentMinute: 0,
    currentSecond: 0,
    intervalId: null,
};

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
    team.players = [];

    // Dodaj bramkarza
    team.players.push({
        name: "Bramkarz",
        position: "Bramkarz",
        inGame: true,
        yellowCards: 0,
        redCard: false,
    });

    // Dodaj obrońców
    for (let i = 1; i <= 4; i++) {
        team.players.push({
            name: `Obrońca ${i}`,
            position: "Obrońca",
            inGame: true,
            yellowCards: 0,
            redCard: false,
        });
    }

    // Dodaj pomocników
    for (let i = 1; i <= 4; i++) {
        team.players.push({
            name: `Pomocnik ${i}`,
            position: "Pomocnik",
            inGame: true,
            yellowCards: 0,
            redCard: false,
        });
    }

    // Dodaj napastników
    for (let i = 1; i <= 2; i++) {
        team.players.push({
            name: `Napastnik ${i}`,
            position: "Napastnik",
            inGame: true,
            yellowCards: 0,
            redCard: false,
        });
    }

    for (let i = 0; i < team.players.length; i++) {
        team.players[i].yellowCards = 0;
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
    displayPlayers(matchData.team1, 1);
    displayPlayers(matchData.team2, 2);
    checkGameStatus();
}

function displayResult() {
    var resultContainer = document.getElementById("result");
    var statusIndicators = document.querySelector(".status-indicators");

    document.getElementById("brak-status").style.display = "block";
    document.getElementById("break-status").style.display = "none";
    document.getElementById("finished-status").style.display = "none";
    document.getElementById("in-progress-status").style.display = "none";

    resultContainer.innerHTML = `<h2><img src="szczegoly.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Szczegóły:</h2>`;
    resultContainer.innerHTML += `<p><img src="mecz.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Mecz: ${matchData.team1.name} ${getIcon("fa-home")} - ${getIcon("fa-plane")} ${matchData.team2.name}</p>`;
    resultContainer.innerHTML += `<p><img src="wynik.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Wynik: ${matchData.score.team1}:${matchData.score.team2} (${matchData.currentMinute}') - ${getStatusText()}</p>`;

    // Display the status indicators
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
        return `Końcówka meczu!`;
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

function displayPlayers(team, teamId) {
    var playersList = document.getElementById(`team${teamId}-players`);
    playersList.innerHTML = "";

    team.players.forEach(player => {
        var listItem = document.createElement("li");

        // Dodaj napis nazwy gracza
        var playerNameSpan = document.createElement("span");
        playerNameSpan.innerText = `${player.name} (${player.position})`;
        listItem.appendChild(playerNameSpan);

        // Dodaj obrazki dla wszystkich goli strzelonych przez tego samego zawodnika w danej drużynie
        var scorerGoals = matchData.goalScorers[`team${teamId}`].filter(scorer => scorer.name === player.name);
        for (var i = 0; i < scorerGoals.length; i++) {
            var goalImage = document.createElement("img");
            goalImage.src = "zdobytygol.png";
            goalImage.alt = "Gol";

            // Ustaw mniejsze wymiary obrazka
            goalImage.style.width = "18px";
            goalImage.style.height = "18px";

            // Dodaj lekki odstęp między napisem a obrazkiem
            goalImage.style.marginLeft = "5px";

            goalImage.style.verticalAlign = "middle";

            listItem.appendChild(goalImage);
        }

        // Dodaj obrazki dla wszystkich żółtych kartek dla tego samego zawodnika w danej drużynie
        var yellowCardImages = createCardImages(matchData.yellowCards, 'yellow', player, teamId);
        listItem.appendChild(yellowCardImages);
        
        // Wywołanie funkcji dla czerwonych kartek
        var redCardImages = createCardImages(matchData.redCards, 'red', player, teamId);
        listItem.appendChild(redCardImages);

        playersList.appendChild(listItem);
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

    // Reszta kodu symulacji zdarzeń
    var players = ["Napastnik 1", "Napastnik 2", "Pomocnik 1", "Pomocnik 2", "Pomocnik 3", "Pomocnik 4", "Obrońca 1", "Obrońca 2", "Obrońca 3", "Obrońca 4", "Bramkarz"];
    var randomPlayerIndex = Math.floor(Math.random() * players.length);
    var randomPlayer = players[randomPlayerIndex];

    var team1Strength = 0.8;  // Przykładowa siła drużyny 1
    var team2Strength = 0.7;  // Przykładowa siła drużyny 2
    
    var scoringTeam = Math.random() < team1Strength / (team1Strength + team2Strength) ? matchData.team1.name : matchData.team2.name;

    // Zaktualizuj statystyki posiadania piłki
    updatePossession();

    var events = [
                    `Bramka! ${randomPlayer} <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `Karny! Bramka! ${randomPlayer} <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `Strzał zza pola karnego! Bramka! ${randomPlayer} <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} zdecydował się na strzał z dystansu, i piłka ląduje w siatce! Fantastyczny gol <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} próbował szczęścia z daleka, i piłka wpada do bramki! Niesamowity gol <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} oddał strzał z dalekiego dystansu, i piłka znalazła się w siatce! Rewelacyjny gol <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} uderzył z daleka, i piłka trafiła do bramki! Wspaniały gol <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} strzelił z dalekiego zasięgu, i piłka umieściła się w siatce! Znakomity gol <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} wykonał strzał z daleka, i piłka wylądowała w bramce! Spektakularny gol <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} zakończył akcje swojej drużyny strzelając z bliska w środek bramki przeciwnika <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} zakończył akcje swojej drużyny strzelając z bliska w lewy róg bramki przeciwnika <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} zakończył akcje swojej drużyny strzelając z bliska w prawy róg bramki przeciwnika <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} zakończył akcje swojej drużyny dobiając piłkę do bramki <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} dokończył dzieła i strzelił bramkę dla swojej drużyny <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} zdobył gola kończąc akcję swojej drużyny <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,
                    `${randomPlayer} nie pomylił się z bliska i zdobył gola <img src="gol.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> GOOOL (${scoringTeam})`,

                    `${randomPlayer} próbuje szczęścia z daleka, ale nie trafia w światło bramki`,
                    `${randomPlayer} oddaje strzał z dalekiego dystansu, jednak piłka mija bramkę o wiele metrów`,
                    `${randomPlayer} uderza z daleka, lecz piłka leci wysoko nad poprzeczką`,
                    `${randomPlayer} strzela z dalekiego zasięgu, ale niecelnie i piłka ląduje poza boiskiem`,
                    `${randomPlayer} wykonuje strzał z daleka, lecz piłka nie ma szans na trafienie do bramki`,
                    `${randomPlayer} decyduje się na strzał z dystansu, lecz piłka leci daleko od bramki`,

                    `Rzut rożny: ${randomPlayer} wywalczył korner dla swojej drużyny`,
                    `Korner: ${randomPlayer} zmusił do interwencji bramkarza przeciwnika`,
                    `Róg: ${randomPlayer} wypracował sobie dogodną sytuację do dośrodkowania`,
                    `Rzut z narożnika: ${randomPlayer} zaskoczył obrońcę i wywalczył rzut rożny`,
                    `Rzut z rogu: ${randomPlayer} zagrał sprytnie i zyskał korner dla swojej drużyny`,
                    `Rzut rożny: ${randomPlayer} zagrał na aut bramkarza rywali`,

                    `Strzał w słupek przez ${randomPlayer}!`,
                    `Trafienie w poprzeczkę przez ${randomPlayer}!`,
                    `Strzał w metal przez ${randomPlayer}!`,
                    `Uderzenie w słupek przez ${randomPlayer}!`,
                    `Strzał w spojenie przez ${randomPlayer}!`,
                    `Piłka odbija się od słupka po strzale ${randomPlayer}!`,

                    `Żółta kartka dla ${randomPlayer}! <img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> ŻÓŁTA KARTKA (${scoringTeam})`,
                    `Sędzia pokazuje żółtą kartkę ${randomPlayer}! <img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> ŻÓŁTA KARTKA (${scoringTeam})`,
                    `${randomPlayer} dostaje żółtą kartkę za faul! <img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> ŻÓŁTA KARTKA (${scoringTeam})`,
                    `Żółty kartonik dla ${randomPlayer}! <img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> ŻÓŁTA KARTKA (${scoringTeam})`,
                    `Naruszenie przepisów: ${randomPlayer} sfaulował ${players[randomPlayerIndex + 1]} i widzi żółtą kartkę od sędziego <img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> ŻÓŁTA KARTKA (${scoringTeam})`,

                    `Czerwona kartka dla ${randomPlayer}! <img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> CZERWONA KARTKA (${scoringTeam})`,
                    `Wykluczenie dla ${randomPlayer}! <img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> CZERWONA KARTKA (${scoringTeam})`,
                    `Sędzia pokazuje czerwoną kartkę ${randomPlayer}! <img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> CZERWONA KARTKA (${scoringTeam})`,
                    `${randomPlayer} dostaje czerwoną kartkę za brutalny faul! <img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> CZERWONA KARTKA (${scoringTeam})`,
                    `Zawieszenie dla ${randomPlayer}! <img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> CZERWONA KARTKA (${scoringTeam})`,
                    `Czerwony kartonik dla ${randomPlayer}! <img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;"> CZERWONA KARTKA (${scoringTeam})`,

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
                    `${randomPlayer} próbował zrobić niespodziankę bramkarzowi, ale piłka poleciała daleko w bok, kiepski strzał`,
                    `${randomPlayer} zamierzał zagiąć bramkarza, ale piłka nie trafiła w światło bramki, słaba próba`,
                    `${randomPlayer} strzelił, ale piłka poszybowała daleko obok słupka, marny strzał`,
                    `${randomPlayer} postanowił uderzyć, lecz piłka nie miała szans na trafienie do siatki, beznadziejny strzał`,


                    `${randomPlayer} zatrzymał groźny atak przeciwnika i wybił piłkę na aut`,
                    `${randomPlayer} powstrzymał niebezpieczną akcję rywala i odbił piłkę na aut`,
                    `${randomPlayer} zniweczył groźną ofensywę przeciwnika i wykopał piłkę na aut`,
                    `${randomPlayer} zatrzymał zagrożenie ze strony rywala i wyrzucił piłkę na aut`,
                    `${randomPlayer} udaremnił niepokojący atak przeciwnika i wybił piłkę poza boisko`,
                    `${randomPlayer} zakończył groźną sytuację rywala i odbił piłkę na linię boczną`,

                    `Drużyna gości buduje atak pozycyjny`,
                    `Drużyna gości nie może przedostać się na połowę przeciwnika`,
                    `Drużyna przyjezdnych powoli rozgrywa akcję`,
                    `Drużyna gospodarzy buduje atak pozycyjny`,
                    `Drużyna gospodarzy nie może przedostać się na połowę przeciwnika`,
                    `Gospodarze powoli rozgrywają akcję`,

                    `Zmiana: ${randomPlayer} za ${players[randomPlayerIndex - 1]}`,
                    `Zmiana: ${randomPlayer} za ${players[randomPlayerIndex + 1]}`,

                    `Kontuzja: ${randomPlayer} opuszcza boisko`, `Zmiana: ${randomPlayer} za ${players[randomPlayerIndex - 1]}`,];

    var randomEvent = events[Math.floor(Math.random() * events.length)];

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

    if (randomEvent.includes("ŻÓŁTA KARTKA")) {
        var yellowCardPlayer = {
            name: randomPlayer,
            team: randomEvent.includes(matchData.team1.name) ? matchData.team1.name : matchData.team2.name
        };
    
        // Sprawdź, czy zawodnik jest jeszcze w grze dla drużyny A
        if (isPlayerInGame(matchData.team1.players, yellowCardPlayer.name)) {
            matchData.yellowCards.team1.push(yellowCardPlayer);
            matchData.team1.yellowCards += 1;
    
            if (matchData.team1.playersInGame < 7) {
                handleWalkover(yellowCardPlayer.team);
            }
        } else if (isPlayerInGame(matchData.team2.players, yellowCardPlayer.name)) {
            // Sprawdź, czy zawodnik jest jeszcze w grze dla drużyny B
            matchData.yellowCards.team2.push(yellowCardPlayer);
            matchData.team2.yellowCards += 1;
    
            if (matchData.team2.playersInGame < 7) {
                handleWalkover(yellowCardPlayer.team);
            }
        }
    
        // Aktualizacja wyświetlania obrazków żółtych kartek
        var yellowCardImages = createCardImages(matchData.yellowCards, 'yellow', yellowCardPlayer, scoringTeam);
        listItem.appendChild(yellowCardImages);
    }
    
    // Poprawiona funkcja dla czerwonych kartek
    if (randomEvent.includes("CZERWONA KARTKA")) {
        var redCardPlayer = {
            name: randomPlayer,
            team: randomEvent.includes(matchData.team1.name) ? matchData.team1.name : matchData.team2.name
        };
    
        // Sprawdź, czy zawodnik jest jeszcze w grze dla drużyny A
        if (isPlayerInGame(matchData.team1.players, redCardPlayer.name)) {
            matchData.redCards.team1.push(redCardPlayer);
            matchData.team1.redCards += 1;
    
            if (matchData.team1.playersInGame < 7) {
                handleWalkover(redCardPlayer.team);
            }
        } else if (isPlayerInGame(matchData.team2.players, redCardPlayer.name)) {
            // Sprawdź, czy zawodnik jest jeszcze w grze dla drużyny B
            matchData.redCards.team2.push(redCardPlayer);
            matchData.team2.redCards += 1;
    
            if (matchData.team2.playersInGame < 7) {
                handleWalkover(redCardPlayer.team);
            }
        }
    
        // Aktualizacja wyświetlania obrazków czerwonych kartekscoringTeam
        var redCardImages = createCardImages(matchData.redCards, 'red', redCardPlayer, scoringTeam);
        listItem.appendChild(redCardImages);
    }
    
    if (randomEvent.includes("GOOOL")) {
        var goalScorer = {
            name: randomPlayer,
            team: randomEvent.includes(matchData.team1.name) ? matchData.team1.name : matchData.team2.name
        };

        if (goalScorer.team === matchData.team1.name) {
            matchData.score.team1 += 1;
            matchData.team1.shots += 1;
            // Dodaj nowego strzelca do tablicy dla drużyny 1
            matchData.goalScorers.team1.push(goalScorer);
        } else if (goalScorer.team === matchData.team2.name) {
            matchData.score.team2 += 1;
            matchData.team2.shots += 1;
            // Dodaj nowego strzelca do tablicy dla drużyny 2
            matchData.goalScorers.team2.push(goalScorer);
        }

    }
    
}

function isPlayerInGame(teamPlayers, playerName) {
    return teamPlayers.some(player => player.name === playerName);
}

function formatTime(minutes) {
    var minutesPart = Math.floor(minutes);
    return `${String(minutesPart)}'`;
}

function displayStats() {
    var statsContainer = document.getElementById("stats");
    statsContainer.innerHTML = "<h2>Statystyki:</h2>";
    statsContainer.innerHTML +=
    `<p><img src="posiadanie.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Posiadanie piłki: ${matchData.team1.possession}% - ${matchData.team2.possession}%</p>`;
    
    statsContainer.innerHTML +=
    `<p><img src="yellow_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Żółte kartki: ${matchData.team1.yellowCards.length} - ${matchData.team2.yellowCards.length}</p>`;

    // Dodaj grafikę red_car.png przy informacji o czerwonych kartkach
    statsContainer.innerHTML += `
    <p><img src="red_card.png" style="width: 20px; height: 20px; margin-bottom: -5px; margin-right: 5px;">Czerwone kartki: ${matchData.team1.redCards} - ${matchData.team2.redCards}</p>`;

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
    clearInterval(matchData.intervalId);
    updateResult(); // Pomijaj aktualizację i aktualizuj wynik ręcznie
}

function finish() {
    clearInterval(matchData.intervalId);

    // Symuluj zdarzenia do 90. minuty z użyciem funkcji setTimeout
    function simulateRemainingEventsAsync() {
        if (matchData.currentMinute < 90) {
            simulateEvent();
            matchData.currentMinute === 90;

            setTimeout(simulateRemainingEventsAsync, 0);
        } else {
            // Po zakończeniu symulacji zdarzeń, aktualizuj statystyki do 90. minuty
            updateRemainingStats();
        }
    }

    // Rozpocznij asynchroniczną symulację zdarzeń
    simulateRemainingEventsAsync();
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
