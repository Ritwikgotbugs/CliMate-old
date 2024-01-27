document.addEventListener("DOMContentLoaded", function() {

    const historyList = document.getElementById("history-list");
    const backButton = document.getElementById("back-icon");

    const fetchHistory = async () => {
        const response = await fetch('/fetch-history');
        const data = await response.json();
    
        // Clear existing list items
        historyList.innerHTML = '';
    
        // Get the latest 5 data entries or all if there are fewer than 5
        const latestEntries = data.slice(-5);
    
        // Iterate over the latest entries array and create list items
        latestEntries.forEach(entry => {
            const listItem = document.createElement('li');
            listItem.classList.add('history-entry');
    
            const icon = document.createElement('div');
            icon.style.backgroundImage = `url(${entry.weatherIcon})`;
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
    
    fetchHistory();


    backButton.addEventListener('click', () => {
        window.location.href = '/';
    });
});