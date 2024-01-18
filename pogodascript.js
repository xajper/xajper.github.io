const apiKey = '02dda2d3d76a247ab785eeb4dd4dab57';

async function getWeather() {
  const cityInput = document.getElementById('cityInput');
  const weatherInfo = document.getElementById('weatherInfo');

  if (cityInput.value === '') {
    alert('Wpisz nazwę miasta...');
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric&lang=pl`);
    const data = await response.json();

    if (data.cod === '404') {
      alert('Nie znaleziono takiego miasta.');
      return;
    }

    const temperature = data.main.temp;
    const description = data.weather[0].description;

    weatherInfo.innerHTML = `<p><i class="fas fa-thermometer-half"></i> Temperatura: ${temperature} &#8451;</p>
                             <p><i class="fas fa-info-circle"></i> Szczegóły: ${description}</p>`;
    
    weatherInfo.classList.add('show');

  } catch (error) {
    console.error('Error:', error);
  }
}