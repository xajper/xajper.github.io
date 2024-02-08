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
    displayLatestArticles();
    displayArticles();
});

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

function addArticle() {
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
                displayMessage(`Dodawanie komentarza: ${progress.toFixed(2)}%`, 'warning');
            },
            (error) => {
                console.error('Error: ', error);
                displayMessage('Błąd podczas ładowania obrazu.', 'danger');
                addArticleBtn.disabled = false;
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    db.collection('articles')
                        .where('title', '==', title)
                        .get()
                        .then((querySnapshot) => {
                            if (querySnapshot.empty) {
                                getNextArticleNumber()
                                    .then(({ nextNumber, addedArticleId }) => {
                                        db.collection('articles')
                                            .add({
                                                title: title,
                                                content: content,
                                                image: downloadURL,
                                                tags: selectedTags,
                                                date: new Date().toISOString(),
                                                author: 'Xajper',
                                                articleId: addedArticleId,
                                            })
                                            .then(() => {
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
                                    })
                                    .catch((error) => {
                                        console.error('Error: ', error);
                                        displayMessage('Błąd podczas dodawania artykułu.', 'danger');
                                        addArticleBtn.disabled = false;
                                    });
                            } else {
                                displayMessage('Artykuł o takim tytule już istnieje', 'danger');
                                addArticleBtn.disabled = false;
                            }
                        })
                        .catch((error) => {
                            console.error('Error: ', error);
                            displayMessage('Błąd podczas sprawdzania istniejącego artykułu.', 'danger');
                            addArticleBtn.disabled = false;
                        });
                });
            }
        );
    } else {
        displayMessage('Proszę wybrać plik graficzny.', 'danger');
        addArticleBtn.disabled = false;
    }
}


function previewArticle() {
    const title = document.getElementById('article-title').value;
    const content = document.getElementById('article-content').value;
    const selectedTags = getSelectedTags();

    const previewSection = document.getElementById('preview-section');
    const previewContent = document.getElementById('preview-content');
    previewContent.innerHTML = `<h3>${title}</h3><p>${content}</p><p>Tags: ${selectedTags.join(', ')}</p>`;
    previewSection.style.display = 'block';
}

function getNextArticleNumber() {
    return new Promise((resolve, reject) => {
        db.collection('articles')
            .orderBy('articleId', 'desc')
            .limit(1)
            .get()
            .then((querySnapshot) => {
                let nextNumber = 1;

                if (!querySnapshot.empty) {
                    const lastArticle = querySnapshot.docs[0].data();
                    const lastNumber = parseInt(lastArticle.articleId) || 0;
                    nextNumber = lastNumber + 1;
                }

                const addedArticleId = getNextArticleId(nextNumber);
                resolve({ nextNumber, addedArticleId });
            })
            .catch((error) => {
                reject(error);
            });
    });
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
                        <p style="display: none;">${doc.data().content}</p>
                        <div class="image-container">
                            <img class="placeholder" src="${imageUrl}" alt="ZDJĘCIE">
                            <div class="image-title">
                                <h3><a href="javascript:void(0);" onclick="zobacz('${doc.id}', '${doc.data().articleId}')">${doc.data().title}</a></h3>
                            </div>
                        </div>
                        <p style="display: none;"><i class="fas fa-hashtag"></i> ${doc.data().tags.join(', ')}</p>
                        <p><i class="far fa-clock"></i> ${formatTimestamp(doc.data().date)}</p>
                        <p style="display: none;"><i class="far fa-user" id="author">${doc.data().author}</i></p>
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

function editArticle(articleId) {
    console.log(articleId);  // Dodaj tę linię
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

    const selectedTags = getSelectedTags(); // Pobierz zaznaczone tagi (jeśli używasz tej funkcji w swoim kodzie)

    if (editedTitle && editedContent) {
        const articleRef = db.collection('articles').doc(articleId);

        // Sprawdź, czy dokument istnieje przed próbą aktualizacji
        articleRef.get()
            .then((doc) => {
                if (doc.exists) {
                    const updateData = {
                        title: editedTitle,
                        content: editedContent,
                        tags: selectedTags // Dodaj aktualizację tagów, jeśli to potrzebne w Twoim przypadku
                    };

                    if (editedImageInput.files.length > 0) {
                        const editedImageFile = editedImageInput.files[0];

                        const storageRef = firebase.storage().ref('article_images/' + editedImageFile.name);
                        const uploadTask = storageRef.put(editedImageFile);

                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                // Obsługa postępu ładowania, jeśli potrzebujesz
                            },
                            (error) => {
                                console.error('Error: ', error);
                                displayMessage('Błąd podczas ładowania obrazu.', 'danger');
                            },
                            () => {
                                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                    updateData.image = downloadURL;

                                    // Zaktualizuj dokument tylko jeśli nadal istnieje
                                    articleRef.update(updateData)
                                        .then(() => {
                                            displayMessage('Artykuł został zaktualizowany pomyślnie!', 'success');
                                            displayArticles(); // Odśwież listę artykułów po zapisie zmian
                                            displayLatestArticles();
                                            cancelEdit(); // Anuluj edycję po zapisie zmian
                                        })
                                        .catch((error) => {
                                            console.error('Error: ', error);
                                            displayMessage('Błąd podczas zapisywania edytowanego artykułu.', 'danger');
                                        });
                                });
                            }
                        );
                    } else {
                        // Jeśli nie edytowano obrazu, zaktualizuj tylko dane tekstowe
                        articleRef.update(updateData)
                            .then(() => {
                                displayMessage('Artykuł został zaktualizowany pomyślnie!', 'success');
                                displayArticles(); // Odśwież listę artykułów po zapisie zmian
                                displayLatestArticles();
                                cancelEdit(); // Anuluj edycję po zapisie zmian
                            })
                            .catch((error) => {
                                console.error('Error: ', error);
                                displayMessage('Błąd podczas zapisywania edytowanego artykułu.', 'danger');
                            });
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
                    displayLatestArticles();
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

document.addEventListener('DOMContentLoaded', function () {
    const tagLinks = document.querySelectorAll('#article-tags li a');

    tagLinks.forEach(tagLink => {
        tagLink.addEventListener('click', function (event) {
            event.preventDefault();
            showTagOptions();
        });
    });

    const tagCheckboxesBtn = document.getElementById('tag-checkboxes-btn');
    tagCheckboxesBtn.addEventListener('click', function () {
        toggleTagOptionsVisibility();
    });
});

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
        'SKOKI NARCIARSKIE', 'BIEGI NARCAIRSKIE', 'BIATHLON', 'HOKEJ'
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


const form = document.getElementById('comments');
const div = document.querySelector('.cont');
const commentsInfo = document.getElementById('commentsInfo');
const commentTextArea = form.querySelector('textarea');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (user) {
        try {
            const name = await getNameFromEmail(user.email);

            await db.collection('comments').add({
                name: name,
                comment: commentTextArea.value,
                userId: user.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                upvotes: 0,
                downvotes: 0
            });
            addPointsToUser(user.uid, 5);
            displayMessage('Komentarz został dodany, otrzymałeś +5 punktów! Odśwież stronę żeby zobaczyć komentarz.', 'success');

            commentTextArea.value = '';
        } catch (error) {
            console.error('Błąd podczas dodawania komentarza:', error);
            displayMessage('Wystąpił błąd podczas dodawania komentarza.', 'danger');
        }
    } else {
        displayMessage('Najpierw musisz się zalogować, aby dodać komentarz.', 'warning');
    }
});

function addPointsToUser(userId, pointsToAdd) {
    const userRef = database1.ref('users/' + userId);

    userRef.transaction((user) => {
        if (user) {
            user.points = (user.points || 0) + pointsToAdd;
        }
        return user;
    }, (error, committed, snapshot) => {
        if (error) {
            console.error('Błąd podczas dodawania punktów do użytkownika:', error);
        } else if (committed) {
            console.log('Punkty zostały dodane do użytkownika!');
        }
    });
}

function addPointsToUser(userId, pointsToAdd) {
    const userRef = database1.ref('users/' + userId);

    userRef.transaction((user) => {
        if (user) {
            user.points = (user.points || 0) + pointsToAdd;
        }
        return user;
    }, (error, committed, snapshot) => {
        if (error) {
            console.error('Błąd podczas dodawania punktów do użytkownika:', error);
        } else if (committed) {
            console.log('Punkty zostały dodane do użytkownika!');
        }
    });
}

function showButtons(userId) {
    const commentsInfoElement = document.getElementById('commentsInfo');
    const commentsListElement = document.getElementById('commentsList');

    db.collection('comments').onSnapshot(snapshot => {
        const commentsExist = snapshot.size > 0;

        if (commentsExist) {
            commentsInfoElement.textContent = '';
            commentsListElement.innerHTML = '';

            snapshot.forEach(doc => {
                const commentUserId = doc.data().userId;
                renderList(doc, commentUserId === userId);
            });
        } else {
            commentsInfoElement.textContent = 'Brak komentarzy';
        }
    });
}

function hideButtons() {
    const commentsInfoElement = document.getElementById('commentsInfo');
    const commentsListElement = document.getElementById('commentsList');

    db.collection('comments').onSnapshot(snapshot => {
        const commentsExist = snapshot.size > 0;

        if (commentsExist) {
            snapshot.forEach(doc => {
                renderList(doc, false);
            });
        } else {
            commentsInfoElement.textContent = 'Brak komentarzy';
            commentsListElement.innerHTML = '';
        }
    });
}

function renderList(doc, showButtons) {
    var main_div = document.createElement('div');
    var card_body = document.createElement('div');
    var name = document.createElement('h5');
    var comment = document.createElement('p');
    var timestamp = document.createElement('small');
    var editButton = document.createElement('button');
    var deleteButton = document.createElement('button');
    var upvoteButton = document.createElement('button');
    var downvoteButton = document.createElement('button');
    var upvoteCount = document.createElement('span');
    var downvoteCount = document.createElement('span');

    main_div.setAttribute('class', 'card mt-3');
    card_body.setAttribute('class', 'card-body');
    name.setAttribute('class', 'card-title');
    comment.setAttribute('class', 'card-text');
    timestamp.setAttribute('class', 'text-muted');
    editButton.setAttribute('class', 'btn btn-primary btn-edit');
    deleteButton.setAttribute('class', 'btn btn-danger btn-delete');
    upvoteButton.setAttribute('class', 'btn btn-success btn-upvote');
    downvoteButton.setAttribute('class', 'btn btn-danger btn-downvote');

    upvoteCount.setAttribute('class', 'upvote-count');
    downvoteCount.setAttribute('class', 'downvote-count');

    name.textContent = doc.data().name;
    comment.textContent = doc.data().comment;
    timestamp.textContent = ' ' + formatTimestamp(doc.data().timestamp);
    editButton.innerHTML = 'Edytuj <i class="fas fa-pencil-alt"></i>';
    deleteButton.innerHTML = 'Usuń <i class="fas fa-trash"></i>';
    upvoteButton.innerHTML = '<i class="fas fa-thumbs-up"></i>';
    downvoteButton.innerHTML = '<i class="fas fa-thumbs-down"></i>';
    upvoteCount.textContent = doc.data().upvotes;
    downvoteCount.textContent = doc.data().downvotes;

    card_body.appendChild(name);
    card_body.appendChild(comment);
    card_body.appendChild(timestamp);

    var clockIcon = document.createElement('i');
    clockIcon.setAttribute('class', 'fas fa-clock');
    timestamp.insertBefore(clockIcon, timestamp.firstChild);

    card_body.appendChild(upvoteButton);
    card_body.appendChild(upvoteCount);
    card_body.appendChild(downvoteButton);
    card_body.appendChild(downvoteCount);

    if (showButtons) {
        if (isAuthor) {
            editButton.addEventListener('click', () => {
                editComment(doc.id, doc.data().comment);
            });
            deleteButton.addEventListener('click', () => {
                confirmDeleteComment(doc.id);
            });

            card_body.appendChild(editButton);
            card_body.appendChild(deleteButton);
        }
    }

    main_div.appendChild(card_body);
    div.appendChild(main_div);
}

function editComment(commentId, currentComment) {
    const newComment = prompt('Edytuj komentarz:', currentComment);

    if (newComment !== null) {
        db.collection('comments').doc(commentId).update({
            comment: newComment
        }).then(() => {
            console.log('Komentarz został zaktualizowany!');
            location.reload();
        }).catch((error) => {
            console.error('Błąd podczas aktualizacji komentarza:', error);
        });
    }
}

function subtractPointsOnDelete(userId, pointsToSubtract) {
    const userRef = database1.ref('users/' + userId);

    userRef.transaction((user) => {
        if (user) {
            user.points = (user.points || 0) - pointsToSubtract;
        }
        return user;
    }, (error, committed, snapshot) => {
        if (error) {
            console.error('Błąd podczas odejmowania punktów od użytkownika:', error);
        } else if (committed) {
            console.log('Punkty zostały odjęte od użytkownika!');
        }
    });
}

function confirmDeleteComment(commentId) {
    const confirmDelete = confirm('Czy na pewno chcesz usunąć ten komentarz?');

    if (confirmDelete) {
        deleteComment(commentId);
    }
}

function deleteComment(commentId) {
    db.collection('comments').doc(commentId).get().then((doc) => {
        if (doc.exists) {
            const userId = doc.data().userId;
            subtractPointsOnDelete(userId, 5);
        }
        return db.collection('comments').doc(commentId).delete();
    }).then(() => {
        console.log('Komentarz został usunięty!');
        location.reload();
    }).catch((error) => {
        console.error('Błąd podczas usuwania komentarza:', error);
    });
}

function handleVote(commentId, voteType) {
    const user = auth.currentUser;

    if (user) {
        const voteField = voteType === 'upvote' ? 'upvotes' : 'downvotes';

        db.collection('comments').doc(commentId).collection('votes').doc(user.uid).get()
            .then((voteDoc) => {
                if (voteDoc.exists) {
                    const currentVote = voteDoc.data().voteType;

                    if (currentVote === voteType) {
                        subtractVotePoint(commentId, user.uid, voteType);
                    } else {
                        updateVote(commentId, user.uid, voteType);
                    }
                } else {
                    addVote(commentId, user.uid, voteType);
                }
            }).catch((error) => {
                console.error('Błąd podczas sprawdzania głosu:', error);
            });
    } else {
        alert('Musisz być zalogowany, aby oddać głos.');
    }
}

function addVote(commentId, userId, voteType) {
    db.collection('comments').doc(commentId).collection('votes').doc(userId).set({
        voteType: voteType
    }).then(() => {
        addPointsOnVote(userId, 1);
        console.log('Głos został dodany!');
    }).catch((error) => {
        console.error('Błąd podczas dodawania głosu:', error);
    });
}

function updateVote(commentId, userId, voteType) {
    db.collection('comments').doc(commentId).collection('votes').doc(userId).update({
        voteType: voteType
    }).then(() => {
        console.log('Głos został zaktualizowany!');
    }).catch((error) => {
        console.error('Błąd podczas aktualizacji głosu:', error);
    });
}

function subtractVotePoint(commentId, userId, voteType) {
    db.collection('comments').doc(commentId).collection('votes').doc(userId).delete()
        .then(() => {
            subtractPointsOnVote(userId, 1);
            console.log('Głos został usunięty!');
        }).catch((error) => {
            console.error('Błąd podczas usuwania głosu:', error);
        });
}

function subtractPointsOnVote(userId, pointsToSubtract) {
    const userRef = database1.ref('users/' + userId);

    userRef.transaction((user) => {
        if (user) {
            user.points = (user.points || 0) - pointsToSubtract;
        }
        return user;
    }, (error, committed, snapshot) => {
        if (error) {
            console.error('Błąd podczas odejmowania punktów od użytkownika:', error);
        } else if (committed) {
            console.log('Punkty zostały odjęte od użytkownika!');
        }
    });
}

async function getNameFromEmail(email) {
    try {
        const userDoc = await db.collection('users').where('email', '==', email).get();
        if (!userDoc.empty) {
            return userDoc.docs[0].data().full_name;
        } else {
            return email;
        }
    } catch (error) {
        console.error('Błąd podczas pobierania nazwy użytkownika:', error);
        return email;
    }
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

document.addEventListener('DOMContentLoaded', function () {
    const tagLinks = document.querySelectorAll('#article-tags li a');

    tagLinks.forEach(tagLink => {
        tagLink.addEventListener('click', function (event) {
            event.preventDefault();

            const selectedTag = tagLink.textContent.toLowerCase();
            const articles = document.querySelectorAll('#main-article div');

            articles.forEach(article => {
                const articleTags = article.querySelector('p:nth-child(3)').textContent.toLowerCase();

                if (articleTags.includes(selectedTag)) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
});

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
let startTime = Date.now();

function checkImageLoaded(img) {

    let now = Date.now();

    if (now - startTime >= minDuration) {

      img.classList.remove("placeholder");
    } else {

      setTimeout(function() {
        checkImageLoaded(img);
      }, 100);
    }
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

    copyToClipboard(currentUrl);
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

function toggleComments() {
    var commentsSection = document.getElementById('comments-section');
    var commentsToggleBtn = document.getElementById('comments-toggle-btn');
  
    if (commentsSection.style.display === 'none' || commentsSection.style.display === '') {
      commentsSection.style.display = 'block';
      commentsToggleBtn.textContent = 'Ukryj Komentarze';
    } else {
      commentsSection.style.display = 'none';
      commentsToggleBtn.textContent = 'Pokaż Komentarze';
    }
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

    // Pobierz dane z elementów artykułu
    var title = article.querySelector('h3 a')?.textContent || '';
    var content = article.querySelector('p')?.textContent || '';
    var tags = article.querySelector('p:nth-child(5)')?.textContent || '';
    var author = article.querySelector('p:nth-child(7)')?.textContent || '';
    var time = article.querySelector('p:nth-child(6)')?.textContent || '';
    
    content = content.replace(/\n/g, '<br>');
    
    // Ustaw teksty w overlay
    overlayTitle.textContent = title;
    overlayText.innerHTML = content; // Zmieniono na innerHTML
    overlayTags.innerHTML = `<i class="fas fa-hashtag"></i> ${tags}`;
    overlayAuthor.innerHTML = `<i class="far fa-user"></i> ${author}`;
    overlayTime.innerHTML = `<i class="far fa-clock"></i> ${time}`;

    // Aktualizuj adres URL
    var url = window.location.href.split('?')[0] + '?artykul=' + addedArticleId;
    history.pushState({}, '', url);

    // Wyświetl overlay
    overlay.style.display = 'block';
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
