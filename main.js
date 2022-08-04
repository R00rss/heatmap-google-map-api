let map, marker, heatmap, geocoder, serachMarket;
function initMap() {
  const coord = { lat: -0.1929404, lng: -78.5015253 };
  const points = [
    new google.maps.LatLng(-0.1950923, -78.5021234),
    new google.maps.LatLng(-0.1951923, -78.5022345),
    new google.maps.LatLng(-0.1954923, -78.5023459),
    new google.maps.LatLng(-0.1958923, -78.5024564),
    //second
    new google.maps.LatLng(-0.1940923, -78.5021234),
    new google.maps.LatLng(-0.1941923, -78.5022345),
    new google.maps.LatLng(-0.1944923, -78.5023459),
    new google.maps.LatLng(-0.1948923, -78.5024564),
    //third
    new google.maps.LatLng(-0.1930923, -78.5015253),
    new google.maps.LatLng(-0.1931923, -78.5015253),
    new google.maps.LatLng(-0.1934923, -78.5015253),
    new google.maps.LatLng(-0.1938923, -78.5015253),
  ];
  map = new google.maps.Map(document.getElementById("map"), {
    center: coord,
    zoom: 17,
  });
  /* marker = new google.maps.Marker({
    position: coord,
    map: map,
  }); */
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: points,
    map: map,
  });
}

document
  .getElementById("toggle-heatmap")
  .addEventListener("click", toggleHeatmap);
document
  .getElementById("change-gradient")
  .addEventListener("click", changeGradient);
document
  .getElementById("change-opacity")
  .addEventListener("click", changeOpacity);
document
  .getElementById("change-radius")
  .addEventListener("click", changeRadius);
document.getElementById("search").addEventListener("click", codeAddress);

function codeAddress() {
  var address = document.getElementById("address").value;
  console.log(address);
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      console.log(JSON.stringify(results[0].geometry.location))
      //centra el mapa segun el resultado
      map.setCenter(results[0].geometry.location);
      //crea un marcado en el mapa
      serachMarket = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];

  heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
  heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
  heatmap.set("opacity", heatmap.get("opacity") ? null : 0.4);
}

window.initMap = initMap;
