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

const saveButton = document.getElementById('saveButton');

let newArticleTimestamp = null;

auth.onAuthStateChanged(user => {
    const addArticleBtn = document.getElementById('add-article-btn');
    const articleForm = document.getElementById('article-form');
    const deleteArticleBtn = document.getElementById('delete-article-btn');
    const editArticleBtn = document.getElementById('edit-article-btn');

    if (user) {
        const allowedEmails = ['xajperminecraftyt@gmail.com', 'ppixelator@gmail.com'];

        if (allowedEmails.includes(user.email)) {

            addArticleBtn.style.display = 'block';

            if (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'ppixelator@gmail.com') {

            } else {
                articleForm.style.display = 'none';
                deleteArticleBtn.style.display = 'none';
                editArticleBtn.style.display = 'none';
            }
        } else {
            addArticleBtn.style.display = 'none';
            articleForm.style.display = 'none';
            deleteArticleBtn.style.display = 'none';
            editArticleBtn.style.display = 'none';
        }
    } else {
        addArticleBtn.style.display = 'none';
        articleForm.style.display = 'none';
        deleteArticleBtn.style.display = 'none';
        editArticleBtn.style.display = 'none';
    }
});

var overlay = document.getElementById("overlay");
var overlayContent = document.getElementById("overlay-content");

function blokujMysz(event) {
    if (event.button === 2 || event.which === 3) {
        event.preventDefault();
    }
}

function blokujKlawisze(event) {
    if (event.key === 'F12') {
        event.preventDefault();
    }

    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
    }
}

document.addEventListener('mousedown', blokujMysz);

document.addEventListener('keydown', blokujKlawisze);
overlay.addEventListener("mousemove", function(e) {

  if (e.clientX < overlay.offsetLeft + 10) {

    overlay.style.cursor = "ew-resize";

    overlay.addEventListener("mousedown", function() {

      document.addEventListener("mousemove", resizeOverlay);

      document.addEventListener("mouseup", stopResize);
    });
  } else {

    overlay.style.cursor = "default";
  }
});

function resizeOverlay(e) {

  var newWidth = window.innerWidth - e.clientX;

  if (newWidth > 100 && newWidth < window.innerWidth - 100) {

    overlay.style.width = newWidth + "px";
    overlayContent.style.width = newWidth - 20 + "px";
  }
}

function stopResize() {

  document.removeEventListener("mousemove", resizeOverlay);
  document.removeEventListener("mouseup", stopResize);
}


document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
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
let currentBatch = 3;
const batchIncrement = 3;

document.addEventListener('DOMContentLoaded', function () {
    checkUserAuthentication();
    displayArticles();
    displayLatestArticles();
    displayPopularArticles();
    getArticlesCount();
});


var subscribersDB = firebase.database().ref("subscribers");
  
document.getElementById("subscribersForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
  
    var email = getElementVal("email");

    checkIfEmailExists(email)
      .then((exists) => {
        if (!exists) {
          saveMessages(email);
  
          var messageSection = document.getElementById('messageSection');
          if (messageSection) {
            messageSection.style.display = 'block';
            setTimeout(function () {
              messageSection.style.display = 'none';
            }, 3000);
          }
  
          document.getElementById("subscribersForm").reset();
        } else {

          displayMessage('Na tym adresie został już aktywowany Newsletter.', 'danger');
        }
      })
      .catch((error) => {
        console.error("Błąd podczas sprawdzania istnienia emaila:", error);
      });
}
  
const saveMessages = (email) => {
    var newsubscribers = subscribersDB.push();
  
    newsubscribers.set({
      email: email,
    });
};
  
const getElementVal = (id) => {
    return document.getElementById(id).value;
};

const checkIfEmailExists = (email) => {
    return new Promise((resolve, reject) => {
      subscribersDB.orderByChild("email").equalTo(email).once("value")
        .then((snapshot) => {
          resolve(snapshot.exists());
        })
        .catch((error) => {
          reject(error);
        });
    });
};
  
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

    const user = auth.currentUser;

    if (user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'ppixelator@gmail.com')) {

        articleForm.style.display = 'block';
    } else {
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

    if (user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'ppixelator@gmail.com')) {

        const addArticleBtn = document.getElementById('add-article-btn');
        const articleForm = document.getElementById('article-form');
        const deleteArticleBtn = document.getElementById('delete-article-btn');
        const editArticleBtn = document.getElementById('edit-article-btn');

        addArticleBtn.style.display = 'block';

        if (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'ppixelator@gmail.com') {

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
    const user = auth.currentUser;

    if (user) {
        const userEmail = user.email;

        switch (userEmail) {
            case 'xajperminecraftyt@gmail.com':
                return 'Xajper';
            case 'ppixelator@gmail.com':
                return 'Ksaveriusz';

            default:
                return 'Autor';
        }
    } else {
        return 'Autor';
    }
}

function cancelArticle() {
    articleForm.style.display = 'none';
    const imageInput = document.getElementById('article-image');
    document.getElementById('preview-section').style.display = 'none';

    resetSelectedTags();

    document.getElementById('article-title').value = '';
    document.getElementById('article-content').value = '';
    imageInput.value = '';
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
            if (url !== null) {
                const linkText = selectedText.length > 0 ? selectedText : 'CZYTAJ DALEJ:';
                contentTextArea.value = contentTextArea.value.substring(0, start) +
                    `[${linkText}](${url})` +
                    contentTextArea.value.substring(end);
            }
            break;
    }

    contentTextArea.focus();
}

async function addArticle() {
    const addArticleBtn = document.getElementById('add-article-btn');
    addArticleBtn.disabled = true;

    const user = auth.currentUser;

    const title = document.getElementById('article-title').value;
    let content = document.getElementById('article-content').value;
    const imageInput = document.getElementById('article-image');
    const selectedTags = getSelectedTags();

    content = content.split('\n').join('<br>');

    if (selectedTags.length === 0) {
        displayMessage('Proszę wybrać co najmniej jeden tag.', 'danger');
        addArticleBtn.disabled = false;
        return;
    }

    try {
        if (imageInput.files.length > 0) {
            const imageFile = imageInput.files[0];

            const sanitizedTitle = title.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[ąĄćĆęĘłŁńŃóÓśŚźŹżŻ]/g, (match) => {
                    const polishChars = 'ąĄćĆęĘłŁńŃóÓśŚźŹżŻ';
                    const englishChars = 'aAcCeElLnNoOsSzz';
                    return englishChars[polishChars.indexOf(match)] || '-';
                })
                .replace(/[^a-z0-9-]/g, '');

            const storageRef = firebase.storage().ref('article_images/' + sanitizedTitle);
            const uploadTask = storageRef.put(imageFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    displayMessage(`Dodawanie artykułu: ${progress.toFixed(2)}%`, 'warning');
                },
                (error) => {
                    console.error('Error: ', error);
                    displayMessage('Błąd podczas ładowania obrazu.', 'danger');
                    addArticleBtn.disabled = false;
                },
                async () => {
                    try {
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        const author = getAuthor();
                        const newArticleTimestamp = new Date().getTime();

                        let articleId = '';
                        let articleExists = true;

                        while (articleExists) {
                            const randomDigits = Math.floor(100000 + Math.random() * 900000);
                            const formattedTitle = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                            articleId = `${formattedTitle}-${randomDigits}`;

                            const existingArticle = await db.collection('articles').doc(articleId).get();
                            if (!existingArticle.exists) {
                                articleExists = false;
                            }
                        }

                        if (!articleId) {
                            throw new Error('Nie udało się wygenerować ID artykułu!');
                        }

                        const articleData = {
                            title: title,
                            content: content,
                            image: downloadURL,
                            tags: selectedTags,
                            date: new Date().toISOString(),
                            author: author,
                            articleId: articleId,
                            views: 0,
                            newArticleTimestamp: newArticleTimestamp,
                        };

                        console.log('Article data to be saved:', articleData);

                        await db.collection('articles').doc(articleId).set(articleData);

                        content += '\n\nCZYTAJ DALEJ: ' + title;

                        resetSelectedTags();
                        document.getElementById('article-title').value = '';
                        document.getElementById('article-content').value = '';
                        imageInput.value = '';

                        displayMessage('Artykuł dodany pomyślnie! +5pkt', 'success');
                        addArticleBtn.disabled = false;

                        await db.collection('articles').doc(articleId).collection('comments').add({
                            author: author,
                            content: 'Mamy nadzieję, że artykuł wam się spodobał',
                            date: new Date().toISOString(),
                        });

                        displayArticles();
                        displayLatestArticles();
                        getArticlesCount();
                        addPointsToUser(user.uid, 5);
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
    } catch (error) {
        console.error('Error: ', error);
        displayMessage('Błąd podczas dodawania artykułu.', 'danger');
        addArticleBtn.disabled = false;
    }
}

function resetSelectedTags() {
    const checkboxes = document.querySelectorAll('input[name="tags"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function previewArticle() {
    const titleElement = document.getElementById('article-title');
    const contentElement = document.getElementById('article-content');

    if (!titleElement || !contentElement) {
        console.error('Nie można znaleźć elementów article-title lub article-content.');
        return;
    }

    const title = titleElement.value;
    const content = parseContent(contentElement.value);
    const selectedTags = getSelectedTags();

    const previewSection = document.getElementById('preview-section');
    const previewContent = document.getElementById('preview-content');

    if (!previewSection || !previewContent) {
        console.error('Nie można znaleźć elementów preview-section lub preview-content.');
        return;
    }

    const tagsHtml = selectedTags.map(tag => `<span class="tag">${tag}</span>`).join('');

    previewContent.innerHTML = `
        <h3>${title}</h3>
        <div class="preview-article-content">${content}</div>
        <p>${tagsHtml}</p>
    `;

    previewSection.style.display = 'block';
}

function parseContent(content) {

    const formattedContent = content
        .replace(/(?:\r\n|\r|\n)/g, '<br>') // Linijka niżej (taki enter)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Pogrubienie
        .replace(/__(.*?)__/g, '<u>$1</u>') // Podkreślenie
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Kursywa
        .replace(/~~(.*?)~~/g, '<del>$1</del>') // Przekreślenie
        .replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>'); // Link

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

    return title
        .replace(/[ąćęłńóśźż]/g, char => polishCharacters[char] || char)
        .toLowerCase()
        .split(' ')
        .join('-');
}

function getNextArticleId(articleNumber) {
    return `${articleNumber}`;
}

let lastLoadedDoc = null;

function getLastLoadedDoc() {
    return lastLoadedDoc;
}

function displayArticles(startAfterDoc) {
    const mainArticle = document.getElementById('main-article');
    const column1 = document.getElementById('column1');
    const column2 = document.getElementById('column2');

    mainArticle.classList.add('loading');
    const loadingText = document.createElement('div');
    loadingText.id = 'loading-text';
    loadingText.style.fontSize = '1.2em';
    loadingText.style.color = '#333';
    loadingText.style.position = 'fixed';
    loadingText.style.top = '50%';
    loadingText.style.left = '50%';
    loadingText.style.transform = 'translate(-50%, -50%)';
    mainArticle.appendChild(loadingText);

    auth.onAuthStateChanged(user => {
        let query = db.collection('articles')
            .orderBy('date', 'desc');

        if (startAfterDoc) {
            query = query.startAfter(startAfterDoc);
        }

        query.get()
            .then((querySnapshot) => {
                mainArticle.classList.remove('loading');
                loadingText.remove();

                const currentTimestamp = new Date().getTime();
                let currentColumn = column1;
                let nonPolacyRodacyCount = 0;
                let polacyRodacyCount = 0;

                querySnapshot.forEach((doc) => {
                    const articleElement = document.createElement('div');
                    articleElement.setAttribute('id', doc.id);
                    articleElement.className = 'article-link';
                    articleElement.setAttribute('data-tags', doc.data().tags.join(', '));
                    articleElement.setAttribute('data-date', doc.data().date);

                    const isNewArticle = (currentTimestamp - doc.data().newArticleTimestamp) < 3600000;

                    articleElement.onclick = function () {
                        zobacz(doc.id, doc.data().articleId);
                    };

                    const firstTag = doc.data().tags[0];
                    const secondTag = doc.data().tags[1];

                    if (nonPolacyRodacyCount < 6) {
                        articleElement.innerHTML = `
                            <h3 style="display: none;"><a href="?artykul=${doc.id}">${doc.data().title}</a></h3>
                            <span class="hover-bar"></span>
                            <div class="content" style="display: none;">${doc.data().content.replace(/\n/g, '<br>')}</div>
                            <div class="image-container" style="position: relative;">
                            <img class="placeholder" src="${doc.data().image}" alt="ZDJĘCIE" style="width: 400px; height: 250px; object-fit: cover;">
                            ${isNewArticle ? '<div class="new-label"><img src="nowyarticle.png" alt="Nowe"> NOWE</div>' : `<div class="category-label" data-tag="${secondTag}" onclick="event.stopPropagation();">${secondTag}</div>`}
                            <div class="image-title">
                                <h3><a href="javascript:void(0);" onclick="zobacz('${doc.id}', '${doc.data().articleId}')">${doc.data().title}</a></h3>
                            </div>
                            </div>
                            </div>
                            <p style="display: none;"><i class="fas fa-hashtag"></i> ${doc.data().tags.join(', ')}</p>
                            <p><i class="far fa-clock"></i> ${formatTimestamp(doc.data().date)}</p>
                            <p style="display: none;"><i class="fas fa-user" id="author">${doc.data().author}</i></p>
                            <button class="save-button" id="saveButton" onclick="saveArticle('${doc.id}', event, this)">
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
                        
                            ${user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'ppixelator@gmail.com') ? `<button class="delete-button" onclick="deleteArticle('${doc.id}')"><i class="fas fa-trash"></i></button>` : ''}
                            ${user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'ppixelator@gmail.com') ? `<button class="edit-button" onclick="editArticle('${doc.id}')"><i class="fas fa-hand"></i></button>` : ''}
                            <hr>
                        `;

                        mainArticle.appendChild(articleElement);
                        lastLoadedDoc = doc;
                        nonPolacyRodacyCount++;
                    }

                    if (doc.data().tags.includes('POLACY RODACY') && polacyRodacyCount < 4) {
                        const polacyRodacyArticleElement = document.createElement('div');
                        polacyRodacyArticleElement.className = 'article-link';
                        polacyRodacyArticleElement.setAttribute('data-tags', doc.data().tags.join(', '));
                        polacyRodacyArticleElement.setAttribute('data-date', doc.data().date);

                        polacyRodacyArticleElement.onclick = function () {
                            zobacz(doc.id, doc.data().articleId);
                        };

                        polacyRodacyArticleElement.innerHTML = `
                            <h3 style="display: none;"><a href="?artykul=${doc.id}">${doc.data().title}</a></h3>
                            <span class="hover-bar"></span>
                            <div class="content" style="display: none;">${doc.data().content.replace(/\n/g, '<br>')}</div>
                            <div class="image-container" style="position: relative;">
                            <img class="placeholder" src="${doc.data().image}" alt="ZDJĘCIE" style="width: 400px; height: 250px; object-fit: cover;">
                            ${isNewArticle ? '<div class="new-label">NOWE</div>' : (doc.data().tags.includes('POLACY RODACY') ? `<div class="category-label" data-tag="${doc.data().tags.find(tag => tag !== 'POLACY RODACY')}" onclick="event.stopPropagation();">${doc.data().tags.find(tag => tag !== 'POLACY RODACY')}</div>` : `<div class="category-label" data-tag="${doc.data().tags[0]}" onclick="event.stopPropagation();">${doc.data().tags[0]}</div>`)}
                            <div class="image-title">
                                <h3><a href="javascript:void(0);" onclick="zobacz('${doc.id}', '${doc.data().articleId}')">${doc.data().title}</a></h3>
                            </div>
                            </div>
                            <p style="display: none;"><i class="fas fa-hashtag"></i> ${doc.data().tags.join(', ')}</p>
                            <p><i class="far fa-clock"></i> ${formatTimestamp(doc.data().date)}</p>
                            <p style="display: none;"><i class="fas fa-user" id="author">${doc.data().author}</i></p>
                            <button class="save-button" id="saveButton" onclick="saveArticle('${doc.id}', event, this)">
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

                            ${user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'ppixelator@gmail.com') ? `<button class="delete-button" onclick="deleteArticle('${doc.id}')"><i class="fas fa-trash"></i></button>` : ''}
                            ${user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'ppixelator@gmail.com') ? `<button class="edit-button" onclick="editArticle('${doc.id}')"><i class="fas fa-hand"></i></button>` : ''}
                            <hr>
                        `;

                        currentColumn.querySelector('ul').appendChild(polacyRodacyArticleElement);

                        currentColumn = currentColumn === column1 ? column2 : column1;
                        polacyRodacyCount++;
                    }
                });

                if (querySnapshot.size < currentBatch) {
                    const loadMoreBtn = document.getElementById('load-more-btn');
                    if (loadMoreBtn) {
                        loadMoreBtn.remove();
                    }
                } else if (!document.getElementById('load-more-btn')) {
                    mainArticle.appendChild(createLoadMoreButton());
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
                mainArticle.innerHTML = 'Błąd ładowania artykułów';
                mainArticle.classList.remove('loading');
            });
    });
}

function loadMoreArticles() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const mainArticle = document.getElementById('main-article');

    loadMoreBtn.style.display = 'none';

    displayArticles(lastLoadedDoc);

    mainArticle.appendChild(loadMoreBtn);

    loadMoreBtn.style.display = 'block';
}

function createLoadMoreButton() {
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'load-more-btn';
    loadMoreBtn.id = 'load-more-btn';
    loadMoreBtn.textContent = 'Załaduj więcej';
    loadMoreBtn.onclick = loadMoreArticles;
    return loadMoreBtn;
}

function sortByTag(tag) {
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

    const editedTitleInput = document.getElementById('edited-article-title');
    const editedContentInput = document.getElementById('edited-article-content');
    const editedImageInput = document.getElementById('edited-article-image');

    articleRef.get()
        .then((doc) => {
            if (doc.exists) {
                editedTitleInput.value = doc.data().title;
                editedContentInput.value = doc.data().content;

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
    document.getElementById('article-form').style.display = 'none';

    const editForm = document.getElementById('edit-article-form');

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
                        const editedImageFile = editedImageInput.files[0];
                        const storageRef = firebase.storage().ref('article_images/' + editedImageFile.name);
                        const uploadTask = storageRef.put(editedImageFile);

                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {

                            },
                            (error) => {
                                console.error('Error: ', error);
                                displayMessage('Błąd podczas ładowania obrazu.', 'danger');
                            },
                            () => {
                                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                    updateData.image = downloadURL;
                                    updateArticle(articleId, updateData);
                                });
                            }
                        );
                    } else {
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

async function deleteArticle(articleId) {
    const user = auth.currentUser;

    if (user && (user.email === 'xajperminecraftyt@gmail.com' || user.email === 'ppixelator@gmail.com')) {
        const confirmed = confirm('Czy na pewno chcesz usunąć ten artykuł?');

        if (confirmed) {

            const commentsQuerySnapshot = await db.collection('articles').doc(articleId).collection('comments').get();
            
            commentsQuerySnapshot.forEach(async (commentDoc) => {
                await commentDoc.ref.delete();
            });

            db.collection('articles').doc(articleId).delete()
                .then(() => {
                    displayMessage('Artykuł usunięty pomyślnie!', 'success');
                    displayArticles();
                    getArticlesCount();
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
                const time = document.createElement('span');
                const dot = document.createElement('span');
                dot.classList.add('dot');
                time.classList.add('time');

                const addedArticleId = doc.data().addedArticleId || '';
                const articleId = `${doc.id}`;

                const articleDate = new Date(doc.data().date);
                const formattedTime = articleDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                a.href = `?artykul=${articleId}`;
                a.textContent = doc.data().title;

                dot.textContent = '•';

                time.textContent = formattedTime;

                a.onclick = function (event) {
                    event.preventDefault();

                    if (!document.getElementById(articleId)) {
                        li.setAttribute('id', articleId);
                    }

                    zobacz(doc.id, doc.data().articleId);
                };

                li.appendChild(dot);
                li.appendChild(time);
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
        .orderBy('views', 'desc')
        .limit(3)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                const dot = document.createElement('span');
                dot.classList.add('dot');

                const addedArticleId = doc.data().addedArticleId || '';
                const articleId = `${doc.id}`;

                a.href = `?artykul=${articleId}`;
                a.textContent = doc.data().title;

                a.onclick = function (event) {
                    event.preventDefault();

                    if (!document.getElementById(articleId)) {
                        li.setAttribute('id', articleId);
                    }

                    zobacz(doc.id, doc.data().articleId);
                };

                dot.textContent = '•';

                li.appendChild(dot);
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
        'SKOKI NARCIARSKIE', 'BIEGI NARCAIRSKIE', 'BIATHLON', 'HOKEJ', 'ŁYŻWIARSTWO', 'POLACY RODACY'
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

async function getArticlesCount() {
    try {
        const articlesQuerySnapshot = await db.collection('articles').get();
        const articlesCount = articlesQuerySnapshot.size;

        articlesCountElement.textContent = "("+articlesCount +")";
    } catch (error) {
        console.error('Błąd podczas pobierania liczby artykułów:', error);
    }
}

const articlesCountElement = document.getElementById('articles-count');

function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
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

    var overlayStyle = window.getComputedStyle(overlay);
    var menuContainerStyle = window.getComputedStyle(menuContainer);

    function handleAnimationEnd() {
        if (overlay.style.display === "none") {
            overlay.style.display = "none";
            menuContainer.style.display = "none";
            menuContainer.removeEventListener("animationend", handleAnimationEnd);
        }
    }

    if (overlayStyle.display === "block" || menuContainerStyle.display === "block") {
        menuContainer.addEventListener("animationend", handleAnimationEnd);

        overlay.style.display = "none";
        menuContainer.style.animation = "slideUp 0.5s ease-in-out";
        menuContainer.classList.remove("active");
        menuIcon.classList.remove("fa-times");
    } else {
        overlay.style.display = "block";
        menuContainer.style.display = "block";
        menuContainer.style.animation = "slideDown 0.5s ease-in-out";
        menuContainer.classList.add("active");
        menuIcon.classList.add("fa-times");
    }
}

function saveArticle(articleId, event, button) {
    event.stopPropagation();
    const user = auth.currentUser;

    button.classList.add('clicked');
    setTimeout(function () {
        button.classList.remove('clicked');
    }, 800);

    var currentUrl = '?artykul=' + articleId;
    
    if (user) {
        db.collection('users').doc(user.uid).collection('savedArticles').doc(articleId).set({
            savedAt: firebase.firestore.FieldValue.serverTimestamp(),
            url: currentUrl
        })
        .then(() => {
            displayMessage('Artykuł zapisany pomyślnie!', 'success');
        })
        .catch((error) => {
            console.error('Błąd podczas zapisywania artykułu: ', error);
        });
    } else {
        displayMessage('Musisz być zalogowanym, aby zapisać artykuł.', 'danger');
    }
}

let minDuration = 500;

function checkImageLoaded(img) {
  let startTime = Date.now();

  function removePlaceholder() {
    img.classList.remove("placeholder");
    img.style.opacity = 1;
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
    removePlaceholder();
  };

  img.addEventListener("animationend", function () {
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

    copyToClipboard(currentUrl);

    updateViewsCount(artykulId);

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
    var loadMoreBtn = document.getElementById('load-more-btn');

    options.forEach(function (opt) {
        opt.classList.remove('selected');
    });

    event.target.classList.add('selected');

    var newestHeader = document.getElementById('newest-article-header');
    var titleText = newestHeader ? newestHeader.querySelector('span').textContent : '';

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

    if (newestHeader) {
        newestHeader.querySelector('span').textContent = titleText;
    }

    sortedArticles.forEach(function (article) {
        articlesContainer.appendChild(article.cloneNode(true));
    });

    if (loadMoreBtn) {
        articlesContainer.appendChild(loadMoreBtn);
    }

    if (!newestHeader && order === 'newest') {
        newestHeader = document.createElement('div');
        newestHeader.id = 'newest-article-header';
        newestHeader.className = 'article-header';

        var h2Element = document.createElement('h2');
        var spanElement = document.createElement('span');
        spanElement.textContent = 'NAJNOWSZE';

        h2Element.appendChild(spanElement);
        newestHeader.appendChild(h2Element);

        articlesContainer.insertBefore(newestHeader, articlesContainer.firstChild);
    }

    if (order === 'oldest') {
        var oldestHeader = document.createElement('div');
        oldestHeader.id = 'oldest-article-header';
        oldestHeader.className = 'article-header';

        var h2Element = document.createElement('h2');
        var spanElement = document.createElement('span');
        spanElement.textContent = 'NAJSTARSZE';

        h2Element.appendChild(spanElement);
        oldestHeader.appendChild(h2Element);

        articlesContainer.insertBefore(oldestHeader, articlesContainer.firstChild);
        articlesContainer.insertBefore(image, articlesContainer.firstChild);
    }
}

function toggleSortMenu(element) {
    var sortMenu = document.getElementById('sort-menu');
    sortMenu.classList.toggle('active');
    element.classList.toggle('rotate');
}

function toggleCommentSection(articleId) {
    var existingOverlay = document.getElementById(`comment-overlay-${articleId}`);

    if (existingOverlay) {
        existingOverlay.remove();
        return;
    }

    var overlay = document.createElement('div');
    overlay.id = `comment-overlay-${articleId}`;
    overlay.className = 'overlay';
    overlay.onclick = function (event) {
        event.stopPropagation();
    };

    var commentOverlay = document.createElement('div');
    commentOverlay.className = 'comment-overlay';

    commentOverlay.innerHTML = `
        <div id="comments-section">
            <div>
            <div class="comments-header">
                <img src="komentarze.png" alt="Komentarze" class="comments-image">
                <h4 class="comments-section">Komentarze</h4>
            </div>
            <form id="comments" onsubmit="addCommentToArticle('${articleId}', event)">
                <div class="comment-send" contenteditable="true" placeholder="Napisz komentarz..." id="comment-input-${articleId}" name="comment" class="form-control"></div>
                <button type="submit" class="btn btn-outline-primary"><i class="fas fa-arrow-right"></i></button>
                <div id="commentsList-${articleId}" class="cont"></div>
            </form>
            </div>
            <div>
            <div class="reaction-header">
                <img src="reakcje.png" alt="Reakcje" class="reaction-image">
                <h4 class="reaction-section">Reakcje</h4>
            </div>
            <div class="reaction-buttons">
                <button class="btn btn-reaction" onclick="reactToArticle('${articleId}', 'super')" data-reaction="super">🔥</button>
                <button class="btn btn-reaction" onclick="reactToArticle('${articleId}', 'lubie')" data-reaction="lubie">👍</button>
                <button class="btn btn-reaction" onclick="reactToArticle('${articleId}', 'nie lubie')" data-reaction="nie-lubie">👎</button>
                <button class="btn btn-reaction" onclick="reactToArticle('${articleId}', 'super')" data-reaction="super">❤️</button>
                <button class="btn btn-reaction" onclick="reactToArticle('${articleId}', 'wow')" data-reaction="wow">😮</button>
            </div>
            </div>
        </div>
    `;

    overlay.appendChild(commentOverlay);

    document.body.appendChild(overlay);

    displayComments(articleId);
}

async function displayComments(articleId) {
    const commentsContainer = document.getElementById(`commentsList-${articleId}`);
    commentsContainer.innerHTML = '';

    try {
        const commentsSnapshot = await db.collection('articles').doc(articleId).collection('comments').get();
        const currentUser = auth.currentUser;

        if (!commentsSnapshot.empty) {
            commentsSnapshot.forEach((commentDoc, index) => {
                const commentData = commentDoc.data();
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';

                const userImage = document.createElement('img');
                userImage.src = 'userlogocomment.png';
                userImage.alt = 'Użytkownik';
                userImage.className = 'user-image-comment';
                commentDiv.appendChild(userImage);

                commentDiv.innerHTML += `
                    <p><strong>${commentData.author}:</strong> ${commentData.content}</p>
                    <small><i class="far fa-clock"></i> ${new Date(commentData.date).toLocaleString()}</small>
                `;

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');

                if (currentUser && currentUser.email === commentData.author) {
                    const deleteButton = document.createElement('button');
                    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
                    deleteButton.classList.add('delete-buttoncomment');
                    deleteButton.onclick = () => deleteComment(articleId, commentDoc.id);
                    buttonContainer.appendChild(deleteButton);
                }

                if (currentUser && currentUser.email === commentData.author) {
                    const editButton = document.createElement('button');
                    editButton.innerHTML = '<i class="fas fa-edit"></i>';
                    editButton.classList.add('edit-buttoncomment');
                    editButton.onclick = () => editComment(articleId, commentDoc.id, commentData.content);
                    buttonContainer.appendChild(editButton);
                }

                const replyButton = document.createElement('button');
                replyButton.innerHTML = '<i class="fas fa-reply"></i> Odpowiedz';
                replyButton.classList.add('reply-buttoncomment');
                replyButton.type = 'button';
                replyButton.onclick = () => setReplyToUser(commentData.author, articleId);
                buttonContainer.appendChild(replyButton);

                commentDiv.appendChild(buttonContainer);

                if (index < commentsSnapshot.size - 1) {
                    const horizontalLine = document.createElement('hr');
                    commentDiv.appendChild(horizontalLine);
                }

                commentsContainer.appendChild(commentDiv);
            });

            commentsContainer.style.maxHeight = '300px';
            commentsContainer.style.overflowY = 'auto';
        } else {
            commentsContainer.innerHTML = '<p>Brak komentarzy.</p>';
        }
    } catch (error) {
        console.error('Błąd podczas pobierania komentarzy:', error);
    }
}

async function editComment(articleId, commentId, currentContent) {
    const newContent = prompt('Edytuj komentarz:', currentContent);

    if (newContent !== null) {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error('Użytkownik niezalogowany.');
            return;
        }

        try {
            await db.collection('articles').doc(articleId).collection('comments').doc(commentId).update({
                content: newContent,
            });

            displayMessage('Komentarz został pomyślnie zaktualizowany.', 'success');

            displayComments(articleId);
        } catch (error) {
            displayMessage('Błąd podczas aktualizacji komentarza.', 'danger');
            console.error('Błąd podczas aktualizacji komentarza:', error);
        }
    }
}

function setReplyToUser(username, articleId) {
    const commentInput = document.getElementById(`comment-input-${articleId}`);

    commentInput.textContent = `@${username} `;

    commentInput.focus();
}

async function deleteComment(articleId, commentId) {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        console.error('Użytkownik niezalogowany.');
        return;
    }

    try {
        const commentRef = await db.collection('articles').doc(articleId).collection('comments').doc(commentId).get();

        if (commentRef.exists) {
            const commentData = commentRef.data();

            if (currentUser.email === commentData.author) {
                await db.collection('articles').doc(articleId).collection('comments').doc(commentId).delete();

                displayComments(articleId);

                displayMessage('Komentarz usunięty pomyślnie. -5pkt', 'success');
                subtractPointsFromUser(currentUser.uid, 5);
                subtractPointsFromUser(currentUser.uid, 1);
            } else {
                console.error('Użytkownik nie jest autorem tego komentarza.');
                displayMessage('Nie masz uprawnień do usunięcia tego komentarza.', 'danger');
            }
        } else {
            console.error('Komentarz nie istnieje.');
            displayMessage('Komentarz nie istnieje.', 'danger');
        }
    } catch (error) {
        console.error('Błąd podczas usuwania komentarza:', error);
        displayMessage('Błąd podczas usuwania komentarza.', 'danger');
    }
}

function reactToArticle(articleId, reaction) {
    console.log(`Reakcja do artykułu: ${articleId}: ${reaction}`);
}

document.addEventListener('DOMContentLoaded', function () {
    const reactionButtons = document.querySelectorAll('.btn-reaction');

    reactionButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const reactionType = button.getAttribute('data-reaction');
            reactToArticle(articleId, reactionType);
        });
    });

    function showReactionNotification(text) {
        const reactionNotification = document.createElement('div');
        reactionNotification.className = 'reaction-notification';
        reactionNotification.textContent = text;

        document.body.appendChild(reactionNotification);

        setTimeout(function () {
            reactionNotification.classList.add('fade-out');
        }, 1000);

        setTimeout(function () {
            document.body.removeChild(reactionNotification);
        }, 1500);
    }

    function reactToArticle(articleId, reaction) {
        console.log(`Reakcja do artykułu: ${articleId}: ${reaction}`);

        showReactionNotification('+1');
    }
});

async function addCommentToArticle(articleId, event) {
    event.preventDefault();

    const user = auth.currentUser;
    const commentInput = document.getElementById(`comment-input-${articleId}`);
    const commentText = commentInput.textContent;

    if (user) {
        db.collection('articles').doc(articleId).collection('comments').add({
            author: user.email,
            content: commentText,
            date: new Date().toISOString(),
        })
        .then(() => {
            displayMessage('Komentarz dodany pomyślnie! +5pkt', 'success');
            displayComments(articleId);
            commentInput.textContent = '';
            addPointsToUser(user.uid, 5);
            addCommentsToUser(user.uid, 1);
        })
        .catch((error) => {
            displayMessage('Error.', 'danger');
            console.error('Błąd podczas dodawania komentarza:', error);
        });
    } else {
        displayMessage('Musisz być zalogowany, aby dodać komentarz.', 'danger');
    }
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

function subtractPointsFromUser(userId, pointsToSubtract) {
    const userRef = database1.ref('users/' + userId);

    userRef.transaction((user) => {
        if (user) {
            user.points = Math.max((user.points || 0) - pointsToSubtract, 0);
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

function addCommentsToUser(userId, commentsToAdd) {
    const userRef = database1.ref('users/' + userId);

    userRef.transaction((user) => {
        if (user) {
            user.komentarze = (user.komentarze || 0) + commentsToAdd;
        }
        return user;
    }, (error, committed, snapshot) => {
        if (error) {
            console.error('Błąd podczas dodawania komentarza do użytkownika:', error);
        } else if (committed) {
            console.log('Komentarz został dodany do użytkownika!');
        }
    });
}

function subtractCommentsFromUser(userId, commentsToSubtract) {
    const userRef = database1.ref('users/' + userId);

    userRef.transaction((user) => {
        if (user) {
            user.komentarze = Math.max((user.komentarze || 0) - commentsToSubtract, 0);
        }
        return user;
    }, (error, committed, snapshot) => {
        if (error) {
            console.error('Błąd podczas odejmowania komentarza od użytkownika:', error);
        } else if (committed) {
            console.log('KLomentarz został odjęty od użytkownika!');
        }
    });
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

function getNumberOfCommentsForArticle(articleId) {
    return new Promise(function(resolve, reject) {
        var commentsRef = firebase.database().ref('comments/' + articleId);
        commentsRef.once('value', function(snapshot) {
            var numberOfComments = snapshot.numChildren();
            resolve(numberOfComments);
        }, function(error) {
            reject(error);
        });
    });
}

async function zobacz(articleId, addedArticleId) {
    scrollToArticle(articleId);
  
    const user = auth.currentUser;
    const article = document.getElementById(articleId);
    const overlay = document.getElementById('overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayText = document.getElementById('overlay-text');
    const overlayTags = document.getElementById('overlay-tags');
    const overlayAuthor = document.getElementById('overlay-author');
    const overlayTime = document.getElementById('overlay-time');
  
    updateViewsCount(articleId);

    const addCommentButton = document.createElement('button');
    addCommentButton.className = 'add-comment-button';
    addCommentButton.innerText = 'Komentarze';
    getNumberOfCommentsForArticle(articleId).then(function(numberOfComments) {
        const buttonLabel = `Komentarze (${numberOfComments})`;
        addCommentButton.innerHTML = `${buttonLabel}`;
    });
    addCommentButton.onclick = function () {
      toggleCommentSection(articleId);
    };

    const title = article.querySelector('h3 a')?.textContent || '';
    let content = article.querySelector('div')?.innerHTML || '';
    const tags = article.querySelector('p:nth-child(5)')?.textContent || '';
    const author = article.querySelector('p:nth-child(7)')?.textContent || '';
    const time = article.querySelector('p:nth-child(6)')?.textContent || '';
  
    content = content.replace(/\n/g, '<br>');
    content = applyTextFormatting(content);

    overlayTitle.textContent = title;
    overlayText.innerHTML = content;
    overlayTags.innerHTML = `<i style="margin-top: 25px;" class="fas fa-hashtag"></i> ${tags}`;
    overlayAuthor.innerHTML = `<i class="fas fa-user"></i> <a href="autor/${author}.html">${author}</a>`;
    overlayTime.innerHTML = `<i class="fas fa-clock"></i> ${time}`;

    overlay.appendChild(addCommentButton);

    const existingPrevButton = overlay.querySelector('.overlay-button.prev');
    const existingNextButton = overlay.querySelector('.overlay-button.next');

    if (existingPrevButton) {
        existingPrevButton.remove();
    }

    if (existingNextButton) {
        existingNextButton.remove();
    }

    const prevButton = document.createElement('button');
    prevButton.className = 'overlay-button prev';
    prevButton.innerHTML = '<i class="fas fa-arrow-left"></i> Poprzedni artykuł';
    prevButton.onclick = async function() {
        const prevArticle = await getAdjacentArticle(articleId, 'prev');
        if (prevArticle) {
            zobacz(prevArticle.id, prevArticle.id);
        } else {
            alert('To jest najstarszy artykuł');
        }
    };

    const nextButton = document.createElement('button');
    nextButton.className = 'overlay-button next';
    nextButton.innerHTML = 'Następny artykuł <i class="fas fa-arrow-right"></i>';
    nextButton.onclick = async function() {
        const nextArticle = await getAdjacentArticle(articleId, 'next');
        if (nextArticle) {
            zobacz(nextArticle.id, nextArticle.id);
        } else {
            alert('To jest najnowszy artykuł');
        }
    };

    overlay.appendChild(prevButton);
    overlay.appendChild(nextButton);

    const styleButtons = function(button) {
        button.style.backgroundColor = 'grey';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.padding = '10px 20px';
        button.style.cursor = 'pointer';
        button.style.margin = '10px';
        button.style.transition = 'background-color 0.3s';
        button.onmouseover = function() {
            button.style.backgroundColor = 'lightgrey';
        };
        button.onmouseout = function() {
            button.style.backgroundColor = 'grey';
        };
    };

    styleButtons(prevButton);
    styleButtons(nextButton);

    const url = window.location.href.split('?')[0] + '?artykul=' + addedArticleId;
    history.pushState({}, '', url);
 
    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.style.display = 'block';
    }, 50);
  
    addPointsToUser(user.uid, 5);
}

async function getAdjacentArticle(currentArticleId, direction) {
    const articlesCollection = db.collection('articles');
    const currentArticleDoc = await articlesCollection.doc(currentArticleId).get();
    const currentArticleData = currentArticleDoc.data();
    
    let query;
    if (direction === 'prev') {
        query = articlesCollection
            .orderBy('date', 'desc')
            .startAfter(currentArticleData.date)
            .limit(1);
    } else if (direction === 'next') {
        query = articlesCollection
            .orderBy('date', 'asc')
            .startAfter(currentArticleData.date)
            .limit(1);
    }

    const adjacentArticles = await query.get();
    if (!adjacentArticles.empty) {
        return adjacentArticles.docs[0];
    }
    return null;
}

function updateViewsCount(articleId) {
    const articleRef = db.collection('articles').doc(articleId);

    articleRef.update({ views: firebase.firestore.FieldValue.increment(1) })
        .catch((error) => {
            console.error('Błąd podczas aktualizacji liczby wyświetleń:', error);
        });
}

function applyTextFormatting(text) {
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
    overlay.classList.add('hidden');

    overlay.addEventListener('animationend', function() {
      overlay.style.display = 'none';
      overlay.classList.remove('hidden');
    }, {once: true});
}
