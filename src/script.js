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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function weatherForecast(response){
  //console.log(response.data.daily);
  let forecast = response.data.daily;
  let weatherForecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

 
  forecast.forEach(function(forecastDay, index){

    if(index < 6) {
  

  forecastHTML = forecastHTML +

    `   
          <div class="col-2">
            <div class="day-forecast">${formatDay(forecastDay.dt)}</div>
            
            <div class="image" >
              <img
              src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
              alt=""
               />
            </div>
             
          <div class="max-temp">
             ${Math.round(forecastDay.temp.max)}°
             <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
          
           
        
        
        </div>


          </div>`;
  }
    

  });

         
          forecastHTML = forecastHTML + `</div>`;
          weatherForecastElement.innerHTML = forecastHTML;
          
}


function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(weatherForecast);



  console.log(apiLink);

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

  getForecast(response.data.coord);

}
 

let dateElement = document.querySelector("#updateTime");
let currentTime = new Date();
dateElement.innerHTML = `Updated on: ${formatDate(currentTime)}`;


function search(city){

let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiLink).then(weatherCondition);
}

function searchLocation(event) {
  event.preventDefault();
  let cityName = document.querySelector("#citySearch").value;
  search(cityName);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", searchLocation);

search("Lagos");



