function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}


function weatherCondition(response)
{

  let name = response.data.name;
let nameElement = document.querySelector("#cityName");
nameElement.innerHTML= `${name}`;
console.log(response.data.name);

let humidAir = response.data.main.humidity;
 let humid = document.querySelector("#humid");
 humid.innerHTML=`Humidity: ${humidAir}%`;
console.log(response.data.main.humidity);

let temperature = Math.round(response.data.main.temp);
  let temps = document.querySelector("#temp");
  temps.innerHTML = `${temperature}`;
  console.log(response.data);

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML= `Wind: ${wind}km/h`;
  console.log(response.data.wind.speed);

  let description = response.data.weather[0].description;
  let describeElement = document.querySelector("#description");
  describeElement.innerHTML= `${description}`;
  console.log(response.data.weather[0].description);


 let icons = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `${icons}`);

 

}

function convertTemperature(event){
  event.preventDefault();
  
  let fareneiht = (temperature * 9/5)+ 32;
  let fareneihtElement = document.querySelector("#temp");
  fareneihtElement.innerHTML = `${fareneiht}`;


}

let dateElement = document.querySelector("#updateTime");
let currentTime = new Date();
dateElement.innerHTML = `Updated on: ${formatDate(currentTime)}`;

function searchLocation(event){
    event.preventDefault();
  let city = citySearch;
    let cityElement =  document.querySelector("#cityName").value;
    cityElement.innerHTML = `${city}`;
    console.log(citySearch);
}

let city = "Lagos";
let apiKey = "1cb6c613345a0d8b9e863edd3e2cbc11";
let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiLink).then(weatherCondition);


let form = document.querySelector("#searchButton");
form.addEventListener("submit", searchLocation);

let degree = document.querySelector("#fahrenheit");
degree.addEventListener("click", convertTemperature);