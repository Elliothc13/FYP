const copy =
    "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });
const map = L.map("map", { layers: [osm] });

var imageUrl = 'https://github.com/Elliothc13/FYP/blob/365eda3979cab87b58338d44786f7fddd4e38410/environment/markers/static/images/0001.png',
imageBounds = [[52.23912116814022, -7.4398545653698624], [46.05021959320936, 5.781529814782193]];
// imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
var imageOverlay = L.imageOverlay(imageUrl, imageBounds, {
    opacity: 1,
    zIndex: -1,
    interactive: true
}).bindPopup("This is a yellow box").addTo(map);
map.fitWorld().zoomIn();