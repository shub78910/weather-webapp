// console.log("hello bitch")
let username = document.querySelector(".username");
let name = prompt("Enter your name: ")
username.innerHTML = `<p style="font-size:1.7rem; color:#778899;">Hello ${name}</p><br>
<p style="font-size:1.1rem">
Hope you are having a great day!<br> Here's what Today looks like</p>`



let img = document.querySelector(".image");
let temp = document.querySelector(".currtemp");
let description = document.querySelector(".desc");
let feel = document.querySelector(".feel");
let city = document.querySelector(".city");
let country = document.querySelector(".country");
let date = document.querySelector(".date");
let notif = document.querySelector(".notif");
let faren = document.querySelector(".faren");
let faren_unit = document.querySelector(".faren_unit");


// App data
const weather = {};

weather.temp = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;

// API KEY
let key = "1ab58bbd7580d4de74996d85758696d9";


//checking geolocation available?

if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else{
    notif.style.display="block";
    notif.innerHTML=`<p>Your browser does not support Geolocation. Sorry.</p>`;
}

//taking the longitudes and latitudes.

function setPosition(position){
    let lati = position.coords.latitude;
    let longi = position.coords.longitude;

    getWeather(lati,longi);
    
}

function showError(error){
    notif.style.display="block";
    notif.innerHTML=`<p>${error.message}</p>`;
}


// showing the spinner when loading

const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 1000);
}

function getWeather(lati,longi){
    let api =`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${key}`;
    showSpinner()
    fetch(api)
    
        .then(function (response){
            let data = response.json();
            return data
        })
        .then(function (data){
            weather.temp.value =Math.floor(data.main.temp - KELVIN);
            weather.description= data.weather[0].description;
            weather.img = data.weather[0].icon;
            weather.city=data.name;
            weather.country=data.sys.country;
            weather.feel = data.main.feels_like;
        })

        .then(function(){
            showweather();
        })        
}


function showweather(){
    img.innerHTML = `<img src="images used/${weather.img}.png"/>`;
    temp.innerHTML = `${weather.temp.value}°C`;
    description.innerHTML = `${weather.description}`;
    feel.innerHTML = ` ${Math.floor(weather.feel - KELVIN)}`;
    city.innerHTML = `${weather.city}`;
    country.innerHTML = `${weather.country}`;

    faren_num = Math.floor(convert(weather.temp.value))
    faren_unit.innerHTML = `<p>${faren_num}°F</p>`
}

//why onlu temp ko .value and not everyone else.
// when i tried it with with .value. it gives me error.

function convert(temp){
    return ((temp*(9/5))+32)
}



//actually wnated to display farenhiet on the same spot as celcius after the user clicks the div, but then
//but had some problems, therefore settled with two different spaces.

