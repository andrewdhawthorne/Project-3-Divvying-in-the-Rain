// Create initial map object 
let myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 13
  });

// Adding a tile layer (the background map image) to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);