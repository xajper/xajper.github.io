const firebaseConfigArtykuly = {
    apiKey: "AIzaSyBWOYsHghiKRepKMFRKMX6U4hf2A8A2QuM",
    authDomain: "sportowo-20862.firebaseapp.com",
    databaseURL: "https://sportowo-20862-default-rtdb.firebaseio.com",
    projectId: "sportowo-20862",
    storageBucket: "sportowo-20862.appspot.com",
    messagingSenderId: "823759230798",
    appId: "1:823759230798:web:b879d346fabf4045c8701f"
};

firebase.initializeApp(firebaseConfigArtykuly);
const db = firebase.firestore();
const auth = firebase.auth();

let currentPage = 1;
const articlesPerPage = 5;
let lastVisible = null; // Śledzi ostatni widoczny dokument

document.addEventListener('DOMContentLoaded', function () {
    checkUserAuthentication();
    displayXajperArticles(currentPage);
    setupPagination();
});

function setupPagination() {
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayXajperArticles(currentPage);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        displayXajperArticles(currentPage);
    });

    updatePageInfo();
}

function updatePageInfo() {
    const pageInfo = document.getElementById('page-info');
    pageInfo.textContent = `Strona ${currentPage}`;
}

async function displayXajperArticles(page) {
    const xajperArticlesContainer = document.getElementById('xajper-articles-container');
    xajperArticlesContainer.innerHTML = '';

    try {
        let query = db.collection('articles')
            .where('author', '==', 'Xajper')
            .orderBy('date', 'desc')
            .limit(articlesPerPage);

        if (page > 1) {
            if (lastVisible) {
                query = query.startAfter(lastVisible);
            }
        }

        const articlesSnapshot = await query.get();

        if (articlesSnapshot.empty) {
            xajperArticlesContainer.innerHTML = '<p>Brak artykułów napisanych przez Xajpera.</p>';
            return;
        }

        let articleCount = 0;

        articlesSnapshot.forEach(doc => {
            const article = doc.data();
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');

            const articleLink = document.createElement('a');
            articleLink.href = `https://xajper.github.io/sportowo?artykul=${doc.id}`;
            articleLink.target = '_blank';
            articleLink.innerText = article.title;

            articleElement.appendChild(articleLink);
            xajperArticlesContainer.appendChild(articleElement);

            articleCount++;
        });

        // Set the last visible document
        lastVisible = articlesSnapshot.docs[articlesSnapshot.docs.length - 1];

        // Update pagination buttons
        handlePaginationButtons(articleCount);
        updatePageInfo();
    } catch (error) {
        console.error('Error fetching articles: ', error);
        xajperArticlesContainer.innerHTML = '<p>Błąd podczas pobierania artykułów.</p>';
    }
}

async function handlePaginationButtons(articleCount) {
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    prevPageBtn.disabled = currentPage === 1;

    try {
        const totalArticlesSnapshot = await db.collection('articles').where('author', '==', 'Xajper').get();
        const totalArticles = totalArticlesSnapshot.size;

        nextPageBtn.disabled = (currentPage * articlesPerPage) >= totalArticles;
    } catch (error) {
        console.error('Error fetching total articles count: ', error);
    }
}

function checkUserAuthentication() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user && (user.email === 'xajperminecraftyt@gmail.com')) {
        const addArticleBtn = document.getElementById('add-article-btn');
        const articleForm = document.getElementById('article-form');
        const deleteArticleBtn = document.getElementById('delete-article-btn');
        const editArticleBtn = document.getElementById('edit-article-btn');

        if (addArticleBtn) addArticleBtn.style.display = 'block';

        if (user.email === 'xajperminecraftyt@gmail.com') {

        } else {
            if (articleForm) articleForm.style.display = 'none';
            if (deleteArticleBtn) deleteArticleBtn.style.display = 'none';
            if (editArticleBtn) editArticleBtn.style.display = 'none';
        }
    }
}