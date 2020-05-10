var myMap = L.map("map", {
  center: [10, -40],
  zoom: 3,
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY,
  }
).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(queryUrl, (data) => {
  data.features.forEach((obj) => {
    var lat = obj.geometry.coordinates[1];
    var lng = obj.geometry.coordinates[0];
    var mag = obj.properties.mag;
    var place = obj.properties.place;

    L.circle([lat, lng], {
      stroke: "black",
      fillOpacity: 1,
      color: "red",
      fillColor: "red",
      radius: mag * 10000,
    })
      .bindPopup(`<h2>${place}<br>Magnitude: ${mag}</h2>`)
      .addTo(myMap);
  });
  
});


// Adds Legend
var legend = L.control({position: "bottomright"});

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend");
    grades = [0, 1, 2, 3, 4, 5];
    labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
    var color = ["#00ccbc","#90eb9d","#f9d057","#f29e2e","#e76818","#d7191c"];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      chooseColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }

  return div;
};
legend.addTo(map);

