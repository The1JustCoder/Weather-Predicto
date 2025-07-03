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
import { error } from "ajv/dist/vocabularies/applicator/dependencies";

console.log("Nis744 Weather App");


const currentInfoError = document.querySelector("#current-info-error");
let currentLocationLatitude = undefined;
let currentLocationLongitude = undefined;
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// DOM elements
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityInput = document.getElementById('city-input');
const notification = document.getElementById('notification');
const forecastContainer = document.getElementById('forecast-container');
const errorNotifications = document.getElementById('error-notification');

// Current weather elements
const locationName = document.getElementById('location-name');
const currentDate = document.getElementById('current-date');
const currentTemp = document.getElementById('current-temp');
const currentIcon = document.getElementById('current-icon');
const currentCondition = document.getElementById('current-condition');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');

const iconMap = {
  "clear-day": clear_day_icon,
  "clear-night": clear_night_icon,
  "cloudy": cloudy_icon,
  "fog": fog_icon,
  "hail": hail_icon,
  "partly-cloudy-day": partly_cloudy_day_icon,
  "partly-cloudy-night": partly_cloudy_night_icon,
  "rain-snow-showers-day": rain_snow_showers_day_icon,
  "rain-snow-showers-night": rain_snow_showers_night_icon,
  "rain-snow": rain_snow_icon,
  "rain": rain_icon,
  "showers-day": showers_day_icon,
  "showers-night": showers_night_icon,
  "sleet": sleet_icon,
  "snow-showers-day": snow_showers_day_icon,
  "snow-showers-night": snow_showers_night_icon,
  "snow": snow_icon,
  "thunder-rain": thunder_rain_icon,
  "thunder-showers-day": thunder_showers_day_icon,
  "thunder-showers-night": thunder_showers_night_icon,
  "thunder": thunder_icon,
  "wind": wind_icon
};


function setCurrentLocationBtnEventListener(){
    locationBtn.addEventListener('click', () => {
        getCurrentLocationData();
    });
}

function submitCurrentLocationBtnEventListener(){
    searchBtn.addEventListener('click', (e) =>{
        const searchedLocation = cityInput.value.trim();
        if (searchedLocation) {
            fetchWeatherData(searchedLocation);
            cityInput.value = '';
        } else {
            showNotification('Please enter a city name', true);
        }
        
    });
}

async function fetchWeatherData(location_data){
    try{
        const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location_data}?unitGroup=us&key=HQ4DRQQ34NZCE8BSCBNVUVCHW&contentType=json`);
        const weatherData = await weatherResponse.json();
        const currentWeatherData = weatherData.currentConditions;
        const next7DaysData = [...weatherData.days.slice(1, -7)];
        const currentAddress = weatherData.address;

        // Render Current Conditions
        renderCurrentCondition(currentAddress, currentWeatherData);
        // Render 7 days forecast
        renderUpcomingForecasts(next7DaysData);
    }catch(err){
        updateCurrentLocationErrorMsg("Error with your request. Please try again!");
    }
}

/**

function fetchWeatherDataPromise(location_data){
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location_data}?unitGroup=us&key=HQ4DRQQ34NZCE8BSCBNVUVCHW&contentType=json`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let currentConditionsData = data.currentConditions;
        renderCurrentCondition(data.address, currentConditionsData);
        let next7Days = [...data.days.slice(1, -7)];
        renderUpcomingForecasts(next7Days);
    })
    .catch((error)=>{
        updateCurrentLocationErrorMsg(error);
    })
}
*/

// Format date for forecast
function formatForecastDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
}

function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    // Format the date as "Thursday, July 3, 2025"
    const formattedDate = now.toLocaleDateString('en-US', options);
    
    // Update the element with id "current-date"
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
    
    return formattedDate;
}

function renderCurrentCondition(address, weatherData){
    // Update current weather
    locationName.textContent = address;
    updateCurrentDate(weatherData.datetime); 
    currentTemp.textContent = weatherData.temp;
    currentCondition.textContent = weatherData.condition;
    windSpeed.textContent = `${weatherData.windspeed} km/h`;
    humidity.textContent = `${weatherData.humidity}%`;
    pressure.textContent = `${weatherData.pressure} hPa`;
    currentIcon.src = iconMap[weatherData.icon];
}   

function renderUpcomingForecasts(forecastData){
    const forecastContainer = document.querySelector('.forecast-days');
    forecastData.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-day';
        const forecastIcon = iconMap[day.icon];
        const forecastDate = new Date(day.datetime);
        const forecastDay = dayNames[forecastDate.getDay()];
        forecastItem.innerHTML = `
            <div class="forecast-date">${forecastDay}<br/>${formatForecastDate(day.datetime)}</div>
            <hr/><br/>
            <div class ="forecast-icon-wrapper">
                <img src="${forecastIcon}" alt="Icon image for ${day.icon}"></img>
            </div>
            <div class="forecast-temp">${day.temp}°</div>
            <div class="forecast-condition">${day.description}</div>
            <br/><hr/><br/>
            <div class="forecast-high">High: ${day.tempmax}°</div>
            <div class="forecast-low">Low: ${day.tempmin}°</div>
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
    fetchWeatherData(currentLocationLatData);
}

function getCurrentLocationError(){
    updateCurrentLocationErrorMsg("Error! No location data available");
}

function updateCurrentLocationErrorMsg(erroMsg){
    showNotification(erroMsg, true);
}

// Show notification
function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.style.background = isError ? '#e74c3c' : '#2ecc71';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

setCurrentLocationBtnEventListener();
submitCurrentLocationBtnEventListener();

// By Default, show weather for Barcelona, Spain
fetchWeatherData("Barcelona, Spain");