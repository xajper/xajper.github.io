function generatePassword() {
    const passwordLength = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById("password").value = password;
}

function copyPassword() {
    const passwordField = document.getElementById("password");
    passwordField.select();
    
    try {
        document.execCommand("copy");
        setTimeout(() => {
            document.querySelector('.containerkopiuj input').checked = false;
        }, 1000);
    } catch (err) {
        console.error("Błąd kopiowania do schowka: ", err);
        alert("Niestety, nie udało się skopiować do schowka.");
    }
}
