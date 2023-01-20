const copy =
    "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });
const map = L.map("map", { layers: [osm] });

var imageUrl = 'https://github.com/Elliothc13/FYP/blob/main/environment/markers/static/images/0001.png',
    // imageBounds = [[90, 180], [-90, 180]];
    imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
L.imageOverlay(imageUrl, imageBounds).addTo(map);
map.fitWorld().zoomIn();