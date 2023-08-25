console.log("Fetching data...");


fetch('http://127.0.0.1:5000/api/v1.0/start_stations')
  .then(response => response.json())
  .then(data => {
    console.log("Fetch successful. Data:", data);
    // Call a function to process the data 
    processMapData(data);
  })
  .catch(error => console.error('Error:', error));

function processMapData(data) {
  // Initialize the map
  var map = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 13
  });

  // Adding a tile layer (the background map image) to our map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Loop through the data points and add markers to the map
  data.forEach(entry => {
    var marker = L.marker([entry.latitude, entry.longitude]).addTo(map);
    marker.bindPopup(`<b>${entry._id}</b>`);
  });
}
