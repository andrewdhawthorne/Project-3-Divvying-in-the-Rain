// Create initial map object 
let myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 13
  });

// Adding a tile layer (the background map image) to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let queryUrl = "127.0.0.1:5000/api/v1.0/start_stations"  

// Getting our GeoJSON data
d3.json(queryUrl).then((data) => {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(myMap);
  });