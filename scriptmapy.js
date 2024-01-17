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
