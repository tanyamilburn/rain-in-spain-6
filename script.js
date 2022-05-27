// require('dotenv').config()
// console.log(process.env)
let APIkey = "f767322c6603d96df24acb38c5f96cbd"
// Variables
let input = document.querySelector('.input')
// Search button event listener
let searchButton = document.querySelector(".searchButton");
let cityForecast = document.querySelector(".cityForecast")
let fiveDayForecast = document.querySelector(".fiveDayForecast")
searchButton.addEventListener("click", callGeoCoordinates)
searchButton.addEventListener("click", createSearchList)
// searchButton.addEventListener("click", createTodayForecast)
let today = moment();

// Fetch request to API
function callGeoCoordinates(){
    //capture input field
    let cityName = input.value
    let baseUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    let url = baseUrl + cityName + "&APPID=" + APIkey

    fetch(url)
        .then(result => result.json())
        .then(result => {
            console.log(result)
            let temp = convertKToF(result.main.temp)
            
            getForecastWithCoords(result.coord)
            
            renderDailyForecastToScreen(result.name)

        })

    //pass key into API
}


function getForecastWithCoords(coord){
    let lon = coord.lon
    let lat = coord.lat
    let url = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey
    fetch(url)
    .then(result => result.json())
    .then(result => {
          console.log(result)
    })

    
}

function convertKToF(tempInK){
    return (tempInK + 459.67) * 5/9
}

// create past search buttons
function createSearchList(){
    let pastSearchButton = document.createElement("button");
    pastSearchButton.innerHTML= input.value;
    let pastSearchSection = document.querySelector(".pastSearches");
    pastSearchSection.appendChild(pastSearchButton);
}


function renderDailyForecastToScreen(cityName) {
    let cityTitle = document.querySelector(".cityTitle")
    cityTitle.innerHTML = cityName

}

function createForecastScaffold() {
    let cityTitle = document.createElement("h2")
    let todayDate = document.createElement("h2")
    let todayTemp = document.createElement("p")
    let todayWind = document.createElement("p")
    let todayHumidity = document.createElement("p")
    let uvIndex = document.createElement("p")
    
    cityTitle.classList.add("cityTitle")
    todayDate.classList.add("todayDate")
    todayTemp.classList.add("todayTemp")
    todayWind.classList.add("todayWind")
    todayHumidity.classList.add("todayHumidity")
    uvIndex.classList.add("uvIndex")
    
    cityForecast.appendChild(cityTitle)
    cityForecast.appendChild(todayDate)
    cityForecast.appendChild(todayTemp)
    cityForecast.appendChild(todayWind)
    cityForecast.appendChild(todayHumidity)
    cityForecast.appendChild(uvIndex)

    $(".todayDate").text(today.format("MM/DD/YY"));
    todayTemp.innerHTML = "Temp:"
    todayWind.innerHTML = "Wind:"
    todayHumidity.innerHTML = "Humidity:"
    uvIndex.innerHTML = "UV:"



    for (i = 1; i < 6; i++) {
        let forecastBox = document.createElement("div")
        let date = document.createElement("h2")
        let temp = document.createElement("p")
        let wind = document.createElement("p")
        let humidity = document.createElement("p")

        forecastBox.classList.add("forecast")
        forecastBox.classList.add(`day${i}`)
        date.classList.add("date")
        temp.classList.add("temp")
        wind.classList.add("wind")
        humidity.classList.add("humidity")

        forecastBox.appendChild(date)
        forecastBox.appendChild(temp)
        forecastBox.appendChild(wind)
        forecastBox.appendChild(humidity)
        fiveDayForecast.appendChild(forecastBox)

        temp.innerHTML = "Temp:"
        wind.innerHTML = "Wind:"
        humidity.innerHTML = "Humidity:"
    }
}

createForecastScaffold()
// create5DayScaffold()
// createTodayForecast()

//populate information into HTML (respons object)
//render information to screen

// Notes:connect to geo location with promise based .then method

// let myFuntionName = function (param1) {
//     return param1
// }

// let myArrowFunction = param1 => param1 + 1