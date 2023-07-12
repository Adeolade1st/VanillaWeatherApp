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

function weatherForecast(){
  let weatherForecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Wed","Thur","Fri","Sat","Sun","Mon"];
  days.forEach(function(day){

  forecastHTML = forecastHTML +

    `   
          <div class="col-2">
            <div class="day-forecast">${day}</div>
            
            <div class="image" >
              <img
              src="http://openweathermap.org/img/wn/04d@2x.png"
              alt=""
               />
            </div>
             
          <div class="max-temp">
             40°
             <span class="min-temp">32°</span>
          
           
        
        
        </div>


          </div>`;

  });

         
          forecastHTML = forecastHTML + `</div>`;
          weatherForecastElement.innerHTML = forecastHTML;
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

  fareneihtTemperature = temperature;

}


let dateElement = document.querySelector("#updateTime");
let currentTime = new Date();
dateElement.innerHTML = `Updated on: ${formatDate(currentTime)}`;


function search(city){

let apiKey = "1cb6c613345a0d8b9e863edd3e2cbc11";
let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiLink).then(weatherCondition);
}

function searchLocation(event) {
  event.preventDefault();
  let cityName = document.querySelector("#citySearch").value;
  search(cityName);
}

function changeTofahrenheitTemp(event){
  event.preventDefault();
  let fareneihtTemp = Math.round(fareneihtTemperature * 9/5) + 32 
  let h1 = document.querySelector("#temp");
  h1.innerHTML =`${fareneihtTemp}`;

}

let fareneihtTemperature = "null";

function changeToCelcius(event){
  event.preventDefault();
  let celciusClick = document.querySelector("#temp");
  celciusClick.innerHTML=`${fareneihtTemperature}`;

}


let fareneihtTemp = document.querySelector("#fahrenheit");
fareneihtTemp.addEventListener("click", changeTofahrenheitTemp);

let celciusTemp = document.querySelector("#celcius");
celciusTemp.addEventListener("click", changeToCelcius);


let form = document.querySelector("#searchForm");
form.addEventListener("submit", searchLocation);

search("Lagos");
weatherForecast();
