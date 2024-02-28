const URL = "https://api.openweathermap.org/data/2.5/weather?"
const API_KEY = ""
const icon_url = "http://openweathermap.org/img/wn/"

const temp_span =document.querySelector("#Temp")
const speed_span =document.querySelector("#speed")
const direction_span =document.querySelector("#direction")
const icon_img = document.querySelector("img")
const description = document.querySelector("#description")

const getLocation = () => {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            document.querySelector("#lat").innerHTML = position.coords.latitude.toFixed(3) + ", "
            document.querySelector("#lng").innerHTML = position.coords.longitude.toFixed(3)
           getWeather(position.coords.latitude, position.coords.longitude)
        }),(error => {
            alert(error)
        }) 
    } else {
        alert("your browser doesnt support geolocation")
    }
    
}

const getWeather = (lat,lng)=> {
    const address = URL +
    "lat=" + lat +
    "&lon=" + lng +
    "&units=metric" + 
    "&appid=" + API_KEY
    axios.get(address)
    .then(response => {
        const json = response.data
        temp_span.innerHTML = json.main.temp + "  &#8451;"
        speed_span.innerHTML = json.wind.speed + "/kmh"
        direction_span.innerHTML = json.wind.deg + "&deg"
        description.innerHTML = json.weather[0].description
        const image = icon_url+ json.weather[0].icon + "@2x.png"
        icon_img.src= image
    }).catch(error => {
        alert(error)
    })
}

getLocation()
