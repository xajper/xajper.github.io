function generateQRCode() {
    const inputText = document.getElementById('inputText').value;

    if (inputText.trim() === '') {
        alert('Uzupełnij pole tekstowe.');
        return;
    }

    const qrContainer = document.getElementById('qrContainer');

    while (qrContainer.firstChild) {
        qrContainer.removeChild(qrContainer.firstChild);
    }

    generatedQRCode = new QRCode(qrContainer, {
        text: inputText,
        width: 200,
        height: 200,
    });

    animateQRCode(qrContainer);
    showDownloadButton();
}

function animateQRCode(qrContainer) {
    qrContainer.style.opacity = '0';

    setTimeout(() => {
        qrContainer.style.opacity = '1';
    }, 100);
}

function readQRCodeFromFile(input) {
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const resultContainer = document.getElementById('qrResult');
                resultContainer.innerHTML = '';

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);

                const decodedData = jsQR(context.getImageData(0, 0, img.width, img.height).data, img.width, img.height);

                if (decodedData) {
                    resultContainer.textContent = 'Zeskanowany kod: ' + decodedData.data;
                } else {
                    resultContainer.textContent = 'Zdjęcie nie zawiera kodu QR';
                }
            };
        };

        reader.readAsDataURL(file);
    }
}

function showDownloadButton() {
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.style.display = 'block';
}

function downloadQRCode() {
    if (generatedQRCode) {
        const qrImageSrc = document.getElementById('qrContainer').querySelector('img').src;
        const downloadLink = document.createElement('a');
        downloadLink.href = qrImageSrc;
        downloadLink.download = 'kod_qr.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}