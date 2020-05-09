var myMap = L.map("map", {
  center: [10, -40],
  zoom: 3
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(queryUrl, data => {

    data.features.forEach(obj => {
      var lat = obj.geometry.coordinates[1];
      var lng = obj.geometry.coordinates[0];
      var mag = obj.properties.mag;
      var place = obj.properties.place;

      L.circle([lat,lng], {
        stroke: 'black',
        fillOpacity: 1,
        color: 'red',
        fillColor: 'red',
        radius: mag * 10000
      }).bindPopup(`<h2>${place}<br>Magnitude: ${mag}</h2>`).addTo(myMap)
    });
  });
    // // Set up the legend  
//     var legend = L.control({ position: "bottomright" });
//     legend.onAdd = function() {
//       var div = L.DomUtil.create("div", "info legend");
//       var limits = data.mag.limits;
//       var colors = data.coordinates.colors;
//       var labels = [];

//      // Add min & max
//      var legendInfo = "<h1>Magnitude</h1>" +
//      "<div class=\"labels\">" +
//        "<div class=\"min\">" + limits[0] + "</div>" +
//        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//      "</div>";

//    div.innerHTML = legendInfo;

//    limits.forEach(function(limit, index) {
//      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//    });

//    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//    return div;
//  };

 // Adding legend to the map
//  legend.addTo(myMap);     
// });

