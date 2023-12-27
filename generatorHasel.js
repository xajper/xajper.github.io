function generatePassword() {
    // Logika generowania hasła (możesz dostosować według potrzeb)
    const passwordLength = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Aktualizacja wartości pola input
    document.getElementById("password").value = password;
}

function copyPassword() {
    // Kopiowanie hasła do schowka
    const passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
}
