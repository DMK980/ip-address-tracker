
// global values

// input values 
const input = document.getElementById("inputfield")
const submitbtn = document.getElementById("submitbtn")
const inputcontainer = document.getElementsByClassName("ip-input-container")[0]
const error = document.getElementsByClassName("error-message")[0]

// output values
const ipOutput = document.getElementById("ip-output");
const locationOutput = document.getElementById("location-output");
const timezoneOutput = document.getElementsByClassName("utc-offset")[0];
const ispOutput = document.getElementById("isp-output");

// validated input value holders
let ip = "";
let domain = "";

// longitude and latitude
let lat = 51.505
let long = -0.09

// map marker icon
const myMarker = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [38, 50]
})

// validation logic
const ipAddressValidation = (input)=>{
    let ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    let ipv6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    let domainregex = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
    let errorvisible = "visible"

    if(ipv4.test(input)||ipv6.test(input)||domainregex.test(input)){
        // saving values
        ipv4.test(input)||ipv6.test(input) === true ? ip = input : ip = "";
        domainregex.test(input) === true ? domain = input : domain = "";

        // remove error message if visible
        if(error.classList.contains(errorvisible)){
            error.classList.remove(errorvisible)
        }
        return true
    } else {
        // make error message visible
        if(!error.classList.contains(errorvisible)){
            error.classList.add(errorvisible)
        }
        return false
    }   
}

// call to the api
let marker = null;
const apiCall = async ()=>{

    let apikey = "at_9gfTpPGgkIMtt8kw8dFhMIcz7IeOy";
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apikey}&ipAddress=${ip}&domain=${domain}`

    try{
        const response = await fetch(url,{
            method: "GET"
        })
        let data = await response.json(); 

        // changing html output
        ipOutput.innerHTML = data.ip;
        locationOutput.innerHTML = `${data.location.region} <br/> ${data.location.city} ${data.location.postalCode}`;
        timezoneOutput.innerHTML = data.location.timezone;
        ispOutput.innerHTML = data.isp;
        lat = data.location.lat;
        long = data.location.lng;

        // changing map view
        
        map.flyTo(new L.LatLng(lat,long),13);
        if (marker!== null){
            marker.removeFrom(map)
        }
        marker = L.marker(new L.LatLng(lat,long),{icon: myMarker}).addTo(map);
    } catch(error){
        console.log(error)
    } 
}

// setting map
const map = L.map("map").setView([lat,long],13);
map.flyTo(new L.LatLng(lat,long),13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  
// calling api first time to get users ip address
let x = 0
while (x<1){
    apiCall()
    x++
}

// Click event of the submit button
submitbtn.addEventListener("click",()=>{
    // input value
    let inputval = input.value
    // validating input
    ipAddressValidation(inputval)
    // calling api and setting map
    apiCall()
})
