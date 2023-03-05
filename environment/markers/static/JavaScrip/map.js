const copy =
    "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });
const map = L.map("map", { 
    layers: [osm],
    maxBounds: [[55.579, -11.25],[51.399, -5.273]],
    minZoom: 9
});

var imageUrl = '/static/images/0001.png',
// imageBounds = [[55.4124, -10.5168], [51.2960, -5.3830]];
// imageBounds = [[55.578, -10.547], [51.4, -5.625]];
imageBounds = [[55.579, -11.25], [51.399, -5.273]];
var imageOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);

var button = L.control({ position: 'topright' });
button.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'button');
    div.innerHTML = '<button onclick="toggleImageOverlay()">Toggle Image Overlay</button>';
    return div;
}
button.addTo(map);

function toggleImageOverlay() {
    if (map.hasLayer(imageOverlay)) {
        map.removeLayer(imageOverlay);
    } else {
        map.addLayer(imageOverlay);
    }
}

var rangeInput = document.getElementById("slider");
var buttonInput = document.getElementById("btn");

if (buttonInput.addEventListener) {
    buttonInput.addEventListener("click", testtest, false);
}
else if (buttonInput.attachEvent) {
    buttonInput.attachEvent('onclick', testtest);
}

function testtest(e) {
    var value = rangeInput.value;
    console.log(imageUrl);
    if (value > 99) {
        imageUrl = '/static/images/0'+ value + '.png'
        map.removeLayer(imageOverlay);
        imageOverlay = L.imageOverlay(imageUrl, imageBounds);
        map.addLayer(imageOverlay);
    } else if (value > 9) {
        imageUrl = '/static/images/00'+ value + '.png'
        map.removeLayer(imageOverlay);
        imageOverlay = L.imageOverlay(imageUrl, imageBounds);
        map.addLayer(imageOverlay);
    }else {
        map.removeLayer(imageOverlay);
        imageUrl = '/static/images/000'+ value + '.png'
        imageOverlay = L.imageOverlay(imageUrl, imageBounds);
        map.addLayer(imageOverlay);
    }
}

map.fitWorld().setView([53.391743810981, -7.759557934271902], 10);





//-------------------------------------------


const menuItems = document.querySelectorAll('.menu-item');
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customise-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
const root = document.querySelector(':root');
const background1 = document.querySelector('.background-1');
const background2 = document.querySelector('.background-2');
const background3 = document.querySelector('.background-3');

//changes what displays as "active"
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

const closeThemeModal = (e) => {
    if(e.target.classList.contains('customise-theme')){
        themeModal.style.display = 'none';
    }
}

themeModal.addEventListener('click', closeThemeModal);

//allows the user to click outside the modal to close it
theme.addEventListener('click', openThemeModal);

const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}

fontSizes.forEach(size => {
    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');
        if(size.classList.contains('font-size-1')){
            fontSize = '13px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '5.4rem');
        }else if(size.classList.contains('font-size-2')){
            fontSize = '16px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '-7rem');
        }else if(size.classList.contains('font-size-3')){
            fontSize = '19px';
            root.style.setProperty('----sticky-top-left', '-2rem');
            root.style.setProperty('----sticky-top-right', '-17rem');
        }
        document.querySelector('html').style.fontSize = fontSize;
    })
})

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

const changeBackground = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

//light background
background1.addEventListener('click', () => {
    background1.classList.add('active');
    background2.classList.remove('active');
    background3.classList.remove('active');
    window.location.reload();
})

//dim background
background2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';
    background2.classList.add('active');
    background1.classList.remove('active');
    background3.classList.remove('active');
    changeBackground();
})

//dark background
background3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';
    background3.classList.add('active');
    background1.classList.remove('active');
    background2.classList.remove('active');
    changeBackground();
})