import "../css/weather_app.css";
import clear_day_icon from "../img/weathericons/SVG/4th Set - Color/clear-day.svg";
import clear_night_icon from "../img/weathericons/SVG/4th Set - Color/clear-night.svg";
import cloudy_icon from "../img/weathericons/SVG/4th Set - Color/cloudy.svg";
import fog_icon from "../img/weathericons/SVG/4th Set - Color/fog.svg";
import hail_icon from "../img/weathericons/SVG/4th Set - Color/hail.svg";
import partly_cloudy_day_icon from "../img/weathericons/SVG/4th Set - Color/partly-cloudy-day.svg";
import partly_cloudy_night_icon from "../img/weathericons/SVG/4th Set - Color/partly-cloudy-night.svg";
import rain_snow_showers_day_icon from "../img/weathericons/SVG/4th Set - Color/rain-snow-showers-day.svg";
import rain_snow_showers_night_icon from "../img/weathericons/SVG/4th Set - Color/rain-snow-showers-night.svg";
import rain_snow_icon from "../img/weathericons/SVG/4th Set - Color/rain-snow.svg";
import rain_icon from "../img/weathericons/SVG/4th Set - Color/rain.svg";
import showers_day_icon from "../img/weathericons/SVG/4th Set - Color/showers-day.svg";
import showers_night_icon from "../img/weathericons/SVG/4th Set - Color/showers-night.svg";
import sleet_icon from "../img/weathericons/SVG/4th Set - Color/sleet.svg";
import snow_showers_day_icon from "../img/weathericons/SVG/4th Set - Color/snow-showers-day.svg";
import snow_showers_night_icon from "../img/weathericons/SVG/4th Set - Color/snow-showers-night.svg";
import snow_icon from "../img/weathericons/SVG/4th Set - Color/snow.svg";
import thunder_rain_icon from "../img/weathericons/SVG/4th Set - Color/thunder-rain.svg";
import thunder_showers_day_icon from "../img/weathericons/SVG/4th Set - Color/thunder-showers-day.svg";
import thunder_showers_night_icon from "../img/weathericons/SVG/4th Set - Color/thunder-showers-night.svg";
import thunder_icon from "../img/weathericons/SVG/4th Set - Color/thunder.svg";
import wind_icon from "../img/weathericons/SVG/4th Set - Color/wind.svg";

console.log("Nis744 Weather App");

const currentInfoError = document.querySelector("#current-info-error");
let currentLocationLatitude = undefined;
let currentLocationLongitude = undefined;

function setCurrentLocationBtnEventListener(){
    let getCurrentLocationBtn = document.querySelector("#location-btn");
    getCurrentLocationBtn.addEventListener('click', () => {
        console.log("CURRENT LOCATION BTN CLICKED");
        getCurrentLocationData();
    });
}

function submitCurrentLocationBtnEventListener(){
    let searchLocationBtn = document.querySelector("#search-btn");
    searchLocationBtn.addEventListener('click', () =>{
        console.log("Search Location Btn Clicked");
    });
}

async function fetchWeatherData(location_data){
    let weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location_data}?unitGroup=us&key=HQ4DRQQ34NZCE8BSCBNVUVCHW&contentType=json`);
    
}

function fetchWeatherDataPromise(location_data){
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location_data}?unitGroup=us&key=HQ4DRQQ34NZCE8BSCBNVUVCHW&contentType=json`)
    .then((response) => {
        console.log(response.json());
    })
    .catch((error)=>{
        console.log(error);
    })
}

function renderUpcomingForecasts(){
    const forecastData = [
            { day: 'Fri', date: 'Jul 4', icon: 'clear-day', condition: 'Partly Cloudy', high: 26, low: 18 },
            { day: 'Sat', date: 'Jul 5', icon: 'cloud', condition: 'Cloudy', high: 23, low: 17 },
            { day: 'Sun', date: 'Jul 6', icon: 'cloud-showers-heavy', condition: 'Showers', high: 21, low: 16 },
            { day: 'Mon', date: 'Jul 7', icon: 'sun', condition: 'Sunny', high: 27, low: 19 },
            { day: 'Tue', date: 'Jul 8', icon: 'bolt', condition: 'Thunderstorms', high: 22, low: 17 },
            { day: 'Wed', date: 'Jul 9', icon: 'cloud-sun', condition: 'Partly Cloudy', high: 24, low: 18 },
            { day: 'Thu', date: 'Jul 10', icon: 'sun', condition: 'Sunny', high: 28, low: 20 }
    ];

    const forecastContainer = document.querySelector('.forecast-days');
    forecastData.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-day';
        const forecastIcon = day.icon;
        const forecastIconFormatted = forecastIcon.replaceAll("-", "_");
        const forecastIconSrc = `${forecastIconFormatted}_icon`;
        forecastItem.innerHTML = `
            <div class="forecast-date">${day.day}<br>${day.date}</div>
            <img src="${clear_day_icon}" alt="Icon image for ${forecastIconFormatted}"></img>
            <div class="forecast-temp">${day.high}°</div>
            <div class="forecast-condition">${day.condition}</div>
            <div class="forecast-low">Low: ${day.low}°</div>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

function getCurrentLocationData(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(updateCurrentLocation, getCurrentLocationError);
    }else{
        updateCurrentLocationErrorMsg("Current Location cannot be retreived! Enter your location manually.");
    }
}

function updateCurrentLocation(position){
    currentLocationLatitude = position.coords.latitude;
    currentLocationLongitude = position.coords.longitude;

    let currentLocationLatData = `${currentLocationLatitude},${currentLocationLongitude}`;
    console.log(currentLocationLatData);
    fetchWeatherDataPromise(currentLocationLatData);
}

function getCurrentLocationError(){
    updateCurrentLocationErrorMsg("Error! No location data available");
}

function updateCurrentLocationErrorMsg(erroMsg){
    currentLocation.textContent = erroMsg;
}

setCurrentLocationBtnEventListener();
submitCurrentLocationBtnEventListener();
renderUpcomingForecasts();