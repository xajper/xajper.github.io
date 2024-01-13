function addToDatabase() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
  
    // Pobierz istniejącą bazę danych
    fetch('database.json')
      .then(response => response.json())
      .then(data => {
        // Dodaj nowy rekord
        const newRecord = { id: data.length + 1, name, age: parseInt(age) };
        data.push(newRecord);
  
        // Zapisz zmienioną bazę danych z powrotem do pliku
        const jsonData = JSON.stringify(data);
        fetch('database.json', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        })
          .then(() => {
            alert('Dane dodane do bazy!');
            // Możesz dodać tutaj dodatkowe akcje, jeśli są potrzebne
          })
          .catch(error => console.error('Błąd zapisu do bazy danych:', error));
      })
      .catch(error => console.error('Błąd odczytu bazy danych:', error));
  }
  