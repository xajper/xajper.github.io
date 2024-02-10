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

const database1 = firebase.database();

auth.onAuthStateChanged(user => {
    const addArticleBtn = document.getElementById('add-article-btn');
    const articleForm = document.getElementById('article-form');
    const deleteArticleBtn = document.getElementById('delete-article-btn');
    const editArticleBtn = document.getElementById('edit-article-btn');

    if (user) {
        // Jeśli użytkownik jest zalogowany, sprawdź jego adres e-mail
        const allowedEmails = ['xajperminecraftyt@gmail.com', 'KsaverX@interia.pl'];

        if (allowedEmails.includes(user.email)) {
            // Jeśli adres e-mail jest na liście dozwolonych, pokaż przycisk addArticleBtn
            addArticleBtn.style.display = 'block';

            if (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'KsaverX@interia.pl') {
                // Jeśli użytkownik to Xajper, pokaż formularz artykułu
            } else {
                // Jeśli użytkownik to inny dziennikarz, ukryj formularz artykułu
                articleForm.style.display = 'none';
                deleteArticleBtn.style.display = 'none';
                editArticleBtn.style.display = 'none';
            }
        } else {
            // Jeśli adres e-mail nie jest na liście dozwolonych, ukryj przycisk addArticleBtn
            addArticleBtn.style.display = 'none';
            articleForm.style.display = 'none';
            deleteArticleBtn.style.display = 'none';
            editArticleBtn.style.display = 'none';
        }
    } else {
        // Jeśli użytkownik nie jest zalogowany, ukryj przycisk addArticleBtn
        addArticleBtn.style.display = 'none';
        articleForm.style.display = 'none';
        deleteArticleBtn.style.display = 'none';
        editArticleBtn.style.display = 'none';
    }
});

const addArticleBtn = document.getElementById('add-article-btn');
const articleForm = document.getElementById('article-form');
const loginForm = document.getElementById('login-form');
const publishBtn = document.getElementById('publish-btn');
const logoutBtn = document.getElementById('logout-btn');
const deleteArticleBtn = document.getElementById('delete-article-btn');
const editArticleBtn = document.getElementById('edit-article-btn');

const articlesContainer = document.getElementById('main-article');
const loadMoreBtn = document.getElementById('load-more-btn');
let currentBatch = 5;
const batchIncrement = 5;

document.addEventListener('DOMContentLoaded', function () {
    checkUserAuthentication();
    displayArticles();
    displayLatestArticles();
    displayPopularArticles();
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
  
document.addEventListener('DOMContentLoaded', function () {
    var articleIdParam = getParameterByName('artykul');

    if (articleIdParam) {
        scrollToArticle(articleIdParam);
    }

    var currentArticle = getParameterByName('artykul');
    if (currentArticle) {
        document.getElementById(currentArticle).classList.add('selected');
    }

    window.onload = function () {
        if (currentArticle) {
            scrollToArticle(currentArticle);
        }
    };
});


addArticleBtn.addEventListener('click', () => {
    // Sprawdzamy, czy użytkownik jest zalogowany
    const user = auth.currentUser;

    if (user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'KsaverX@interia.pl')) {
        // Jeśli użytkownik jest zalogowany i to jest konto Xajpera, wywołujemy funkcję dodawania artykułu
        articleForm.style.display = 'block';
    } else {
        // Jeśli użytkownik nie jest zalogowany lub to nie jest konto Xajpera, wywołujemy funkcję logowania
        loginUser();
    }
});

logoutBtn.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            articleForm.style.display = 'none';
            addArticleBtn.style.display = 'block';
            document.getElementById('article-title').value = '';
            document.getElementById('article-content').value = '';
            document.getElementById('article-image').value = '';

            displayMessage('Wylogowano pomyślnie!', 'success');

            location.reload();
        })
        .catch((error) => {
            console.error('Błąd podczas wylogowywania:', error);
        });
});

function loginUser() {
    const email = prompt('Proszę podać swój email:');
    const password = prompt('Proszę podać swoje hasło:');

    if (validate_email(email) && validate_password(password)) {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                articleForm.style.display = 'block';
                displayMessage('Zalogowano pomyślnie!', 'success');
            })
            .catch((error) => {
                displayMessage('Nieprawidłowy email lub hasło. Nie udało się zalogować.', 'danger');
                console.error('Błąd podczas logowania:', error);
                articleForm.style.display = 'none';
            });
    } else {
        displayMessage('Nieprawidłowy email lub hasło. Nie udało się zalogować.', 'danger');
    }
}

function checkUserAuthentication() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'KsaverX@interia.pl')) {
        // Ustaw widoczność odpowiednich elementów na stronie (dodaj swoje odpowiednie operacje)
        const addArticleBtn = document.getElementById('add-article-btn');
        const articleForm = document.getElementById('article-form');
        const deleteArticleBtn = document.getElementById('delete-article-btn');
        const editArticleBtn = document.getElementById('edit-article-btn');

        addArticleBtn.style.display = 'block';

        if (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'KsaverX@interia.pl') {

        } else {
            articleForm.style.display = 'none';
            deleteArticleBtn.style.display = 'none';
            editArticleBtn.style.display = 'none';
        }
    }
}

function getCurrentTimestamp() {
    return new Date().toISOString();
}

function getAuthor() {
    // Tutaj możesz dostarczyć logiczne pobieranie autora, np. zalogowanego użytkownika itp.
    return 'Autor';
}

function cancelArticle() {
    articleForm.style.display = 'none';
    document.getElementById('preview-section').style.display = 'none';
}

function displayMessage(message, type) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `alert alert-${type}`;
    messageContainer.textContent = message;

    document.body.insertBefore(messageContainer, document.body.firstChild);

    setTimeout(() => {
        messageContainer.remove();
    }, 3000);
}

async function addArticle() {
    const addArticleBtn = document.getElementById('add-article-btn');
    addArticleBtn.disabled = true;

    const title = document.getElementById('article-title').value;
    let content = document.getElementById('article-content').value;
    const imageInput = document.getElementById('article-image');
    const selectedTags = getSelectedTags();

    // Zamień znaki nowej linii na tagi <br> w HTML
    content = content.split('\n').join('<br>');

    if (selectedTags.length === 0) {
        displayMessage('Proszę wybrać co najmniej jeden tag.', 'danger');
        addArticleBtn.disabled = false;
        return;
    }

    if (imageInput.files.length > 0) {
        const imageFile = imageInput.files[0];

        const storageRef = firebase.storage().ref('article_images/' + imageFile.name);
        const uploadTask = storageRef.put(imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                displayMessage(`Dodawanie artykułu: ${progress.toFixed(2)}%`, 'warning');
            },
            async (error) => {
                console.error('Error: ', error);
                displayMessage('Błąd podczas ładowania obrazu.', 'danger');
                addArticleBtn.disabled = false;
            },
            async () => {
                try {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    const { nextNumber, addedArticleId } = await getNextArticleNumber(title);

                    db.collection('articles')
                        .doc(addedArticleId)
                        .set({
                            title: title,
                            content: content,
                            image: downloadURL,
                            tags: selectedTags,
                            date: new Date().toISOString(),
                            author: 'Xajper',
                            articleId: addedArticleId,
                            views: 0,
                        })
                        .then(() => {
                            // Dodaj komentarz do artykułu
                            const commentText = 'Mamy nadzieję, że artykuł wam się spodobał';
                            addCommentToArticle(addedArticleId, commentText);

                            document.getElementById('article-title').value = '';
                            document.getElementById('article-content').value = '';
                            imageInput.value = '';

                            displayMessage('Artykuł dodany pomyślnie!', 'success');
                            addArticleBtn.disabled = false;
                            displayArticles();
                            displayLatestArticles();
                        })
                        .catch((error) => {
                            console.error('Error: ', error);
                            displayMessage('Błąd podczas dodawania artykułu.', 'danger');
                            addArticleBtn.disabled = false;
                        });
                } catch (error) {
                    console.error('Error: ', error);
                    displayMessage('Błąd podczas uzyskiwania URL obrazu.', 'danger');
                    addArticleBtn.disabled = false;
                }
            }
        );
    } else {
        displayMessage('Proszę wybrać plik graficzny.', 'danger');
        addArticleBtn.disabled = false;
    }
}

function previewArticle() {
    const titleElement = document.getElementById('article-title');
    const contentElement = document.getElementById('article-content');

    if (!titleElement || !contentElement) {
        console.error('Nie można znaleźć elementów article-title lub article-content.');
        return;
    }

    const title = titleElement.value;
    const content = parseContent(contentElement.value); // Użyj funkcji parseContent do formatowania treści
    const selectedTags = getSelectedTags();

    const previewSection = document.getElementById('preview-section');
    const previewContent = document.getElementById('preview-content');

    if (!previewSection || !previewContent) {
        console.error('Nie można znaleźć elementów preview-section lub preview-content.');
        return;
    }

    // Wygeneruj HTML z wybranymi tagami
    const tagsHtml = selectedTags.map(tag => `<span class="tag">${tag}</span>`).join('');

    previewContent.innerHTML = `
        <h3>${title}</h3>
        <div class="preview-article-content">${content}</div>
        <p>${tagsHtml}</p>
    `;

    previewSection.style.display = 'block';
}

function parseContent(content) {
    // Przetwarzanie treści artykułu
    const formattedContent = content
        .replace(/(?:\r\n|\r|\n)/g, '<br>') // Zamień nowe linie na tagi <br>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Pogrubienie
        .replace(/__(.*?)__/g, '<u>$1</u>') // Podkreślenie
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Kursywa
        .replace(/~~(.*?)~~/g, '<del>$1</del>') // Przekreślenie
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>'); // Link

    return formattedContent;
}

function closePreview() {
    const previewSection = document.getElementById('preview-section');
    previewSection.style.display = 'none';
}

async function getNextArticleNumber(title) {
    try {
        const querySnapshot = await db.collection('articles')
            .orderBy('articleId', 'desc')
            .limit(1)
            .get();

        let lastArticleId = 0;

        querySnapshot.forEach((doc) => {
            lastArticleId = doc.data().articleId;
        });

        const nextNumber = lastArticleId + 1;

        return { nextNumber, addedArticleId: generateArticleIdFromTitle(title) };
    } catch (error) {
        console.error('Error getting next article number:', error);
        throw error;
    }
}

function generateArticleIdFromTitle(title) {
    const polishCharacters = {
        'ą': 'a',
        'ć': 'c',
        'ę': 'e',
        'ł': 'l',
        'ń': 'n',
        'ó': 'o',
        'ś': 's',
        'ź': 'z',
        'ż': 'z',
    };

    // Replace Polish characters with non-accented counterparts
    return title
        .replace(/[ąćęłńóśźż]/g, char => polishCharacters[char] || char)
        .toLowerCase()
        .split(' ')
        .join('-');
}

function getNextArticleId(articleNumber) {
    return `${articleNumber}`;
}

function displayArticles() {
    const mainArticle = document.getElementById('main-article');
    mainArticle.classList.add('loading');

    const loadMoreBtn = document.getElementById('load-more-btn');

    const loadingText = document.createElement('div');
    loadingText.id = 'loading-text';
    loadingText.style.fontSize = '1.2em';
    loadingText.style.color = '#333';
    loadingText.style.position = 'fixed';
    loadingText.style.top = '50%';
    loadingText.style.left = '50%';
    loadingText.style.transform = 'translate(-50%, -50%)';
    mainArticle.appendChild(loadingText);

    let loadingAnimation = 0;

    function updateLoadingText() {
        loadingText.textContent = 'Wczytywanie artykułów' + '.'.repeat(loadingAnimation % 4);
        loadingAnimation++;
    }

    auth.onAuthStateChanged(user => {
        db.collection('articles')
            .orderBy('date', 'desc')
            .limit(currentBatch)
            .get()
            .then((querySnapshot) => {
                mainArticle.innerHTML = '';
                mainArticle.classList.remove('loading');

                querySnapshot.forEach((doc) => {
                    const articleElement = document.createElement('div');
                    articleElement.setAttribute('id', doc.id);
                    articleElement.className = 'article-link';
                    articleElement.setAttribute('data-tags', doc.data().tags.join(', '));
                    articleElement.setAttribute('data-date', doc.data().date);
            
                    const imageUrl = doc.data().image;
            
                    articleElement.innerHTML = `
                        <h3 style="display: none;"><a href="?artykul=${doc.id}">${doc.data().title}</a></h3>
                        <span class="hover-bar"></span>
                        <div class="content" style="display: none;">${doc.data().content.replace(/\n/g, '<br>')}</div>
                        <div class="image-container">
                            <img class="placeholder" src="${imageUrl}" alt="ZDJĘCIE">
                            <div class="image-title">
                                <h3><a href="javascript:void(0);" onclick="zobacz('${doc.id}', '${doc.data().articleId}')">${doc.data().title}</a></h3>
                            </div>
                        </div>
                        <p style="display: none;"><i class="fas fa-hashtag"></i> ${doc.data().tags.join(', ')}</p>
                        <p><i class="far fa-clock"></i> ${formatTimestamp(doc.data().date)}</p>
                        <p style="display: none;"><i class="fas fa-user" id="author">${doc.data().author}</i></p>
                        <button class="save-button" id="saveButton">
                            <i class="fas fa-bookmark"></i>
                            <div class="fireworks"></div>
                        </button>
                        <button class="udostepnij-button" onclick="udostepnij('${doc.id}', event, this)">
                            <i class="fas fa-share"></i>
                            <div class="fireworks"></div>
                            <div class="sukces-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                        </button>

                        <button class="add-comment-button" onclick="toggleCommentSection('${doc.id}')"><i class="fas fa-comment"></i>
                        </button>
                        <div id="comment-section-${doc.id}" class="comment-section" style="display: none;">
                            <textarea id="comment-input-${doc.id}" placeholder="Napisz komentarz..."></textarea>
                            <button class="btn btn-outline-primary" onclick="addCommentToArticle('${doc.id}')">Prześlij <i class="fas fa-arrow-right"></i></button>
                            <div id="commentsList-${doc.id}" class="container cont"></div>
                        </div>

                        ${user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'KsaverX@interia.pl') ? `<button class="delete-button" onclick="deleteArticle('${doc.id}')"><i class="fas fa-trash"></i></button>` : ''}
                        ${user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'KsaverX@interia.pl') ? `<button class="edit-button" onclick="editArticle('${doc.id}')"><i class="fas fa-hand"></i></button>` : ''}
                        <hr>
                    `;
            
                    articlesContainer.appendChild(articleElement);
                });

                // Add the "Load More" button after all articles have been processed
                articlesContainer.innerHTML += `<button class="load-more-btn" id="load-more-btn" onclick="loadMoreArticles()">Załaduj więcej</button>`;

                // Check if loadMoreBtn is not null before accessing its style property
                if (loadMoreBtn) {
                    loadMoreBtn.style.display = querySnapshot.size >= currentBatch ? 'block' : 'none';
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
                mainArticle.innerHTML = 'Błąd ładowania artykułów';
                mainArticle.classList.remove('loading');
            })
            .finally(() => {
                clearInterval(loadingInterval);
            });
    });

    // Update loading text every 500 milliseconds
    const loadingInterval = setInterval(updateLoadingText, 500);
    updateLoadingText();  // Initial loading text
}

function loadMoreArticles() {
    currentBatch += batchIncrement;
    displayArticles();
}

function sortByTag(tag) {
    // Zaznacz kliknięty tag
    const tagLinks = document.querySelectorAll('#article-tags li a');
    tagLinks.forEach(tagLink => {
        tagLink.classList.remove('clicked');
        if (tagLink.textContent.trim() === tag) {
            tagLink.classList.add('clicked');
        }
    });

    const articlesContainer = document.getElementById('main-article');
    const articles = articlesContainer.querySelectorAll('.article-link');

    const filteredArticles = Array.from(articles).filter(article => {
        const articleTags = article.getAttribute('data-tags').split(', ');
        return tag ? articleTags.includes(tag) : true;
    });

    const sortedArticles = filteredArticles.sort((a, b) => {
        const aDate = new Date(a.getAttribute('data-date'));
        const bDate = new Date(b.getAttribute('data-date'));
        return bDate - aDate;
    });

    articlesContainer.innerHTML = '';
    sortedArticles.forEach(article => {
        articlesContainer.appendChild(article);
    });

    const articleCount = sortedArticles.length;
    displayMessage(`Ilość artykułów w tej kategorii: ${articleCount}!`, 'success');
}

function editArticle(articleId) {
    console.log(articleId);
    const articleRef = db.collection('articles').doc(articleId);

    // Pobierz referencje do elementów formularza
    const editedTitleInput = document.getElementById('edited-article-title');
    const editedContentInput = document.getElementById('edited-article-content');
    const editedImageInput = document.getElementById('edited-article-image');

    articleRef.get()
        .then((doc) => {
            if (doc.exists) {
                // Ustaw wartości pól formularza na aktualne wartości artykułu
                editedTitleInput.value = doc.data().title;
                editedContentInput.value = doc.data().content;
                // Możesz dodać inne pola, jeśli są dostępne w formularzu

                // Wyświetl formularz edycji
                displayEditForm();
            } else {
                console.log('Artykuł nie istnieje');
            }
        })
        .catch((error) => {
            console.error('Błąd podczas pobierania artykułu:', error);
        });
}
  
function displayEditForm() {
    // Ukryj formularz dodawania artykułu
    document.getElementById('article-form').style.display = 'none';
  
    // Pobierz referencje do elementów formularza edycji
    const editForm = document.getElementById('edit-article-form');
  
    // Wyświetl formularz edycji
    editForm.style.display = 'block';
}
  
function saveEditedArticle(articleId) {
    const editedTitle = document.getElementById('edited-article-title').value;
    const editedContent = document.getElementById('edited-article-content').value;
    const editedImageInput = document.getElementById('edited-article-image');
    const selectedTags = getSelectedTags();

    if (editedTitle && editedContent) {
        db.collection('articles')
            .doc(articleId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const articleData = doc.data();
                    const updateData = {
                        title: editedTitle,
                        content: editedContent,
                        tags: selectedTags
                    };

                    if (editedImageInput.files.length > 0) {
                        // If a new image is selected, upload it
                        const editedImageFile = editedImageInput.files[0];
                        const storageRef = firebase.storage().ref('article_images/' + editedImageFile.name);
                        const uploadTask = storageRef.put(editedImageFile);

                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                // Handle upload progress if needed
                            },
                            (error) => {
                                console.error('Error: ', error);
                                displayMessage('Błąd podczas ładowania obrazu.', 'danger');
                            },
                            () => {
                                // After successful upload, get the download URL
                                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                    updateData.image = downloadURL;
                                    updateArticle(articleId, updateData);
                                });
                            }
                        );
                    } else {
                        // If no new image is selected, update only text data
                        updateArticle(articleId, updateData);
                    }
                } else {
                    console.log('Artykuł nie istnieje');
                    displayMessage('Artykuł nie istnieje w bazie danych.', 'danger');
                }
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania artykułu:', error);
            });
    } else {
        displayMessage('Tytuł i treść artykułu są wymagane.', 'danger');
    }
}

function updateArticle(articleId, updateData) {
    db.collection('articles')
        .doc(articleId)
        .update(updateData)
        .then(() => {
            displayMessage('Artykuł został zaktualizowany pomyślnie!', 'success');
            displayArticles();
            displayLatestArticles();
            cancelEdit();
        })
        .catch((error) => {
            console.error('Error: ', error);
            displayMessage('Błąd podczas zapisywania edytowanego artykułu.', 'danger');
        });
}

function cancelEdit() {
    const articleEditForm = document.getElementById('edit-article-form');

    if (articleEditForm) {
        articleEditForm.style.display = 'none';
    } else {
        console.error("Element 'edit-article-form' nie został znaleziony.");
    }
}

function deleteArticle(articleId) {
    const user = auth.currentUser;

    if (user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'KsaverX@interia.pl')) {
        const confirmed = confirm('Czy na pewno chcesz usunąć ten artykuł?');

        if (confirmed) {
            db.collection('articles').doc(articleId).delete()
                .then(() => {
                    displayMessage('Artykuł usunięty pomyślnie!', 'success');
                    displayArticles();
                })
                .catch((error) => {
                    console.error('Error: ', error);
                });
        }
    } else {
        console.error('Brak uprawnień do usunięcia artykułu.');
    }
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`;
}

function displayLatestArticles() {
    const latestArticlesList = document.getElementById('latest-articles-list').getElementsByTagName('ul')[0];

    db.collection('articles')
        .orderBy('date', 'desc')
        .limit(3)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const li = document.createElement('li');
                const a = document.createElement('a');

                const addedArticleId = doc.data().addedArticleId || '';
                const articleId = `${doc.id}`;

                a.href = `?artykul=${articleId}`;
                a.textContent = doc.data().title;

                // Dodaj tutaj funkcję articleaddedit, przekazując odpowiednie wartości
                a.onclick = function (event) {
                    event.preventDefault();

                    // Set id attribute on the li element based on doc.id
                    if (!document.getElementById(articleId)) {
                        li.setAttribute('id', articleId);
                    }

                    zobacz(doc.id, doc.data().articleId);
                };

                li.appendChild(a);
                latestArticlesList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}

function displayPopularArticles() {
    const popularArticlesList = document.getElementById('popular-articles-list').getElementsByTagName('ul')[0];

    db.collection('articles')
        .orderBy('views', 'desc') // Załóżmy, że masz pole 'views' w dokumentach reprezentujących artykuły
        .limit(3)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const li = document.createElement('li');
                const a = document.createElement('a');

                const addedArticleId = doc.data().addedArticleId || '';
                const articleId = `${doc.id}`;

                a.href = `?artykul=${articleId}`;
                a.textContent = doc.data().title;

                // Dodaj tutaj funkcję articleaddedit, przekazując odpowiednie wartości
                a.onclick = function (event) {
                    event.preventDefault();

                    // Set id attribute on the li element based on doc.id
                    if (!document.getElementById(articleId)) {
                        li.setAttribute('id', articleId);
                    }

                    zobacz(doc.id, doc.data().articleId);
                };

                li.appendChild(a);
                popularArticlesList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}

function toggleTagOptionsVisibility() {
    const tagCheckboxes = document.getElementById('tag-checkboxes');
    const tagOptions = document.getElementById('tag-options');

    if (tagCheckboxes.style.display === 'block') {
        tagCheckboxes.style.display = 'none';
        tagOptions.style.display = 'none';
    } else {
        tagCheckboxes.style.display = 'block';
        tagOptions.style.display = 'flex';
        updateTagOptions();
    }
}

function updateTagOptions() {
    const tagOptions = document.getElementById('tag-options');

    const availableTags = [
        'INNE', 'KOLARSTWO', 'E-SPORT', 'PIŁKA NOŻNA', 'LEKKOATLETYKA',
        'TENIS', 'KOSZYKÓWKA', 'SIATKÓWKA', 'PIŁKA RĘCZNA', 'PŁYWANIE', 'ŻUŻEL', 'SPORTY ZIMOWE',
        'SKOKI NARCIARSKIE', 'BIEGI NARCAIRSKIE', 'BIATHLON', 'HOKEJ', 'ŁYŻWIARTSWO'
    ];

    tagOptions.innerHTML = '';

    availableTags.forEach(tag => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'tags';
        checkbox.value = tag;

        const label = document.createElement('label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(tag));

        tagOptions.appendChild(label);
    });
}

function getSelectedTags() {
    const selectedTags = [];
    const checkboxes = document.querySelectorAll('#tag-options input[name="tags"]:checked');
    
    checkboxes.forEach(checkbox => {
        selectedTags.push(checkbox.value);
    });

    return selectedTags;
}

function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

function formatText(style) {
    const contentTextArea = document.getElementById('article-content');
    const start = contentTextArea.selectionStart;
    const end = contentTextArea.selectionEnd;
    const selectedText = contentTextArea.value.substring(start, end);

    switch (style) {
        case 'bold':
            contentTextArea.value = contentTextArea.value.substring(0, start) +
                '**' + selectedText + '**' +
                contentTextArea.value.substring(end);
            break;
        case 'italic':
            contentTextArea.value = contentTextArea.value.substring(0, start) +
                '*' + selectedText + '*' +
                contentTextArea.value.substring(end);
            break;
        case 'underline':
            contentTextArea.value = contentTextArea.value.substring(0, start) +
                '__' + selectedText + '__' +
                contentTextArea.value.substring(end);
            break;
        case 'strikethrough':
            contentTextArea.value = contentTextArea.value.substring(0, start) +
                '~~' + selectedText + '~~' +
                contentTextArea.value.substring(end);
            break;
        case 'link':
            const url = prompt('Wprowadź adres URL:');
            if (url) {
                contentTextArea.value = contentTextArea.value.substring(0, start) +
                    `[${selectedText}](${url})` +
                    contentTextArea.value.substring(end);
            }
            break;
    }

    contentTextArea.focus();
}

































function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('search-icon').addEventListener('click', function () {
    var searchForm = document.querySelector('.nav-search-form');
    searchForm.classList.toggle('active');
});

document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var searchTerm = document.getElementById('search-input').value.toLowerCase();

    var articles = document.querySelectorAll('.article-link');

    articles.forEach(function (article) {
        var title = article.querySelector('h3 a').textContent.toLowerCase();
        var content = article.querySelector('p').textContent.toLowerCase();

        var allWordsPresent = searchTerm.split(' ').every(function (word) {
            return title.includes(word) || content.includes(word);
        });

        if (allWordsPresent) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
});

window.addEventListener('scroll', function () {
    const atTop = window.scrollY === 0;
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
  
    if (atTop) {
      document.body.classList.add('at-top');
    } else {
      document.body.classList.remove('at-top');
    }
  
    if (atBottom) {
      document.body.classList.add('at-bottom');
    } else {
      document.body.classList.remove('at-bottom');
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    function handleNewsletterForm(event) {
      event.preventDefault();

      const emailInput = document.querySelector('.newsletter input[type="email"]');
      const emailAddress = emailInput.value;

      if (isValidEmail(emailAddress)) {
        subscribeToNewsletter(emailAddress);
      } else {
        alert('Proszę wprowadzić poprawny adres e-mail.');
      }
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function subscribeToNewsletter(email) {
      fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      })
        .then(response => response.json())
        .then(data => {
          alert(data.success || data.error);
        })
        .catch(error => {
          console.error('Błąd:', error);
          alert('Wystąpił błąd podczas subskrypcji newslettera.');
        });
    }

    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
  });

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function toggleMenu() {
    var overlay = document.getElementById("menu-overlay");
    var menuContainer = document.getElementById("menu-container");
    var menuIcon = document.getElementById("menu-icon");

    if (overlay.style.display === "block" || menuContainer.style.display === "block") {
        overlay.style.display = "none";
        menuContainer.classList.remove("active");
        menuIcon.classList.remove("fa-times");

    } else {
        overlay.style.display = "block";
        menuContainer.classList.add("active");
        menuIcon.classList.add("fa-times");
    }
}

document.getElementById('saveButton').addEventListener('click', function() {
  this.classList.add('clicked');
  setTimeout(() => {
    this.classList.remove('clicked');
  }, 800);
});

let minDuration = 500;

function checkImageLoaded(img) {
  let startTime = Date.now();

  function removePlaceholder() {
    img.classList.remove("placeholder");
    img.style.opacity = 1; // Ustaw opacity na 1 po zakończeniu animacji i załadowaniu obrazu
  }

  function checkDuration() {
    let now = Date.now();

    if (now - startTime >= minDuration) {
      removePlaceholder();
    } else {
      setTimeout(checkDuration, 100);
    }
  }

  img.onload = function () {
    checkDuration();
  };

  img.onerror = function () {
    removePlaceholder(); // Usuń placeholder nawet jeśli wystąpi błąd ładowania obrazu
  };

  img.addEventListener("animationend", function () {
    // Zakończenie animacji również powinno spowodować usunięcie placeholdera
    removePlaceholder();
  });
}

let images = document.querySelectorAll("img");

for (let i = 0; i < images.length; i++) {
  checkImageLoaded(images[i]);
}

function udostepnij(artykulId, event, button) {
    event.stopPropagation();

    var sukcesIcon = button.querySelector('.sukces-icon');

    button.classList.add('clicked');
    setTimeout(function () {
        button.classList.remove('clicked');
    }, 800);

    sukcesIcon.style.opacity = 1;
    setTimeout(function () {
        sukcesIcon.style.opacity = 0;
    }, 1500);

    var currentUrl = window.location.href.split('?')[0] + '?artykul=' + artykulId;

    // Copy to clipboard
    copyToClipboard(currentUrl);

    updateViewsCount(artykulId);

    // Update URL without page reload
    history.pushState({}, '', currentUrl);
}

function copyToClipboard(text) {
    var tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

document.getElementById('searchInput').addEventListener('input', function() {
    var searchQuery = document.getElementById('searchInput').value;

    document.getElementById('searchResults').innerText = 'Wyniki wyszukiwania dla: ' + searchQuery;
});

function sortArticles(order) {
    var articlesContainer = document.getElementById('main-article');
    var articles = articlesContainer.getElementsByClassName('article-link');

    var options = document.querySelectorAll('#sort-menu .option');
    options.forEach(function (opt) {
      opt.classList.remove('selected');
    });

    event.target.classList.add('selected');

    var sortedArticles = Array.from(articles).sort(function (a, b) {
      var dateA = new Date(a.getAttribute('data-date'));
      var dateB = new Date(b.getAttribute('data-date'));

      if (order === 'newest') {
        return dateB - dateA;
      } else if (order === 'oldest') {
        return dateA - dateB;
      }
    });

    articlesContainer.innerHTML = '';

    sortedArticles.forEach(function (article) {
      articlesContainer.appendChild(article.cloneNode(true));
    });
}

function toggleSortMenu(element) {
    var sortMenu = document.getElementById('sort-menu');
    sortMenu.classList.toggle('active');
    element.classList.toggle('rotate');
}

// Display comments for a specific article
function addCommentToArticle(articleId) {
    const user = auth.currentUser;
    const commentInput = document.getElementById(`comment-input-${articleId}`);
    const commentText = commentInput.value.trim();  // Use trim() to remove leading and trailing whitespaces

    if (user) {
        // User is logged in, proceed with adding the comment
        db.collection('articles').doc(articleId).collection('comments').add({
            author: user.email,
            content: commentText,
            date: new Date().toISOString(),
        })
        .then(() => {
            console.log('Komentarz dodany pomyślnie!');
            displayComments(articleId);
            commentInput.value = '';  // Clear the textarea after successful comment submission
        })
        .catch((error) => {
            console.error('Błąd podczas dodawania komentarza:', error);
        });
    } else {
        // User is not logged in, prompt them to log in
        console.error('Musisz być zalogowany, aby dodać komentarz.');
        // Optionally, you can show a message to the user or redirect them to the login page.
    }
}

function displayComments(articleId) {
    const commentsList = document.getElementById(`commentsList-${articleId}`);

    // Pobierz komentarze dla danego artykułu z bazy danych
    db.collection('articles').doc(articleId).collection('comments')
        .orderBy('date', 'desc')
        .get()
        .then((querySnapshot) => {
            commentsList.innerHTML = ''; // Wyczyść listę komentarzy przed dodaniem nowych

            querySnapshot.forEach((commentDoc) => {
                const commentData = commentDoc.data();

                // Utwórz element komentarza
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.innerHTML = `
                    <p>${commentData.content}</p>
                    <p class="comment-meta">${commentData.author} | ${formatTimestamp(commentData.date)}</p>
                `;

                // Dodaj komentarz do listy
                commentsList.appendChild(commentElement);
            });
        })
        .catch((error) => {
            console.error('Błąd podczas pobierania komentarzy:', error);
        });
}

function toggleCommentSection(articleId) {
    var existingOverlay = document.getElementById(`comment-overlay-${articleId}`);

    // If overlay already exists, remove it
    if (existingOverlay) {
        existingOverlay.remove();
        return;
    }

    // Create new overlay
    var overlay = document.createElement('div');
    overlay.id = `comment-overlay-${articleId}`;
    overlay.className = 'overlay';
    overlay.onclick = function (event) {
        event.stopPropagation();
    };

    var commentOverlay = document.createElement('div');
    commentOverlay.className = 'comment-overlay';

    // Add content to the comment overlay
    commentOverlay.innerHTML = `
        <h4 class="mt-3 text-center border-bottom pb-2">Komentarze</h4>
        <form id="comments">
            <div class="mb-3">
                <label for="comment" class="form-label">Napisz komentarz</label>
                <textarea placeholder="Oceń artykuł..." id="comment-input-${articleId}" name="comment" class="form-control"></textarea>
            </div>
            <button class="btn btn-outline-primary" onclick="addCommentToArticle('${articleId}')">Prześlij <i class="fas fa-arrow-right"></i></button>
            <div id="commentsList-${articleId}" class="container cont"></div>
        </form>
    `;

    // Append the comment overlay to the overlay
    overlay.appendChild(commentOverlay);

    // Append the overlay to the body
    document.body.appendChild(overlay);
}

document.addEventListener('DOMContentLoaded', function () {
    var articleIdParam = getParameterByName('artykul');

    if (articleIdParam) {
        scrollToArticle(articleIdParam);
    }
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function zobacz(articleId, addedArticleId) {
    scrollToArticle(articleId);

    var article = document.getElementById(articleId);
    
    if (!article) {
        console.error(`Artykuł z ID: ${articleId} nie znaleziony.`);
        return;
    }

    var overlay = document.getElementById('overlay');
    var overlayTitle = document.getElementById('overlay-title');
    var overlayText = document.getElementById('overlay-text');
    var overlayTags = document.getElementById('overlay-tags');
    var overlayAuthor = document.getElementById('overlay-author');
    var overlayTime = document.getElementById('overlay-time');

    updateViewsCount(articleId);

    // Pobierz dane z elementów artykułu
    var title = article.querySelector('h3 a')?.textContent || '';
    var content = article.querySelector('div')?.innerHTML || '';
    var tags = article.querySelector('p:nth-child(5)')?.textContent || '';
    var author = article.querySelector('p:nth-child(7)')?.textContent || '';
    var time = article.querySelector('p:nth-child(6)')?.textContent || '';
    
    content = content.replace(/\n/g, '<br>');
    content = applyTextFormatting(content);

    // Ustaw teksty w overlay
    overlayTitle.textContent = title;
    overlayText.innerHTML = content;
    overlayTags.innerHTML = `<i style="margin-top: 25px;" class="fas fa-hashtag"></i> ${tags}`;
    overlayAuthor.innerHTML = `<i class="fas fa-user"></i> ${author}`;
    overlayTime.innerHTML = `<i class="fas fa-clock"></i> ${time}`;

    // Aktualizuj adres URL
    var url = window.location.href.split('?')[0] + '?artykul=' + addedArticleId;
    history.pushState({}, '', url);

    // Wyświetl overlay
    overlay.style.display = 'block';
}

function updateViewsCount(articleId) {
    const articleRef = db.collection('articles').doc(articleId);

    // Użyj FieldValue.increment, aby uniknąć problemów z konkurencyjnymi aktualizacjami
    articleRef.update({ views: firebase.firestore.FieldValue.increment(1) })
        .catch((error) => {
            console.error('Błąd podczas aktualizacji liczby wyświetleń:', error);
        });
}

function applyTextFormatting(text) {
    // Dodaj inne zastępowania dla formatowań tekstu
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Pogrubienie
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Kursywa
    text = text.replace(/__(.*?)__/g, '<u>$1</u>'); // Podkreślenie
    text = text.replace(/~~(.*?)~~/g, '<s>$1</s>'); // Przekreślenie
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>'); //Link

    return text;
}

window.addEventListener('popstate', function (event) {
    var overlay = document.getElementById('overlay');

    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
    }
});

function scrollToArticle(articleId) {
    var articleElement = document.getElementById(articleId);

    if (articleElement) {
        articleElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        db.collection('articles').doc(articleId).get()
            .then((doc) => {
                if (doc.exists) {
                    zobacz(doc.id, doc.data().articleId);
                } else {
                    console.error('Artykuł nie znaleziony:', articleId);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function closeOverlay() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}
