document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', () => {
        const city = document.getElementById('cityInput').value.trim();

        // Clear old data
        document.querySelector('.city-name').textContent = '';
        document.querySelector('.weather-condition').textContent = '';
        document.querySelector('.temp').textContent = '';

        // Check if input is empty
        if (city === '') {
            alert('Please enter a city name!');
            return;
        }

        // Fetch weather data
        fetch(`http://localhost:8080/weather?city=${city}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                // Update the UI with weather data
                document.querySelector('.city-name').textContent = city; // Show city name
                document.querySelector('.weather-condition').textContent = data.current.condition.text;
                document.querySelector('.temp').textContent = `${data.current.temp_c}°C`;
            })
            .catch(err => {
                console.error(err);
                alert('Error fetching weather data. Please check the city name or try again later.');
            });
    });
});