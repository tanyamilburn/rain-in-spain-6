let APIkey = "f767322c6603d96df24acb38c5f96cbd"
let input = document.querySelector('.input')
let searchButton = document.querySelector(".searchButton");
let cityForecast = document.querySelector(".cityForecast")
let fiveDayForecast = document.querySelector(".fiveDayForecast")
let today = moment();

searchButton.addEventListener("click", callGeoCoordinates)

// Fetch request to API
function callGeoCoordinates(){
    let cityName = input.value
    let baseUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    let url = baseUrl + cityName + "&units=imperial&APPID=" + APIkey

    fetch(url)
        .then(result => result.json())
        .then(result => {
            getForecastWithCoords(result.coord)
            renderDailyForecastToScreen(result)
            createSearchList(result.name)
            getUVindex(result.coord)
        })
}

function getForecastWithCoords(coord){
    let lon = coord.lon
    let lat = coord.lat
    let url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIkey
    
    fetch(url)
        .then(result => result.json())
        .then(result => renderFiveDayForecast(result))   
}

function getUVindex(coord){
    let lon = coord.lon
    let lat = coord.lat
    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=minutely,hourly,alerts&appid=" + APIkey
    
    fetch(url) 
        .then(result => result.json())
        .then(result => renderUVindex(result.current.uvi))
}

function createSearchList(name){
    let pastSearchButton = document.createElement("button");
    let pastSearchSection = document.querySelector(".pastSearches");
    let baseUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    let url = baseUrl + name + "&units=imperial&APPID=" + APIkey

    pastSearchButton.innerHTML= name;
    pastSearchSection.appendChild(pastSearchButton);
    pastSearchButton.addEventListener("click", recallGeoCoordinates)

    function recallGeoCoordinates(){
        fetch(url)
            .then(result => result.json())
            .then(result => {
                getForecastWithCoords(result.coord)
                renderDailyForecastToScreen(result)
                getUVindex(result.coord)
            })
    }
}

function renderDailyForecastToScreen(weatherInfo){
    document.querySelector(".cityTitle").innerHTML = weatherInfo.name
    document.querySelector(".todayTemp").innerHTML = "Temp: " + weatherInfo.main.temp + "°F"
    document.querySelector(".todayWind").innerHTML = "Wind: " + weatherInfo.wind.speed + "mph"
    document.querySelector(".todayHumidity").innerHTML = "Humidity: " + weatherInfo.main.humidity + "%"
}

function renderUVindex(uvi){
    let uvIndex = document.querySelector(".uvIndex")
    uvIndex.innerHTML = "UV: " + uvi

    uvIndex.classList.remove("low", "moderate", "high", "veryHigh", "extreme")

    if(uvi < 2.99){
        uvIndex.classList.add("low")
    }
    if (uvi > 2.99 && uvi < 5.99){
        uvIndex.classList.add("moderate")
    }
    if (uvi > 5.99 && uvi < 7.99){
        uvIndex.classList.add("high")
    }
    if (uvi > 7.99 && uvi < 10.99 ){
        uvIndex.classList.add("veryHigh")
    }
     if (uvi > 10.99){
        uvIndex.classList.add("extreme")
    }
}

function renderFiveDayForecast(forecastInfo){
    let fiveDayInfo = forecastInfo.list
    let dayNum = 1
    
    for(i = 4; i <= 36; i += 8) {
        let date = fiveDayInfo[i].dt_txt.split('').splice(0,10).join('')
        document.querySelector(`.day${dayNum} .date`).innerHTML = date
        document.querySelector(`.day${dayNum} .temp`).innerHTML = `Temp: ${fiveDayInfo[i].main.temp}°F`
        document.querySelector(`.day${dayNum} .wind`).innerHTML = "Wind: " + fiveDayInfo[i].wind.speed + "mph"
        document.querySelector(`.day${dayNum} .humidity`).innerHTML = "Humidity: " + fiveDayInfo[i].main.humidity + "%"
        dayNum++
    }
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
