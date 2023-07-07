
function weatherCondition(response)
{
 let humidity = document.querySelector("#humid");
 humidity.inneHTML = "response.data.main.humidity";
console.log(response.data);
}

let city = "Lagos";
let apiKey = "1cb6c613345a0d8b9e863edd3e2cbc11";
let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units={metric}`;
axios.get(apiLink).then(weatherCondition);
