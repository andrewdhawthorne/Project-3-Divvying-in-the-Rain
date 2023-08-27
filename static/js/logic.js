document.addEventListener("DOMContentLoaded", function() {
  const urls = {
    location1: 'http://127.0.0.1:5000/api/v1.0/start_stations',
    location2: 'http://127.0.0.1:5000/api/v1.0/end_stations',
    location3: 'http://127.0.0.1:5000/api/v1.0/top_routes',
    location4: 'http://127.0.0.1:5000/api/v1.0/stations',
  };

  

  const mapCenter = [41.8781, -87.6298];
  const initialZoom = 13;

  let map;
  let markers = [];

  const locationDropdown = document.getElementById("location-dropdown");

  locationDropdown.addEventListener("change", function() {
    const selectedLocation = locationDropdown.value; // Get the selected location from the dropdown
    const selectedUrl = urls[selectedLocation];
    
    fetchMapData(urls[selectedLocation], selectedLocation); // Pass the selected location to the function

  });

  function fetchMapData(url, selectedLocation) {
    console.log("Fetching data from:", url);
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Fetch successful. Data:", data);
        clearMapMarkers();
        if (selectedLocation === 'location3') {
          processTopRoutesMapData(data);
        } else if (selectedLocation === 'location4') {
          processLocation4Data(data);
        } else {
          processMapData(data);
        }
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

    console.log('check',data)

    data.forEach(entry => {
      const marker = L.marker([entry.latitude, entry.longitude]).addTo(map);
      marker.bindPopup(`<b>${entry._id}</b>`);
      markers.push(marker);
    });
  }

  function processTopRoutesMapData(data) {
    if (!map) {
      initializeMap();
    }
  
    data.forEach(route => {
      const startCoords = [parseFloat(route["start latitude"]), parseFloat(route["start longitude"])];
      const endCoords = [parseFloat(route["end latitude"]), parseFloat(route["end longitude"])];
  
      const startMarker = L.marker(startCoords, { isStartMarker: true, routeData: route }).addTo(map);
      startMarker.on('click', handleMarkerClick);
      markers.push(startMarker);
  
      if (startCoords[0] !== endCoords[0] || startCoords[1] !== endCoords[1]) {
        const endMarker = L.marker(endCoords, { isStartMarker: false, routeData: route }).addTo(map);
        endMarker.on('click', handleMarkerClick);
        markers.push(endMarker);
      }
  
      const routeLine = L.polyline([startCoords, endCoords], { color: 'blue' }).addTo(map);
      markers.push(routeLine);
    });
  }
  
  function handleMarkerClick(event) {
    const marker = event.target;
    const isStartMarker = marker.options.isStartMarker;
    const route = marker.options.routeData;
  
    const stationName = isStartMarker ? route._id["Start Station"] : route._id["End Station"];
    const markerType = isStartMarker ? "Start" : "End";
  
    let popupContent = `<b>${markerType} Station:</b> ${stationName}<br>`;
    if (isStartMarker && route["start latitude"] === route["end latitude"] && route["start longitude"] === route["end longitude"]) {
      popupContent += `<b>Ride Count:</b> ${route.count}`;
    } else {
      popupContent += `<b>Ride Count:</b> ${route.count}<br><b>Other Station:</b> ${route._id[isStartMarker ? "End Station" : "Start Station"]}`;
    }
  
    marker.bindPopup(popupContent);
    marker.openPopup();
  }

  function processLocation4Data(data) {
    if (!map) {
      initializeMap();
    }
  
    data.forEach(entry => {
      const marker = L.marker([entry.start_lat, entry.start_lng]).addTo(map);
      marker.bindPopup(`<b>${entry.start_station_name}</b><br><b>ID:</b> ${entry._id}`);
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



  
    
  
  


