
// Setting map
const map = L.map("map").setView([51.505,-0.09],13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// validating input

// global values
const input = document.getElementById("inputfield")
const submitbtn = document.getElementById("submitbtn")
const inputcontainer = document.getElementsByClassName("ip-input-container")[0]
const error = document.getElementsByClassName("error-message")[0]

const ip = "";
const domain = "";

// validation logic
const ipAddressValidation = (input)=>{
    let ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    let ipv6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    let domainregex = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
    let errorvisible = "visible"

    if(ipv4.test(input)||ipv6.test(input)||domainregex.test(input)){
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

const apiCall = async ()=>{

    let apikey = "at_9gfTpPGgkIMtt8kw8dFhMIcz7IeOy";
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apikey}&ipAddress=${ip}&domain=${domain}`

    try{
        const response = await fetch(url,{
            method: "GET"
        })
        let data = await response.json(); 
        console.log(data.location) 
    } catch(error){
        console.log(error)
    }
    // console.log(data.ip) 
}
let x = 0
while (x<1){
    apiCall()
    x++
}

// Click event of the submit button
submitbtn.addEventListener("click",()=>{
    let inputval = input.value
    ipAddressValidation(inputval)
})
