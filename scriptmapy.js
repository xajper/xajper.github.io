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

function closeImageModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

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

function toggleLike(icon) {
    icon.classList.toggle("liked");
}

function openModalPA() {
    // ... (Kod dla otwierania modala dla Party Activities)
}

function openModalCE() {
    // ... (Kod dla otwierania modala dla Clicker Evolved)
}

function closeModal() {
    document.getElementById("myModal").classList.remove("show");
    setTimeout(function () {
        document.getElementById("myModal").style.display = "none";
    }, 300);
}
