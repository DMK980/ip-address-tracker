
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
    }
    
}



submitbtn.addEventListener("click",()=>{
    let inputval = input.value
    ipAddressValidation(inputval)
})
