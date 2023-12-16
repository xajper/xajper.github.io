function performSearch() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const articles = document.getElementsByClassName("article");

    for (let i = 0; i < articles.length; i++) {
        const articleTitle = articles[i].getElementsByTagName("h2")[0].innerText.toLowerCase();

        if (articleTitle.includes(searchInput)) {
            articles[i].style.display = "flex";
        } else {
            articles[i].style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    function showArticles() {
        var articlesList = document.getElementById('articles-list');
        articlesList.style.display = 'flex';
        document.querySelector('.overlay').classList.add('active');
    }

    var animatedButton = document.querySelector('.animated-button');
    animatedButton.addEventListener('click', showArticles);
});

function hideArticles() {
    document.getElementById("articles-list").style.display = "none";
    document.querySelector('.overlay').classList.remove('active');
}

document.addEventListener("DOMContentLoaded", function () {
    const sword = document.getElementById("sword");

    sword.addEventListener("click", function () {
        sword.classList.toggle("clicked");
    });
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
}

document.addEventListener('click', function (event) {
    const sidebar = document.getElementById("sidebar");
    if (event.target.closest('.container') && sidebar.style.width === '250px') {
        toggleSidebar();
    }
});

function toggleSearch() {
    const searchbar = document.getElementById("searchbar");
    searchbar.style.transition = "top 0.3s";
    searchbar.style.top = searchbar.style.top === "10px" ? "-50px" : "10px";
}

function openImageModal(imageSrc) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");

    modal.style.display = "flex";
    modalImg.src = imageSrc;
}

let likeCount = 0;
let dislikeCount = 0;

function toggleLike(element) {
    const likeCountElement = document.getElementById("like-count");
    const likeOverlay = document.getElementById("like-overlay");

    element.classList.toggle("liked");

    if (element.classList.contains("liked")) {
        likeCount++;
        showReactionAnimation(likeOverlay, "+1");
    } else {
        likeCount--;
        showReactionAnimation(likeOverlay, "-1");
    }

    likeCountElement.textContent = likeCount;
}

function toggleDislike(element) {
    const dislikeCountElement = document.getElementById("dislike-count");
    const dislikeOverlay = document.getElementById("dislike-overlay");

    element.classList.toggle("disliked");

    if (element.classList.contains("disliked")) {
        dislikeCount++;
        showReactionAnimation(dislikeOverlay, "-1");
    } else {
        dislikeCount--;
        showReactionAnimation(dislikeOverlay, "+1");
    }

    dislikeCountElement.textContent = dislikeCount;
}

function showReactionAnimation(overlay, text) {
    overlay.textContent = text;
    overlay.style.display = "block";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 2000);
}

function showReactionAnimation(element, reaction) {

    const reactionElement = document.createElement("div");
    reactionElement.className = "reaction";
    reactionElement.textContent = reaction;

    reactionElement.style.animation = "reactionAnimation 1s ease-out";

    document.body.appendChild(reactionElement);

    const rect = element.getBoundingClientRect();
    reactionElement.style.top = rect.top + "px";
    reactionElement.style.left = rect.left + "px";

    reactionElement.addEventListener("animationend", () => {
        reactionElement.remove();
    });
}

document.styleSheets[0].insertRule(`
@keyframes reactionAnimation {
    0% { transform: translateY(0); opacity: 1; }
    50% { transform: translateY(-30px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
}
`, 0);

function closeImageModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".category-btn");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            buttons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            this.classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("myDIV");
    var btns = header.getElementsByClassName("btnprzycisk");

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = header.getElementsByClassName("active");
            current[0].classList.remove("active");
            this.classList.add("active");
        });
    }
});

function openModalPA() {
    const mapTitle = "Party Activities";
    const mapDescription = "Witaj!<br><br>" +
        "Mapa którą obecnie widzisz jest zbiorem różnych minigier. Party Activities jest mojego autorstwa i została stworzona dla maksymalnie DWÓCH graczy na wersję 1.19.4+! Gier jest PONAD 20 i na pewno każdy znajdzie coś dla siebie! Budowa tej mapy zajęła mi sporo czasu i włożyłem w nią sporo pracy, więc byłbym wdzięczny gdybyś ocenił ją zostawiając diaxa pod spodem. Możesz wbić na mój serwer discord gdzie uzyskasz dużo informacji o przedpremierowych mapach! Zaglądnij również na mój kanał na yt gdzie pokazuję jak tworzyć mapy. (https://discord.gg/QCnXbND9UZ)<br><br>" +
        "<strong>WAŻNE INFORMACJE:</strong><br>" +
        "» NIE klikaj wiadomości Wyjście [KLIKNIJ] do byle jakiej minigry, każda wiadomość jest indywidualna i przystosowana do każdej gry z osobna!!!<br>" +
        "» Jeśli jakimś cudem zepsujesz mapę, pobierz ją jeszcze raz!<br>" +
        "» Gdy nie działają ci klikane wiadomości, otwórz świat w LAN i włącz uprawnienia - jeśli jesteś na pojedynczym świecie, lub gdy grasz na serwerze ze znajomym, daj sobie i koledze uprawnienia operatora serwera.<br>" +
        "» Masz jakieś pytania lub pojawił się bug? Napisz do mnie na dc (Xajper), na moim serwerze discord lub w komentarzach pod tą mapą.";

    const mapOcenaHTML = `
        <h2>Oceny Użytkowników</h2>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <p>Średnia 5,0 na podstawie 1 oceny</p>
        <hr style="border:3px solid #f1f1f1">
        
        <div class="row">
            <div class="side">
                <div>5</div>
            </div>
            <div class="middle">
                <div class="bar-container">
                    <div class="bar-5"></div>
                </div>
            </div>
            <div class="side right">
                <div>1</div>
            </div>
            <div class="side">
                <div>4</div>
            </div>
            <div class="middle">
                <div class="bar-container">
                    <div class="bar-4"></div>
                </div>
            </div>
            <div class="side right">
                <div>0</div>
            </div>
            <div class="side">
                <div>3</div>
            </div>
            <div class="middle">
                <div class="bar-container">
                    <div class="bar-3"></div>
                </div>
            </div>
            <div class="side right">
                <div>0</div>
            </div>
            <div class="side">
                <div>2</div>
            </div>
            <div class="middle">
                <div class="bar-container">
                    <div class="bar-2"></div>
                </div>
            </div>
            <div class="side right">
                <div>0</div>
            </div>
            <div class="side">
                <div>1</div>
            </div>
            <div class="middle">
                <div class="bar-container">
                    <div class="bar-1"></div>
                </div>
            </div>
            <div class="side right">
                <div>0</div>
            </div>
        </div>`;

    document.getElementById("mapTitle").innerText = mapTitle;
    document.getElementById("mapDescription").innerHTML = mapDescription;
    document.getElementById("mapocena").innerHTML = mapOcenaHTML;

    const myModal = document.getElementById("myModal");
    myModal.style.display = "flex";
    setTimeout(function () {
        myModal.classList.add("show");
    }, 10);
}

function openModalCE() {
    document.getElementById("mapTitle").innerText = "Clicker Evolved";
    document.getElementById("mapDescription").innerHTML = "Cześć!<br><br>" +
        "Przychodzę do was z kolejną mapą pt. Clicker Evolved.<br>" +

        "Mapa jest dla jednego gracza i na wersję 1.19!<br>" +

        "By przejść mapę należy uzbroić się na walkę z mobami i ich artefaktami a na koniec z witherem.<br>" +
        "Pokonanie Withera = przejście mapy.<br>" +
        "Dajcie jeszcze chwilkę, wyjaśnię tylko na czym polega doświadczenie w grze:<br>" +
        "Jest to system który wynagradza cię za czas spędzony na ARENIE. Nagrody są różne (od golda, refów do różnych potek).<br>" +

        "Chcesz dowiedzieć się co zawiera aktualizacja? Pobierz mapę i się przekonaj!";

    document.getElementById("mapocena").innerHTML = `
        <h2>Oceny Użytkowników</h2>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <p>Średnia 5,0 na podstawie 1 oceny</p>
        <hr style="border:3px solid #f1f1f1">

        <div class="row">
          <div class="side">
            <div>5</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-5"></div>
            </div>
          </div>
          <div class="side right">
            <div>1</div>
          </div>
          <div class="side">
            <div>4</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-4"></div>
            </div>
          </div>
          <div class="side right">
            <div>0</div>
          </div>
          <div class="side">
            <div>3</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-3"></div>
            </div>
          </div>
          <div class="side right">
            <div>0</div>
          </div>
          <div class="side">
            <div>2</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-2"></div>
            </div>
          </div>
          <div class="side right">
            <div>0</div>
          </div>
          <div class="side">
            <div>1</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-1"></div>
            </div>
          </div>
          <div class="side right">
            <div>0</div>
          </div>
        </div>`;

    document.getElementById("myModal").style.display = "flex";
    setTimeout(function () {
        document.getElementById("myModal").classList.add("show");
    }, 10);
}

function closeModal() {
    document.getElementById("myModal").classList.remove("show");
    setTimeout(function () {
        document.getElementById("myModal").style.display = "none";
    }, 300);
}

function filterArticles() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const articles = document.querySelectorAll('.articles-list article');

    articles.forEach(article => {
        const title = article.querySelector('h2').innerText.toLowerCase();
        const shouldShow = title.includes(searchInput);

        if (shouldShow) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

const allArticles = [
    {
        title: "Party Activities",
        content: "Witaj! Mapa którą obecnie widzisz jest zbiorem różnych minigier..."
    },
    {
        title: "Clicker Evolved",
        content: "Cześć! Przychodzę do was z kolejną mapą pt. Clicker Evolved..."
    },
];

const articles = allArticles;

articles.forEach((article, index) => {
    document.getElementById(`article-title-${index}`).innerText = article.title;
    document.getElementById(`article-content-${index}`).innerText = article.content;
});

function openLoginModal() {
    document.getElementById('loginModal').classList.add('show');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
}
