document.addEventListener("DOMContentLoaded", function() {
  const urls = {
    location1: 'http://127.0.0.1:5000/api/v1.0/start_stations',
    location2: 'http://127.0.0.1:5000/api/v1.0/end_stations',
    location3: 'http://127.0.0.1:5000/api/v1.0/top_routes'
  };

  const mapCenter = [41.8781, -87.6298];
  const initialZoom = 13;

  let map;
  let markers = [];

  const locationDropdown = document.getElementById("location-dropdown");

  locationDropdown.addEventListener("change", function() {
    const selectedLocation = locationDropdown.value;
    const selectedUrl = urls[selectedLocation];
    
    fetchMapData(selectedUrl);
  });

  function fetchMapData(url) {
    console.log("Fetching data from:", url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Fetch successful. Data:", data);
        clearMapMarkers();
        processMapData(data);
      })
      .catch(error => console.error('Error:', error));
  }

  function clearMapMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
  }

  function processMapData(data) {
    if (!map) {
      initializeMap();
    }

    data.forEach(entry => {
      const marker = L.marker([entry.latitude, entry.longitude]).addTo(map);
      marker.bindPopup(`<b>${entry._id}</b>`);
      markers.push(marker);
    });
  }

  function initializeMap() {
    map = L.map("map", {
      center: mapCenter,
      zoom: initialZoom
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }
});



  
    
  
  


