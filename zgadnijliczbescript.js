const min = 1;
const max = 100;
const losowaLiczba = Math.floor(Math.random() * (max - min + 1)) + min;
let historia = [];

function sprawdz() {
    const propozycja = document.getElementById("propozycja").value;
    if (propozycja < min || propozycja > max) {
      alert("Liczba musi znajdować się w przedziale od " + min + " do " + max);
      return;
    }
  historia.push(propozycja);
  const historiaElement = document.getElementById("historia");
  historiaElement.innerHTML = "";
  for (const propozycja of historia) {
    historiaElement.innerHTML += `<p>${propozycja}</p>`;
  }

  const podpowiedziElement = document.getElementById("podpowiedzi");
  if (propozycja > losowaLiczba) {
    podpowiedziElement.innerHTML = "Twoja liczba jest za duża!";
  } else if (propozycja < losowaLiczba) {
    podpowiedziElement.innerHTML = "Twoja liczba jest za mała!";
  } else {
    podpowiedziElement.innerHTML = "Brawo! Zgadłeś liczbę!";
    document.getElementById("sprawdz").disabled = true;
  }
}

document.getElementById("sprawdz").addEventListener("click", sprawdz);
