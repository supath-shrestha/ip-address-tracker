let API_URL = 'https://geo.ipify.org/api/v2/country,city?'
let API_KEY = 'at_j9biQqdwAJEvgfpG1vCprYNCEZ5BQ'

console.log(API_KEY)


let map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.control.zoom({ position: 'bottomright' }).addTo(map);

let myMarkerIcon = L.icon({
    iconUrl: './images/icon-location.svg',
});

let marker = L.marker([0, 0], {
    icon: myMarkerIcon,
});

marker.addTo(map);


function displayResult(data) {
    document.querySelector("#ipAddressText").textContent = `${data['ip']}`
    document.querySelector("#locationText").textContent = `${data['city'] + ', ' + data['region'] + ', ' + data['country']}`
    document.querySelector("#timezoneText").textContent = `UTC ${data['timezone']}`
    document.querySelector("#ispText").textContent = data['isp'] ? data['isp'] : "Unknown"
}

const updateMap = ({ lat, lng }) => {
    map.setView([lat, lng], 17)
    marker.setLatLng([lat, lng])
}


const locationFinder = async (val) => {
    let url = API_URL + 'apiKey=' + API_KEY

    //for user entered IP address
    if (val != null) {
        url += '&ipAddress=' + val
    }

    let response = await fetch(url)
    let data = await response.json()

    let result = {
        ip: data['ip'],
        isp: data['isp'],
        city: data['location']['city'],
        region: data['location']['region'],
        country: data['location']['country'],
        lat: data['location']['lat'],
        lng: data['location']['lng'],
        timezone: data['location']['timezone'],
    }

    updateMap({
        lat: result.lat,
        lng: result.lng,
    })

    displayResult(result)
}



document.querySelector("#enterBtn").addEventListener("click", () => {
    let userInput = document.querySelector("#userInput").value

    if (userInput.trim() != "") {
        locationFinder(userInput)
    }
})

locationFinder(null)




