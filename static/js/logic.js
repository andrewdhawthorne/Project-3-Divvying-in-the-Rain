document.addEventListener("DOMContentLoaded", function() {
  console.log("Fetching data...");

  let map;
  let markers = []; // To store the markers on the map

  // Initialize the map and fetch data
  fetch('http://127.0.0.1:5000/api/v1.0/start_stations')
    .then(response => response.json())
    .then(data => {
      console.log("Fetch successful. Data:", data);
      // Call a function to process the data 
      processMapData(data);

      // Add event listener to the dropdown
      const locationDropdown = document.getElementById("location-dropdown");
      locationDropdown.addEventListener("change", function() {
        const selectedLocation = locationDropdown.value;
        updateMapMarkers(selectedLocation, data);
      });

    })
    .catch(error => console.error('Error:', error));

  function processMapData(data) {
    // Initialize the map
    map = L.map("map", {
      center: [41.8781, -87.6298],
      zoom: 13
    });

    // Adding a tile layer (the background map image) to our map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers to the map
    data.forEach(entry => {
      var marker = L.marker([entry.latitude, entry.longitude]).addTo(map);
      marker.bindPopup(`<b>${entry._id}</b>`);
      markers.push(marker);
    });
  }

  function updateMapMarkers(selectedLocation, data) {
    // Clear existing markers from the map
    markers.forEach(marker => map.removeLayer(marker));
  
    if (selectedLocation === "location1") {
      // Add markers for all stations
      data.forEach(entry => {
        var marker = L.marker([entry.latitude, entry.longitude]).addTo(map);
        marker.bindPopup(`<b>${entry._id}</b>`);
        markers.push(marker);
      });
    } else {
      // Filter data based on selectedLocation (implement your own logic here)
      const filteredData = data.filter(entry => entry.location === selectedLocation);
  
      // Add filtered markers to the map
      filteredData.forEach(entry => {
        var marker = L.marker([entry.latitude, entry.longitude]).addTo(map);
        marker.bindPopup(`<b>${entry._id}</b>`);
        markers.push(marker);
      });
    }
  }
});


  
    
  
  


