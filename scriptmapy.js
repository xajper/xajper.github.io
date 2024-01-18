document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const newButton = document.getElementById('new-button');
    const popularneButton = document.getElementById('popularne-button');
    const pvpButton = document.getElementById('pvp-button');
    const fabularneButton = document.getElementById('fabularne-button');
    const przygodoweButton = document.getElementById('przygodowe-button');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const tag = button.innerText.toLowerCase();
            showMapsByTag(tag);
        });
    });

    newButton.addEventListener('click', function () {
        toggleButton(newButton);
        showMapsByTag('nowe');
    });

    popularButton.addEventListener('click', function () {
        toggleButton(popularneButton);
        showMapsByTag('popularne');
    });

    pvpButton.addEventListener('click', function () {
        toggleButton(pvpButton);
        showMapsByTag('pvp');
    });

    fabularneButton.addEventListener('click', function () {
        toggleButton(fabularneButton);
        showMapsByTag('fabularne');
    });

    przygodoweButton.addEventListener('click', function () {
        toggleButton(przygodoweButton);
        showMapsByTag('przygodowe');
    });
});

function showMapsByTag(tag) {
    console.log(`Pokazywanie map z tagiem: ${tag}`);
}

function toggleButton(button) {
    button.classList.toggle('active');
}

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
    var listaMapButton = document.querySelector('.category-btn.listamap');
  
    function showArticles() {
      var articlesList = document.getElementById('articles-list');
      var overlay = document.querySelector('.overlay');
  
      articlesList.style.display = 'flex';
      overlay.classList.add('active');
      listaMapButton.style.visibility = 'hidden';  
      listaMapButton.style.opacity = '0';  
        
      
      setTimeout(() => {
        listaMapButton.style.visibility = 'visible';
        listaMapButton.style.opacity = '1';
      }, 2000);
    }
  
    var animatedButton = document.querySelector('.animated-button');
    animatedButton.addEventListener('click', showArticles);
  
    function hideArticles() {
      var articlesList = document.getElementById('articles-list');
      var overlay = document.querySelector('.overlay');
  
      articlesList.style.display = 'none';
      overlay.classList.remove('active');
    }
  
    var closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', hideArticles);
  
    listaMapButton.addEventListener('click', showArticles);
});

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

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById('modalImage');
    var images = document.querySelectorAll('.myImages');
    var closeBtn = document.querySelector('.close');

    function openImageModal(imageSrc) {
        modal.style.display = 'flex';
        modalImg.src = imageSrc;
        modal.classList.add('show');
    }

    function closeImageModal() {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }

    images.forEach(function (image) {
        image.addEventListener('click', function () {
            var imageSrc = this.getAttribute('src');
            openImageModal(imageSrc);
        });
    });

    closeBtn.addEventListener('click', closeImageModal);

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeImageModal();
        }
    });
});

let likeCounts = {};
let dislikeCounts = {};

function toggleLike(element, articleId) {
    const likeCountElement = document.getElementById(`like-count-${articleId}`);
    const likeOverlay = document.getElementById(`like-overlay-${articleId}`);

    if (!likeCounts[articleId]) {
        likeCounts[articleId] = 0;
    }

    element.classList.toggle("liked");

    if (element.classList.contains("liked")) {
        likeCounts[articleId]++;
        showReactionAnimation(likeOverlay, "+1");
    } else {
        likeCounts[articleId]--;
        showReactionAnimation(likeOverlay, "-1");
    }

    likeCountElement.textContent = likeCounts[articleId];
}

function toggleDislike(element, articleId) {
    const dislikeCountElement = document.getElementById(`dislike-count-${articleId}`);
    const dislikeOverlay = document.getElementById(`dislike-overlay-${articleId}`);

    if (!dislikeCounts[articleId]) {
        dislikeCounts[articleId] = 0;
    }

    element.classList.toggle("disliked");

    if (element.classList.contains("disliked")) {
        dislikeCounts[articleId]++;
        showReactionAnimation(dislikeOverlay, "-1");
    } else {
        dislikeCounts[articleId]--;
        showReactionAnimation(dislikeOverlay, "+1");
    }

    dislikeCountElement.textContent = dislikeCounts[articleId];
}

function showReactionAnimation(overlay, text) {
    overlay.textContent = text;
    overlay.style.display = "block";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 1000); 
}

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
        "Mapa którą obecnie widzisz jest zbiorem różnych minigier." +
        "» Party Activities jest mojego autorstwa i została stworzona dla maksymalnie DWÓCH graczy na wersję 1.19.4+!<br>" +
        "» Gier jest PONAD 20 i na pewno każdy znajdzie coś dla siebie! Budowa tej mapy zajęła mi sporo czasu i włożyłem w nią sporo pracy, więc byłbym wdzięczny gdybyś ocenił ją zostawiając diaxa pod spodem.<br>" +
        "» Możesz wbić na mój serwer discord gdzie uzyskasz dużo informacji o przedpremierowych mapach!<br>" +
        "» Zaglądnij również na mój kanał na yt gdzie pokazuję jak tworzyć mapy. (https:
        "<strong>WAŻNE INFORMACJE:</strong><br>" +
        "» NIE klikaj wiadomości Wyjście [KLIKNIJ] do byle jakiej minigry, każda wiadomość jest indywidualna i przystosowana do każdej gry z osobna!!!<br>" +
        "» Jeśli jakimś cudem zepsujesz mapę, pobierz ją jeszcze raz!<br>" +
        "» Gdy nie działają ci klikane wiadomości, otwórz świat w LAN i włącz uprawnienia - jeśli jesteś na pojedynczym świecie,<br>" +
        "» lub gdy grasz na serwerze ze znajomym, daj sobie i koledze uprawnienia operatora serwera.<br>" +
        "» Masz jakieś pytania lub pojawił się bug? Napisz do mnie na dc (Xajper), na moim serwerze discord lub w komentarzach pod tą mapą.";

    document.getElementById("mapTitle").innerText = mapTitle;
    document.getElementById("mapDescription").innerHTML = mapDescription;

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


function toggleTags() {
    var tagsSection = document.getElementById("tags-section");
    var tagsToggleIcon = document.getElementById("tags-toggle-icon");

    
    var isTagsVisible = tagsSection.classList.contains("visible");

    
    if (!isTagsVisible) {
        
        tagsSection.classList.add("visible");
        tagsToggleIcon.style.transform = "rotate(180deg)";
        tagsToggleIcon.style.transition = "transform 0.5s ease"; 
    } else {
        
        tagsSection.classList.remove("visible");
        tagsToggleIcon.style.transform = "rotate(0deg)";
        tagsToggleIcon.style.transition = "transform 0.5s ease"; 
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var listaMapButton = document.querySelector('.category-btn.listamap');
    var articlesList = document.getElementById('articles-list');
    var overlay = document.querySelector('.overlay');

    function showArticles() {
        articlesList.style.display = 'flex';
        overlay.classList.add('active');
        listaMapButton.style.visibility = 'hidden';
        listaMapButton.style.opacity = '0';

        setTimeout(() => {
            listaMapButton.style.visibility = 'visible';
            listaMapButton.style.opacity = '1';
        }, 2000);
    }

    var animatedButton = document.querySelector('.animated-button');
    animatedButton.addEventListener('click', showArticles);

    function hideArticles() {
        articlesList.style.display = 'none';
        overlay.classList.remove('active');
    }

    var closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', hideArticles);

    listaMapButton.addEventListener('click', showArticles);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            articlesList.classList.add('active');
        } else {
            articlesList.classList.remove('active');
        }
    });
});

var header = document.querySelector ("header");
var articlesList = document.getElementById ("articles-list");

header.addEventListener ("click", function () {
  articlesList.scrollIntoView ({behavior: "smooth"});
});

document.addEventListener("DOMContentLoaded", function() {
    const buttonPobierz = document.querySelector(".buttonpobierz");
    const overlay = document.getElementById("overlay");

    buttonPobierz.addEventListener("click", function() {
        
        overlay.style.display = "flex";

        
        simulateDownloadProcess();
    });

    
    function simulateDownloadProcess() {
        const progressBar = document.querySelector(".bar span");
        let progress = 0;

        const downloadInterval = setInterval(function() {
            progress += 1;
            progressBar.style.width = `${progress}%`;

            if (progress === 100) {
                
                overlay.style.display = "none";
                clearInterval(downloadInterval);
            }
        }, 100); 
    }
});

function startDownload() {
    var progressBar = document.querySelector('.progress .bar span');
    var completionText = document.querySelector('.progress .completion');
    var doneIcon = document.getElementById("done");

    var progress = 0;
    var intervalId = setInterval(function () {
        progress += 1;
        progressBar.style.width = progress + '%';
        completionText.innerHTML = progress + '%';

        if (progress >= 100) {
            clearInterval(intervalId);
            doneIcon.style.display = 'block';
            
            setTimeout(function () {
                window.location.href = 'mapy.html';
            }, 1000);
        }
    }, 50);
}
