document.addEventListener("DOMContentLoaded", function() {
    const id = '4efd5206eff842dabe175946231612';

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-icon");
    const weatherIcon = document.getElementById("icon");
    const convertButton = document.getElementById("convert-button");
    const wind = document.getElementById("wind-data");
    const humidity = document.getElementById("humid-data");
    const temperature = document.getElementById("temp");
    const desc = document.getElementById("desc");
    const location = document.getElementById("location");
    const uvindex = document.getElementById("uv-index");
    const precipitaton = document.getElementById("ppt");
    const box= document.getElementById("transparent-box");
    const snackbar= document.getElementById("snackbar");
    const history= document.getElementById("history");

    const setWeatherDetails = (data) => {
        desc.innerHTML = data.current.condition.text;
        temperature.innerHTML = data.current.temp_c + "°C";
        humidity.innerHTML = data.current.humidity + "%";
        wind.innerHTML = data.current.wind_kph;
        location.innerHTML = data.location.name + ", " + data.location.country;
        uvindex.innerHTML = data.current.uv;
        precipitaton.innerHTML = data.current.precip_mm;

        

        switch (data.current.condition.text) {
            case 'Sunny':
               weatherIcon.style.backgroundImage = 'url("../assets/sunny.png")';
                break;
        
            case 'Clear':
               weatherIcon.style.backgroundImage = 'url("../assets/clear.png")';
                break;
        
            case 'Partly cloudy':
               weatherIcon.style.backgroundImage = 'url("../assets/partial-cloudy.png")';
                break;
        
            case 'Cloudy':
               weatherIcon.style.backgroundImage = 'url("../assets/cloudy.png")';
                break;
        
            case 'Overcast':
               weatherIcon.style.backgroundImage = 'url("../assets/overcast.png")';
                break;
        
            case 'Mist':
            case 'Fog':
               weatherIcon.style.backgroundImage = 'url("../assets/fog.png")';
                break;
        
            case 'Rain':
            case 'Light rain':
            case 'Moderate rain':
            case 'Heavy rain':
               weatherIcon.style.backgroundImage = 'url("../assets/rainy.png")';
                break;
        
            case 'Snow':
            case 'Light snow':
            case 'Moderate snow':
            case 'Heavy snow':
               weatherIcon.style.backgroundImage = 'url("../assets/snow.png")';
                break;
        
            case 'Thunderstorm':
               weatherIcon.style.backgroundImage = 'url("../assets/thunderstorm.png")';
                break;
        
            default:
               weatherIcon.style.backgroundImage = 'url("../assets/sunny.png")';
                break;
        }        
        
    }

    const callAPI = (id) => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${id}&q=${searchInput.value}&days=1&aqi=no&alerts=no`)
            .then(response => {
                if (!response.ok) {
                    snackbar.className = "show";
                    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);

                }
                return response.json()
            })
            .then(data => {
                setWeatherDetails(data);
                animateTemperature();
            })
            .catch(error => console.log(error))
    }

    searchButton.addEventListener("click", (e) => {
    if (searchInput.value == "") {
        snackbar.className = "show";
        setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    } else {
        callAPI(id);
    }
    });

    convertButton.addEventListener("click", (e) => {
        if (temperature.innerHTML.includes("C")) {
            temperature.innerHTML = (parseInt(temperature.innerHTML) * 9/5 + 32) + "°F";
        } else {
            temperature.innerHTML= (Math.round((parseInt(temperature.innerHTML) - 32) * 5/9)) + "°C";
        }
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchButton.click();
        }
    })

    function animateTemperature() {
        box.style.animation = 'fadeIn 0.5s ease-in-out';
    }
    
    box.addEventListener('animationend', () => {
        box.style.animation = 'none';
    });

    history.addEventListener("click", (e) => {
        window.location.href = "/public/views/history.html";
    });

    
});

