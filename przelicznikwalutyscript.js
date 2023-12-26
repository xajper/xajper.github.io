function convertCurrency() {
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;
    var amount = document.getElementById("amount").value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            var exchangeRate = data.rates[toCurrency];
            var convertedAmount = amount * exchangeRate;
            document.getElementById("result").innerHTML = `${amount} ${fromCurrency} wynosi ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            document.getElementById("result").innerHTML = "Błąd podczas pobierania kursu wymiany. Proszę spróbuj ponownie.";
        });
}
