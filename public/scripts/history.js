document.addEventListener("DOMContentLoaded", function() {

    const historyList = document.getElementById("history-list");
    const backButton = document.getElementById("back-icon");

    const fetchHistory = async () => {
        const response = await fetch('/fetch-history');
        const data = await response.json();
    
        historyList.innerHTML = '';
    
        const latestEntries = data.slice(-5);
    
        latestEntries.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.classList.add('history-entry');
    
            const icon = document.createElement('div');
            icon.style.backgroundImage = getWeatherIcon(entry.weatherCondition);
            icon.classList.add('icon');
            listItem.appendChild(icon);
    
            const location = document.createElement('div');
            location.textContent = entry.location;
            location.classList.add('text-data');
            listItem.appendChild(location);
    
            const temperature = document.createElement('div');
            temperature.textContent = `${entry.temperature}°C`;
            temperature.classList.add('text-data');
            listItem.appendChild(temperature);
    
            // Append the list item to the history list
            historyList.appendChild(listItem);
        });
    };
    
    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Sunny':
                return 'url("../assets/sunny.png")';
            case 'Clear':
                return 'url("../assets/clear.png")';
            case 'Partly cloudy':
                return 'url("../assets/partial-cloudy.png")';
            case 'Cloudy':
                return 'url("../assets/cloudy.png")';
            case 'Overcast':
                return 'url("../assets/overcast.png")';
            case 'Mist':
            case 'Fog':
                return 'url("../assets/fog.png")';
            case 'Rain':
            case 'Light rain':
            case 'Moderate rain':
            case 'Heavy rain':
                return 'url("../assets/rainy.png")';
            case 'Snow':
            case 'Light snow':
            case 'Moderate snow':
            case 'Heavy snow':
                return 'url("../assets/snow.png")';
            case 'Thunderstorm':
                return 'url("../assets/thunderstorm.png")';
            default:
                return 'url("../assets/sunny.png")';
        }
    };
    
    
    fetchHistory();


    backButton.addEventListener('click', () => {
        window.location.href = '/';
    });
});