document.addEventListener('DOMContentLoaded', function () {
    const commandsList = document.getElementById('commandsList');
    const detailsContainer = document.getElementById('detailsContainer');
    const detailsText = document.getElementById('detailsText');
    const tagPlaceholder = document.getElementById('tagPlaceholder');
    const navbar = document.getElementById('navbar');
    let closeButton;

    const commands = [
        // Komendy Administracyjne
        { id: 1, category: 'Moderacyjne', text: '⛔ Ban', details: '<em>prefix</em> ban {@użytkownik} {powód}', tag: 'Moderacyjne', przyklad: '!ban @Xajper trollowanie' },
        { id: 2, category: 'Moderacyjne', text: '🎁 UnBan', details: '<em>prefix</em> unban {użytkownik#0000}', tag: 'Moderacyjne', przyklad: '!unban Xajper#0000' },
        { id: 3, category: 'Moderacyjne', text: '💥 Kick', details: '<em>prefix</em> kick {@użytkownik} {powód}', tag: 'Moderacyjne', przyklad: '!kick @Xajper nieprzestrzeganie regulaminu' },
        { id: 4, category: 'Moderacyjne', text: '🔇 Mute', details: '<em>prefix</em> mute {@użytkownik} {powód}', tag: 'Moderacyjne', przyklad: '!mute @Xajper floodowanie' },
        { id: 5, category: 'Moderacyjne', text: '🔈 TempMute', details: '<em>prefix</em> tempmute {@użytkownik} {czas w minutach} {powód}', tag: 'Moderacyjne', przyklad: '!tempmute @Xajper 10 spamowanie' },
        { id: 6, category: 'Moderacyjne', text: '🎤 UnMute', details: '<em>prefix</em> unmute {@użytkownik}', tag: 'Moderacyjne', przyklad: '!unmute @Xajper' },
        { id: 7, category: 'Moderacyjne', text: '🧹 Clear', details: '<em>prefix</em> clear {ilość}', tag: 'Moderacyjne', przyklad: '!clear 10' },
        { id: 8, category: 'Moderacyjne', text: '🔧 Warn', details: '<em>prefix</em> warn {@użytkownik} {powód}', tag: 'Moderacyjne', przyklad: '!warn @Xajper wysyła linki bez pozwolenia' },
        { id: 9, category: 'Moderacyjne', text: '🔰 UnWarn', details: '<em>prefix</em> unwarn {@użytkownik} {numer warna}', tag: 'Moderacyjne', przyklad: '!unwarn @Xajper 1' },
        { id: 10, category: 'Moderacyjne', text: '🧳 WarnInfo', details: '<em>prefix</em> clear warninfo {@użytkownik}', tag: 'Moderacyjne', przyklad: '!warninfo @Xajper' },
        { id: 11, category: 'Moderacyjne', text: '🎫 Stwórz Ticket', details: '<em>prefix</em> ticket', tag: 'Moderacyjne', przyklad: '!ticket' },
        { id: 12, category: 'Moderacyjne', text: '📊 Stwórz Ankietę', details: '<em>prefix</em> ankieta NAZWA PYTANIE WYBÓR 1 [...] (wyrazy po spacji i odzielne opcje zapisujemy w cudzysłowie)', tag: 'Moderacyjne', przyklad: '!ankieta Pytanie "Czy serwer Xajper Team jest fajny?" Tak Nie' },
        { id: 13, category: 'Moderacyjne', text: '🎉 Giveaway', details: '<em>prefix</em> giveaway {odpowiedz na pytania}', tag: 'Moderacyjne', przyklad: '!giveaway' },
        { id: 14, category: 'Moderacyjne', text: '🧨 Chcesz zgłosić pewną osobe? Wpisz', details: '<em>prefix</em> report {@użytkownik} {powód} następnie po wpisaniu komendy: {wiadomość którą chcesz przekazać moderacji}', tag: 'Moderacyjne', przyklad: '!report @Xajper on nie przestrzega regulaminu, zbanujcie go' },
        { id: 15, category: 'Moderacyjne', text: '❌ Usuń Pieniądze', details: '<em>prefix</em> removemoney/usuńpieniądze {@użytkownik} {ilość} {portfelt/bank}', tag: 'Moderacyjne', przyklad: '!removemoney @Xajper 100 portfel' },
        { id: 16, category: 'Moderacyjne', text: '➕ Dodaj Pieniądze', details: '<em>prefix</em> addmoney/dodajpieniądze/givemoney/give {@użytkownik} {ilość} {portfelt/bank}', tag: 'Moderacyjne', przyklad: '!addmoney @Xajper 100 bank' },
        { id: 17, category: 'Moderacyjne', text: '🥏 Dodaj rolę', details: '<em>prefix</em> addrole {@użytkownik} {@rola}', tag: 'Moderacyjne', przyklad: '!addrole @Xajper @✨・ Zastępca' },
        { id: 18, category: 'Moderacyjne', text: '❌ Usuń rolę', details: '<em>prefix</em> removerole {@użytkownik} {@rola}', tag: 'Moderacyjne', przyklad: '!removerole @Xajper @✨・ Zastępca' },
        { id: 19, category: 'Moderacyjne', text: '↘️ Zmień prefix', details: '<em>prefix</em> changeprefix {nowy prefix}', tag: 'Moderacyjne', przyklad: '!changeprefix $' },
        { id: 20, category: 'Moderacyjne', text: '🗑️ Ustaw kanały', details: '<em>prefix</em> ustaw/set', tag: 'Moderacyjne', przyklad: '!ustaw' },
        { id: 21, category: 'Moderacyjne', text: '🙅‍♂️ Zablokuj kanał/serwer', details: '<em>prefix</em> lock {#kanał} serwer <em>(opcjonalnie</em>', tag: 'Moderacyjne', przyklad: '!lock #chat' },
        { id: 22, category: 'Moderacyjne', text: '👀 Odblokuj kanał/serwer', details: '<em>prefix</em> unlock {#kanał} serwer <em>(opcjonalnie)</em> ', tag: 'Moderacyjne', przyklad: '!unlock #chat' },

        // Komendy 4Fun
        { id: 23, category: '4fun', text: '💯 Losowanie od 0 do 100', details: '<em>prefix</em> losuj', tag: '4fun' , przyklad: '!losuj'},
        { id: 24, category: '4fun', text: '❓ Wylosuj liczbę do podanego zakresu', details: '<em>prefix</em> roll {zakres}', tag: '4fun' , przyklad: '!roll 100'},
        { id: 25, category: '4fun', text: '👋 Witaj', details: '<em>prefix</em> witaj', tag: '4fun' , przyklad: '!witaj'},
        { id: 26, category: '4fun', text: '👨‍💻 Avatar', details: '<em>prefix</em> avatar {@użytkownik}', tag: '4fun' , przyklad: '!avatar @Xajper'},
        { id: 27, category: '4fun', text: '🔎 Info o Użytkowniku', details: '<em>prefix</em> userinfo {@użytkownik}', tag: '4fun' , przyklad: '!userinfo @Xajper'},
        { id: 28, category: '4fun', text: '🤖 Info o Bocie', details: '<em>prefix</em> botinfo', tag: '4fun' , przyklad: '!botinfo'},
        { id: 29, category: '4fun', text: '💻 Serwer Info', details: '<em>prefix</em> serwerinfo', tag: '4fun' , przyklad: '!serwerinfo'},
        { id: 30, category: '4fun', text: '🎱 Zadaj Pytanie Botu', details: '<em>prefix</em> 8ball/8b {pytanie}', tag: '4fun' , przyklad: '!8ball Czy jutro będzie ładna pogoda?'},
        { id: 31, category: '4fun', text: '⭕❌ Kółko i Krzyżyk', details: '<em>prefix</em> ox', tag: '4fun' , przyklad: '!ox'},
        { id: 32, category: '4fun', text: '🤫 Poszukiwany', details: '<em>prefix</em> wanted {@użytkownik}', tag: '4fun' , przyklad: '!wanted @Xajper'},
        { id: 33, category: '4fun', text: '🤣 Mem', details: '<em>prefix</em> mem', tag: '4fun' , przyklad: '!mem'},
        { id: 34, category: '4fun', text: '😆 Żart', details: '<em>prefix</em> zart', tag: '4fun' , przyklad: '!zart'},
        { id: 35, category: '4fun', text: '🐈 Zdjęcie Kota', details: '<em>prefix</em> kot', tag: '4fun' , przyklad: '!kot'},
        { id: 36, category: '4fun', text: '🐶 Zdjęcie Psa', details: '<em>prefix</em> pies', tag: '4fun' , przyklad: '!pies'},
        { id: 37, category: '4fun', text: '🎬 Mój Kanał', details: '<em>prefix</em> xajper', tag: '4fun' , przyklad: '!xajper'},
        { id: 38, category: '4fun', text: '🧠 IQ', details: '<em>prefix</em> iq', tag: '4fun' , przyklad: '!iq'},
        { id: 39, category: '4fun', text: '🎲 Rzuć Kostką', details: '<em>prefix</em> kostka', tag: '4fun' , przyklad: '!kostka'},
        { id: 40, category: '4fun', text: '🪙 Rzuć Monetą', details: '<em>prefix</em> moneta', tag: '4fun' , przyklad: '!moneta'},
        { id: 41, category: '4fun', text: '✨ System Quizów', details: '<em>prefix</em> quiz/quiz ogólny', tag: '4fun' , przyklad: '!quiz'},
        { id: 42, category: '4fun', text: '[WKRÓTCE] ♟ Szachy', details: '<em>prefix</em> szachy {@ty} {@przeciwnik}', tag: '4fun' , przyklad: '!szachy @Xajper @Anonim'},
        { id: 43, category: '4fun', text: '🏓 Ping! Pong!', details: '<em>prefix</em> ping', tag: '4fun' , przyklad: '!ping'},
        { id: 44, category: '4fun', text: '❔ Propozycja', details: '<em>prefix</em> propozycja {propozycja}', tag: '4fun' , przyklad: '!propozycja "Proszę dodać nową komendę!"'},
        { id: 45, category: '4fun', text: '🌍 Zgadywanie krajów/flag/stolic/walut/kształtów', details: '<em>prefix</em> trivia tryb: mapa/stolica/flaga/waluta/kształt {liczba rund} kontynent: europa/azja/afryka/ameryka/australia/świat', tag: '4fun' , przyklad: '!trivia mapa 3 europa'},
        { id: 46, category: '4fun', text: '🖨️ Chcesz żeby bot napisał to co ty emotkami? Wpisz', details: '<em>prefix</em> kopiuj', tag: '4fun' , przyklad: '!kopiuj'},
        { id: 47, category: '4fun', text: '🪨🧻✂️ Kamień papier nożyce', details: '<em>prefix</em> kpn {wybierz: papier, kamień, nożyce}', tag: '4fun' , przyklad: '!kpn kamień'},
        { id: 48, category: '4fun', text: '🔎 Ciekawostki', details: '<em>prefix</em> ciekawostka', tag: '4fun' , przyklad: '!ciekawostka'},
        { id: 49, category: '4fun', text: '🤔 Różne żartobliwe rozkminy', details: '<em>prefix</em> rozkmina', tag: '4fun' , przyklad: '!rozkmina'},
        { id: 50, category: '4fun', text: '🔢 Zgadywanie liczby', details: '<em>prefix</em> zgadywanie {próg liczby} {liczba prób}', tag: '4fun' , przyklad: '!zgadywanie 50 5'},
        { id: 51, category: '4fun', text: '🧬 Generator embed', details: '<em>prefix</em> embed {odpowiedz na pytania}', tag: '4fun' , przyklad: '!embed Jak się masz?'},
        { id: 52, category: '4fun', text: '💪 POLSKA GUROM!', details: '<em>prefix</em> polskagurom', tag: '4fun' , przyklad: '!polskagurom'},
        { id: 53, category: '4fun', text: '🔠 Gra w literalnie', details: '<em>prefix</em> literalnie', tag: '4fun' , przyklad: '!literalnie'},
        { id: 54, category: '4fun', text: '⚽ Zmierz się z botem w karnych! 🥅', details: '<em>prefix</em> football {bramkarz}', tag: '4fun' , przyklad: '!football Szczęsny'},
        { id: 55, category: '4fun', text: '🧑‍🏫 Działania matematyczne', details: '<em>prefix</em> add/dodaj', tag: '4fun' , przyklad: '!add 5 10'},
        { id: 56, category: '4fun', text: '🏅 Daiy nagrody | Możliwe do odebrania tylko na serwerze Xajper Team', details: '<em>prefix</em> odbierz/karnet', tag: '4fun' , przyklad: '!odbierz'},
        { id: 57, category: '4fun', text: '🎂 Ustaw datę swoich urodzin!', details: '<em>prefix</em> urodziny {data w formacie DD-MM-YYYY}', tag: '4fun' , przyklad: '!urodziny 27-01-2000'},
        { id: 58, category: '4fun', text: '📨 Wyślij życzenia urodzinowe!', details: '<em>prefix</em> życzenia', tag: '4fun' , przyklad: '!życzenia'},
        { id: 59, category: '4fun', text: '👮 Lista komend mafia', details: '<em>prefix</em> mafia', tag: '4fun' , przyklad: '!mafia'},
        { id: 60, category: '4fun', text: '🔴 Connect4!', details: '<em>prefix</em> connect4 {@przeciwnik}', tag: '4fun' , przyklad: '!connect4 @Xajper'},
        { id: 61, category: '4fun', text: '🃏 BlackJack', details: '<em>prefix</em> blackjack', tag: '4fun' , przyklad: '!blackjack'},
        { id: 62, category: '4fun', text: '🎰 Wylosuj to co chcesz dzięki botu', details: '<em>prefix</em> losowanie', tag: '4fun' , przyklad: '!losowanie'},

        // Komendy Ekonomii
        { id: 63, category: 'Ekonomia', text: '💵 Stan Konta', details: '<em>prefix</em> konto/bal/balance', tag: 'Ekonomia' , przyklad: '!konto'},
        { id: 64, category: 'Ekonomia', text: '⏰ Codzienny Zarobek', details: '<em>prefix</em> daily', tag: 'Ekonomia' , przyklad: '!daily'},
        { id: 65, category: 'Ekonomia', text: '✅ Kup Przedmiot', details: '<em>prefix</em> kup/buy {nazwa przedmiotu}', tag: 'Ekonomia' , przyklad: '!kup dom'},
        { id: 66, category: 'Ekonomia', text: '🤑 Sprzedaj Przedmiot', details: '<em>prefix</em> sprzedaj/sell {nazwa przedmioty}', tag: 'Ekonomia' , przyklad: '!sprzedaj krzesło'},
        { id: 67, category: 'Ekonomia', text: '💳 Wypłać Pieniądze', details: '<em>prefix</em> with {all/ilość}', tag: 'Ekonomia' , przyklad: '!with all'},
        { id: 68, category: 'Ekonomia', text: '🏦 Wpłać Pieniądze', details: '<em>prefix</em> dep {all/ilość}', tag: 'Ekonomia' , przyklad: '!dep 100'},
        { id: 60, category: 'Ekonomia', text: '⬆ Topka Najbogatszych Ludzi', details: '<em>prefix</em> lb/leaderboard/topmoney', tag: 'Ekonomia' , przyklad: '!lb'},
        { id: 70, category: 'Ekonomia', text: '🤑 Hazard', details: '<em>prefix</em> hazard {ilość pieniędzy do postawienia}', tag: 'Ekonomia' , przyklad: '!hazard 50'},
        { id: 71, category: 'Ekonomia', text: '🎰 Kasyno', details: '<em>prefix</em> kasyno {ilość pieniędzy do postawienia}', tag: 'Ekonomia' , przyklad: '!kasyno 20'},
        { id: 72, category: 'Ekonomia', text: '🎣 Łowienie Ryb', details: '<em>prefix</em> jezioro', tag: 'Ekonomia' , przyklad: '!jezioro'},
        { id: 73, category: 'Ekonomia', text: '⛺ Polowanie', details: '<em>prefix</em> polowanie', tag: 'Ekonomia' , przyklad: '!polowanie'},
        { id: 74, category: 'Ekonomia', text: '⛏️ Kopalnia', details: '<em>prefix</em> kopalnia', tag: 'Ekonomia' , przyklad: '!kopalnia'},
        { id: 75, category: 'Ekonomia', text: '🪓 Tartak', details: '<em>prefix</em> tartak', tag: 'Ekonomia' , przyklad: '!tartak'},
        { id: 76, category: 'Ekonomia', text: '🛒 Sklep', details: '<em>prefix</em> sklep', tag: 'Ekonomia' , przyklad: '!sklep'},
        { id: 77, category: 'Ekonomia', text: '📦 Lista Skrzynek', details: '<em>prefix</em> skrzynki', tag: 'Ekonomia' , przyklad: '!skrzynki'},
        { id: 78, category: 'Ekonomia', text: '🔓 Otwórz Skrzynkę', details: '<em>prefix</em> otwórz {rodzaj skrzynki}', tag: 'Ekonomia' , przyklad: '!otwórz epicka'},
        { id: 79, category: 'Ekonomia', text: '🦹‍♂️ Kradzież', details: '<em>prefix</em> rob {@użytkownik}', tag: 'Ekonomia' , przyklad: '!rob @Xajper'},
        { id: 80, category: 'Ekonomia', text: '🏰 Twój Ekwipunek', details: '<em>prefix</em> eq/inv/inventory', tag: 'Ekonomia' , przyklad: '!inv'},
        { id: 81, category: 'Ekonomia', text: '[WKRÓTCE] 🎓 Edukacja to podstawa! Chcesz zarabiać więcej? Poucz się!', details: '<em>prefix</em> edukacja/nauka {ilość pieniędzy przeznaczona na edukację}', tag: 'Ekonomia' , przyklad: '!nauka 500'},
        { id: 82, category: 'Ekonomia', text: '🪙 Rzut monetą', details: '<em>prefix</em> cf {kwota} {orzeł/reszka}', tag: 'Ekonomia' , przyklad: '!cf 10 orzeł'},
        { id: 83, category: 'Ekonomia', text: '🚨 Crime', details: '<em>prefix</em> crime', tag: 'Ekonomia' , przyklad: '!crime'},
        { id: 84, category: 'Ekonomia', text: '💼 Nagrody z ról', details: '<em>prefix</em> collect', tag: 'Ekonomia' , przyklad: '!collect'},
        { id: 85, category: 'Ekonomia', text: '🧑‍🏫 Rozwiązywanie działań matematycznych', details: '<em>prefix</em> math', tag: 'Ekonomia' , przyklad: '!math'},
        { id: 86, category: 'Ekonomia', text: '🥏 Ruletka', details: '<em>prefix</em> ruletka {kwota} {liczba|kolor|liczba parzysta/nieparzysta}', tag: 'Ekonomia' , przyklad: '!ruletka 50 czerwony'},

        // Komendy Systemu Poziomów
        { id: 87, category: 'Poziomy', text: '[WKRÓTCE] 💠 Twój Aktualnym Poziom', details: '<em>prefix</em> rank', tag: 'Poziomy' , przyklad: '!rank'},
        { id: 88, category: 'Poziomy', text: '[WKRÓTCE] 📈 Topka Ludzi z Najwyższym Poziomem:', details: '<em>prefix</em> toplvl', tag: 'Poziomy' , przyklad: '!toplvl'},

        // Komendy do Muzyki
        { id: 89, category: 'Muzyka', text: '🎵 Start', details: '<em>prefix</em> play {nazwa/link}', tag: 'Muzyka' , przyklad: '!play nazwa muzyki'},
        { id: 90, category: 'Muzyka', text: '🔒 Stop', details: '<em>prefix</em> stop', tag: 'Muzyka' , przyklad: '!stop'},
        { id: 91, category: 'Muzyka', text: '🪃 Zatrzymaj', details: '<em>prefix</em> pause/zatrzymaj', tag: 'Muzyka' , przyklad: '!pause'},
        { id: 92, category: 'Muzyka', text: '🎧 Wznów muzykę', details: '<em>prefix</em> resume/wznów', tag: 'Muzyka' , przyklad: '!wznów'},
        { id: 93, category: 'Muzyka', text: '🎞️ Playlista/Kolejka', details: '<em>prefix</em> playlista/kolejka', tag: 'Muzyka' , przyklad: '!playlista'},
        { id: 94, category: 'Muzyka', text: '🧹 Wyczyść playlistę', details: '<em>prefix</em> kolejka_clear/playlista_clear', tag: 'Muzyka' , przyklad: '!kolejka_clear'},
        { id: 95, category: 'Muzyka', text: '🚫 Usuń muzykę z playlisty', details: '<em>prefix</em> remove', tag: 'Muzyka' , przyklad: '!remove'},
        { id: 96, category: 'Muzyka', text: '➡️ Pomiń muzykę', details: '<em>prefix</em> skip', tag: 'Muzyka' , przyklad: '!skip'},

        // Komendy do gry RPG
        { id: 97, category: 'RPG', text: '⚔️ Pojedynek', details: '<em>prefix</em> walka {@przeciwnik}', tag: 'RPG' , przyklad: '!walka @Xajper'},
        { id: 98, category: 'RPG', text: '💪 Trening', details: '<em>prefix</em> trening', tag: 'RPG' , przyklad: '!trening'},
        { id: 99, category: 'RPG', text: '⬆️ Ulepszanie statystyk', details: '<em>prefix</em> ulepsz', tag: 'RPG' , przyklad: '!ulepsz'},
        { id: 100, category: 'RPG', text: '🛒 Rynek', details: '<em>prefix</em> rynek', tag: 'RPG' , przyklad: '!rynek'},
        { id: 101, category: 'RPG', text: '🛡️ Kupowanie zbroi/broni', details: '<em>prefix</em> wyposaż {nazwa przedmiotu}', tag: 'RPG' , przyklad: '!wyposaż miecz'},
        { id: 102, category: 'RPG', text: '[WKRÓTCE] 💥 Wyzwania', details: '<em>prefix</em> wyzwania/questy', tag: 'RPG' , przyklad: '!wyzwania'},
        { id: 103, category: 'RPG', text: '🏟️ Walka z potworami', details: '<em>prefix</em> arena', tag: 'RPG' , przyklad: '!arena'},
        { id: 104, category: 'RPG', text: '💻 Panel postaci', details: '<em>prefix</em> postać/profil/panel', tag: 'RPG' , przyklad: '!profil'},
        { id: 105, category: 'RPG', text: '🌋 Dungeon', details: '<em>prefix</em> dungeon', tag: 'RPG' , przyklad: '!dungeon'},
        { id: 106, category: 'RPG', text: '🗺️ Mapa', details: '<em>prefix</em> mapa', tag: 'RPG' , przyklad: '!mapa'},
        { id: 107, category: 'RPG', text: '[WKRÓTCE] 💱 Wymiany', details: '<em>prefix</em> trade {@użytkownik} {przedmiot}', tag: 'RPG' , przyklad: '!trade @Xajper łuk'},
        { id: 108, category: 'RPG', text: '🏰 Lista komend do funkcji gildii', details: '<em>prefix</em> gildia', tag: 'RPG' , przyklad: '!gildia'},
        { id: 109, category: 'RPG', text: '😺 Stwórz własnego peta', details: '<em>prefix</em> pet {nazwa} {gatunek}', tag: 'RPG' , przyklad: '!pet Mruczek kot'},
        { id: 110, category: 'RPG', text: '🃏 Panel peta', details: '<em>prefix</em> pets', tag: 'RPG' , przyklad: '!pets'},
        { id: 111, category: 'RPG', text: '💚 Medyk', details: '<em>prefix</em> medyk', tag: 'RPG' , przyklad: '!medyk'},
        { id: 112, category: 'RPG', text: '🎒 Plecak', details: '<em>prefix</em> plecak', tag: 'RPG' , przyklad: '!plecak'},
        { id: 113, category: 'RPG', text: '🔬 Odkrywaj nowe miejsca i tym samym nowe przedmioty', details: '<em>prefix</em> explore/travel/podróż/odkryj', tag: 'RPG' , przyklad: '!explore'},
        { id: 114, category: 'RPG', text: '📜 Lista twoich osiągnięć', details: '<em>prefix</em> osiągnięcia/achievements', tag: 'RPG' , przyklad: '!osiągnięcia'},
        { id: 115, category: 'RPG', text: '🆚 Walka z npc', details: '<em>prefix</em> npc', tag: 'RPG' , przyklad: '!npc'},
        { id: 116, category: 'RPG', text: '📊 Najlepsi gracze', details: '<em>prefix</em> ranking', tag: 'RPG' , przyklad: '!ranking'},
        { id: 117, category: 'RPG', text: '🔥 Lista dostępnych klas', details: '<em>prefix</em> klasy', tag: 'RPG' , przyklad: '!klasy'},
        { id: 118, category: 'RPG', text: '🤣 Śmieszne teskty Jaskra', details: '<em>prefix</em> Jaskier/jaskier', tag: 'RPG' , przyklad: '!jaskier'},
        { id: 119, category: 'RPG', text: '⚱️ Poznaj historię świata pod komendą', details: '<em>prefix</em> historia', tag: 'RPG' , przyklad: '!historia'},

        // Komendy do Gry Menadżer
        { id: 120, category: 'Menadżer [ANULOWANE]', text: '📜 Lista sponsorów', details: '<em>prefix</em> sponsor', tag: 'Menadżer [ANULOWANE]' , przyklad: '!sponsor'},
        { id: 121, category: 'Menadżer [ANULOWANE]', text: '🧠 Taktyka', details: '<em>prefix</em> taktyka', tag: 'Menadżer [ANULOWANE]' , przyklad: '!taktyka'},
        { id: 122, category: 'Menadżer [ANULOWANE]', text: '📊 Tabela ligowa', details: '<em>prefix</em> tabela', tag: 'Menadżer [ANULOWANE]' , przyklad: '!tabela'},
        { id: 123, category: 'Menadżer [ANULOWANE]', text: '📈 Statystyki klubu', details: '<em>prefix</em> statystyki', tag: 'Menadżer [ANULOWANE]' , przyklad: '!statystyki'},
        { id: 124, category: 'Menadżer [ANULOWANE]', text: '🏅 Nagrody za wygranie czegoś', details: '<em>prefix</em> nagrody', tag: 'Menadżer [ANULOWANE]' , przyklad: '!nagrody'},
        { id: 125, category: 'Menadżer [ANULOWANE]', text: '🧔‍♂️ Lista trenerów', details: '<em>prefix</em> trener', tag: 'Menadżer [ANULOWANE]' , przyklad: '!trener'},
        { id: 126, category: 'Menadżer [ANULOWANE]', text: '💻 Lista piłkarzy', details: '<em>prefix</em> piłkarze {klub}', tag: 'Menadżer [ANULOWANE]' , przyklad: '!piłkarze FC Barcelona'},
        { id: 127, category: 'Menadżer [ANULOWANE]', text: '📑 Lista klubów', details: '<em>prefix</em> kluby', tag: 'Menadżer [ANULOWANE]' , przyklad: '!kluby'},
        { id: 128, category: 'Menadżer [ANULOWANE]', text: '📆 Terminarz', details: '<em>prefix</em> terminarz', tag: 'Menadżer [ANULOWANE]' , przyklad: '!terminarz'},
        { id: 129, category: 'Menadżer [ANULOWANE]', text: '🏆 Historia', details: '<em>prefix</em> historia', tag: 'Menadżer [ANULOWANE]' , przyklad: '!historia'},
        { id: 130, category: 'Menadżer [ANULOWANE]', text: '💪 [WKRÓTCE] Trenowanie piłkarza', details: '<em>prefix</em> trenuj {piłkarz} {intensywność}', tag: 'Menadżer [ANULOWANE]' , przyklad: '!trenuj Lewandowski wysoka'}
    ];

    const categories = ['Wszystkie', 'Moderacyjne', '4fun', 'Ekonomia', 'Poziomy', 'Muzyka', 'RPG', 'Menadżer [ANULOWANE]'];
    const existingCategories = [];
    const existingTags = [];

    function addCategoryToNavbar(category) {
        if (!existingCategories.includes(category)) {
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = getCategoryDisplayName(category);
            a.dataset.category = category;

            const underline = document.createElement('div');
            underline.classList.add('underline');
            a.appendChild(underline);

            a.addEventListener('click', () => filterCommands(category));
            navbar.appendChild(a);

            existingCategories.push(category);

            if (category === 'Wszystkie') {
                setTimeout(() => {
                    a.click();
                }, 10);
            }
        }
    }

    function getCategoryDisplayName(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    categories.forEach(category => {
        addCategoryToNavbar(category);
    });

    commands.forEach(command => {
        const li = document.createElement('li');
        li.textContent = command.text;
        li.dataset.category = command.category;
        li.dataset.tag = command.tag;
        li.addEventListener('click', () => showDetails(command.text, command.details, command.tag, command.przyklad));

        commandsList.appendChild(li);
    });

    function addTagToContainer(tag) {
        tagPlaceholder.innerHTML = '';

        const tagElement = document.createElement('span');
        tagElement.classList.add('tag');
        tagElement.textContent = `#${tag.toLowerCase().replace(/\s+/g, '-')}`;
        tagElement.addEventListener('click', () => filterCommands(tag));
        tagPlaceholder.appendChild(tagElement);

        existingTags.push(tag);
    }

    function filterCommands(filter) {
        const commandItems = document.querySelectorAll('#commandsList li');
        commandItems.forEach(item => {
            if (filter === 'Wszystkie' || item.dataset.category === filter || item.dataset.tag === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        const categoryLinks = document.querySelectorAll('#navbar a');
        categoryLinks.forEach(link => {
            link.classList.remove('active');
            link.querySelector('.underline').style.width = '0';
            if (link.dataset.category === filter) {
                link.classList.add('active');
                setTimeout(() => {
                    link.querySelector('.underline').style.width = '100%';
                }, 10);
            }
        });

        const tagElements = document.querySelectorAll('.tag');
        tagElements.forEach(tagElement => {
            tagElement.classList.remove('active');
            if (tagElement.textContent === `#${filter.toLowerCase().replace(/\s+/g, '-')}`) {
                tagElement.classList.add('active');
            }
        });

        detailsContainer.classList.add('hidden');
    }

    function showDetails(command, details, tag, przyklad) {
        detailsText.innerHTML = `<strong>${command}</strong><br>Użycie: ${details || ''}<br><br>Przykład: ${przyklad || 'Brak informacji o przykładzie.'}`;

        addTagToContainer(tag);
    
        detailsContainer.classList.remove('hidden');

        if (closeButton) {
            closeButton.remove();
        }
    
        closeButton = document.createElement('button');
        closeButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        closeButton.id = 'closeButton';
        closeButton.addEventListener('click', () => {
            detailsContainer.classList.add('hidden');
            closeButton.remove();
        });
        detailsContainer.appendChild(closeButton);
    
        setTimeout(() => {
            detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        document.body.scrollIntoView({ behavior: 'smooth' });
        document.documentElement.scrollIntoView({ behavior: 'smooth' });
    });
});