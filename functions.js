
function createMap() {
    var map = L.map('map').setView([37.8, -96.9], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    let randomNumbers = [];
    let localities = [];
    for (let i = 0; i < 3; i++) {
        const lat = getRandomInRange(30, 35, 3);
        const lon = getRandomInRange(-90, -100, 3);
        randomNumbers.push([lat, lon])
        locality = getLocality(lat, lon)
        localities.push(locality)
        console.log(randomNumbers)
        console.log(localities)
        var marker = L.marker([lat, lon]).addTo(map);

        const newlocation = document.createElement("h1");
        newlocation.innerHTML = `Marker ${i+1}: Latitude: ${lat}, Longitude: ${lon}`;
        document.body.appendChild(newlocation);
        const newlocality = document.createElement("h2");
        newlocality.innerHTML = `Locality: ${locality}`;
        document.body.appendChild(newlocality);
    }
}

function getLocality(latitude, longitude) {
        const apiURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", apiURL, false);

        /* 
        Setting the third thing here to false causes an error in Chrome,
         but I don't know how to fix it. The error is as follows:

        Synchronous XMLHttpRequest on the main thread is deprecated because of 
        its detrimental effects to the end user's experience. For more help, 
        check https://xhr.spec.whatwg.org/. 
        1 source 
        functions.js:35
        */
       
        xmlhttp.send();
    
        if (xmlhttp.status === 200) {
            const response = JSON.parse(xmlhttp.responseText);
            const locality = response.locality
            return locality
    }
}
window.onload = createMap();

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}