function calculateBMI() {
    // Get user input
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);

    // Check if the input is valid
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert("Proszę wprowadzić prawidłowe wartości wagi i wzrostu.");
        return;
    }

    // Calculate BMI
    var bmi = weight / ((height / 100) ** 2);

    // Display result
    var resultElement = document.getElementById("result");
    resultElement.innerHTML = "Twoje BMI to: " + bmi.toFixed(2);

    // Interpret BMI category
    var category = "";
    if (bmi < 18.5) {
        category = "Niedowaga";
    } else if (bmi < 24.9) {
        category = "Waga normalna";
    } else if (bmi < 29.9) {
        category = "Nadwaga";
    } else {
        category = "Otyłość";
    }

    resultElement.innerHTML += "<br>Twoja kategoria BMI to: " + category;
}
