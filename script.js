//градусы по цельсию и город по дефолту
let currCity = "Moscow";
let units = "metric";

//объявляем переменные
let city = document.querySelector(".city");
let datetime = document.querySelector(".datetime");
let forecast = document.querySelector('.forecast');
let temperature = document.querySelector(".temperature");
let icon = document.querySelector(".icon");
let weather_minmax = document.querySelector(".weather_minmax")
let weather_realfeel = document.querySelector('.weather_realfeel');
let weather_humidity = document.querySelector('.weather_humidity');
let weather_wind = document.querySelector('.weather_wind');
let weather_pressure = document.querySelector('.weather_pressure');

//поиск
document.querySelector(".search").addEventListener('submit', e => {
    let search = document.querySelector(".search-line");
    //событие по дефолту
    e.preventDefault();
    //меняем город
    currCity = search.value;
    //получаем погоду
    getWeather();
    //очищаем
    search.value = "";
})

//получение даты и времени 
function convertTimeStamp(timestamp, timezone){
    const convertTimezone = timezone / 3600; //секунды в часы
    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("ru-RU", options);
}

//код страны в название
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["ru"], {type: "region"});
    return regionNames.of(country)
}

//получение данных
function getWeather(){
    const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&lang=ru&units=${units}`).then(res => res.json()).then(data => {   
    console.log(data); //
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone); 
    forecast.innerHTML = `<p>${data.weather[0].description}`;
    temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
    weather_minmax.innerHTML = `<p>Мин: ${data.main.temp_min.toFixed()}&#176</p><p>Макс: ${data.main.temp_max.toFixed()}&#176</p>`;
    weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
    weather_humidity.innerHTML = `${data.main.humidity}%`;
    weather_wind.innerHTML = `${data.wind.speed} м/с`;
    weather_pressure.innerHTML = `${data.main.pressure} гПa`;
})
}

//загрузка страницы
document.body.addEventListener('load', getWeather())