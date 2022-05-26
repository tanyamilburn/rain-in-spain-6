// require('dotenv').config()
// console.log(process.env)
let APIkey = "f767322c6603d96df24acb38c5f96cbd"
// Variables
let input = document.querySelector('.input')
// Search button event listener
let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", callGeoCoordinates)

// Fetch request to API
function callGeoCoordinates(){
    //capture input field
    let cityName = input.value
    console.log(cityName)
    let baseUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    let url = baseUrl + cityName + "&APPID=" + APIkey

    fetch(url)
        .then(res => console.log(res))

    //pass key into API
}

//populate information into HTML (respons object)
//render information to screen

// Notes:connect to geo location with promise based .then method

// let myFuntionName = function (param1) {
//     return param1
// }

// let myArrowFunction = param1 => param1 + 1