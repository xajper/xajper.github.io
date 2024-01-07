document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const memeImage = document.getElementById('memeImage');

    generateButton.addEventListener('click', function () {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => {
                const memes = data.data.memes;
                const randomIndex = Math.floor(Math.random() * memes.length);
                const randomMeme = memes[randomIndex];
                memeImage.src = randomMeme.url;
            })
            .catch(error => {
                console.error('Error fetching memes:', error);
            });
    });
});
