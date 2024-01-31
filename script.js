const getWeather = () => {
    let cityName = document.querySelector("#input").value;
    if (cityName === "") {
        Swal.fire({
            icon: "error",
            title: "Please Enter City Name.",
        });
        return;
    }
    const spinnerHtml = `<span>Loading...</span>`;
    city_Name.innerHTML = `${spinnerHtml}`;
    weathercondition.innerHTML = `${spinnerHtml}`;
    weathertemp.innerHTML = `${spinnerHtml}`;
    countryDisplay.innerHTML = `${spinnerHtml}`;
    feelsLike.innerHTML = `${spinnerHtml}`;
    showData1.innerHTML = `${spinnerHtml}`;
    showData2.innerHTML = `${spinnerHtml}`;
    showData3.innerHTML = `${spinnerHtml}`;
    showData4.innerHTML = `${spinnerHtml}`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f1c094323d9c802d552e70c88057da8f&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod == 404) {
                Swal.fire({
                    icon: "error",
                    title: "Please Enter Valid City Name.",
                });
                const spinnerHtml = `<span>Not Found</span>`;
                city_Name.innerHTML = `${spinnerHtml}`;
                weathercondition.innerHTML = `${spinnerHtml}`;
                weathertemp.innerHTML = `${spinnerHtml}`;
                countryDisplay.innerHTML = `${spinnerHtml}`;
                feelsLike.innerHTML = `${spinnerHtml}`;
                showData1.innerHTML = `${spinnerHtml}`;
                showData2.innerHTML = `${spinnerHtml}`;
                showData3.innerHTML = `${spinnerHtml}`;
                showData4.innerHTML = `${spinnerHtml}`;
            }
            console.log(data);
            city_Name.innerHTML = `${cityName}`;
            const sunriseTime = data.sys.sunrise;
            const date1 = new Date(sunriseTime * 1000);
            const finalConversionSunrise = date1.toLocaleString();
            const sunsetTime = data.sys.sunset;
            const date2 = new Date(sunsetTime * 1000);
            const finalConversionSunset = date2.toLocaleString();
            weathercondition.innerHTML = data.weather[0].main;
            if (data.weather[0].main === "Clear") {
                weatherimage.src = "images/clear-sky.png";
            } else if (data.weather[0].main === "Clouds") {
                weatherimage.src = "images/few-clouds.png";
            } else if (data.weather[0].main === "Rain") {
                weatherimage.src = "images/rain.png";
            } else if (data.weather[0].main === "thunderstorm") {
                weatherimage.src = "images/thunderstorm.png";
            } else if (data.weather[0].main === "Haze") {
                weatherimage.src = "images/mist.png";
            } else if (data.weather[0].main === "Snow") {
                weatherimage.src = "images/snow.png";
            } else if (data.weather[0].main === "Smoke") {
                weatherimage.src = "images/smoke.png";
            }
            weathertemp.innerHTML = Math.round(data.main.temp) + "°C";
            countryDisplay.innerHTML = data.sys.country;
            feelsLike.innerHTML = data.main.feels_like + "°C";
            showData1.innerHTML = data.main.humidity + "%";
            showData2.innerHTML = data.wind.speed + "m/s";
            showData3.innerHTML = finalConversionSunrise.slice(12);
            showData4.innerHTML = finalConversionSunset.slice(12);
        })
        .catch((err) => { console.log(err) });


}

search.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather()
})
//Registered Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
    navigator.serviceWorker.ready.then((swReg) => {
        var options = {
            message: "This is message body.",
            icon: "/images/icons/icon-512x512.png",
        }
        swReg.showNotification("This is message title.", options);
    })
}