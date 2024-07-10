    // URL of the JSON data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
// Use d3.json() to fetch the JSON data
d3.json(url).then(function(data) {
  // Once the data is loaded, you can work with it here
  console.log(data); // Log the data to the console to see its structure
}).catch(function(error) {
  // Handle any errors that may occur during the fetch
  console.log('Error fetching the data:', error);
});



// Initialize the Leaflet map
    const map = L.map('map').setView([0, 0], 2); // Center the map at [0, 0] with zoom level 2

// Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Loop through the earthquake data and create markers on the map
    data.features.forEach(function(feature) {
        const coordinates = feature.geometry.coordinates;
        const magnitude = feature.properties.mag;
        const depth = coordinates[2];

// Calculate marker size based on earthquake magnitude
        const markerSize = magnitude * 5; 

// Calculate marker color based on earthquake depth
        const markerColor = `hsl(0, 100%, ${100 - depth * 2}%)`; 

// Create a marker with size and color based on earthquake data
        L.circleMarker([coordinates[1], coordinates[0]], {
            radius: markerSize,
            color: 'black',
            fillColor: markerColor,
            fillOpacity: 0.7
        }).addTo(map).bindPopup(`Magnitude: ${magnitude}<br>Depth: ${depth}`);
    });

//}).catch(function(error) {
    console.log('Error fetching the data:', error);
//});



