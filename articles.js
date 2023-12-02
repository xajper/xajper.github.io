const articles = [
    {
        title: "Party Activities",
        content: "Witaj! Mapa którą obecnie widzisz jest zbiorem różnych minigier...",
        author: "Xajper",
        downloads: 0
    },
    {
        title: "Clicker Evolved",
        content: "Cześć! Przychodzę do was z kolejną mapą pt. Clicker Evolved...",
        author: "Xajper",
        downloads: 0
    },
    {
        title: "Ostatnia Twierdza",
        content: "...",
    }
];

const storedArticles = JSON.parse(localStorage.getItem('articles'));


const allArticles = storedArticles || articles;

function saveToLocalStorage() {
    localStorage.setItem('articles', JSON.stringify(allArticles));
}

