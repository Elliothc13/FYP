const menuItems = document.querySelectorAll('.menu-item');
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customise-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
const root = document.querySelector(':root');
const background1 = document.querySelector('.background-1');
const background2 = document.querySelector('.background-2');
const background3 = document.querySelector('.background-3');
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
imageBounds = [[55.579, -11.25], [51.399, -5.273]];
var imageOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);

var toggleButton = document.getElementById('btn_2');
toggleButton.addEventListener('click', toggleImageOverlay);

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
    buttonInput.addEventListener("click", apply, false);
}
else if (buttonInput.attachEvent) {
    buttonInput.attachEvent('onclick', apply);
}

var valueInt = 0;
function apply(e) {
    if (valueInt > 999) {
        imageUrl = '/static/images/'+ valueInt + '.png'
        imageOverlay.setUrl(imageUrl, true);
        imageOverlay._reset();
    } else if (valueInt > 99) {
        imageUrl = '/static/images/0'+ valueInt + '.png'
        imageOverlay.setUrl(imageUrl, true);
        imageOverlay._reset();
    }else if (valueInt > 9) {
        imageUrl = '/static/images/00'+ valueInt + '.png'
        imageOverlay.setUrl(imageUrl, true);
        imageOverlay._reset();
    }else if (valueInt >= 0){
        imageUrl = '/static/images/000'+ valueInt + '.png'
        imageOverlay.setUrl(imageUrl, true);
        imageOverlay._reset();
    }else {
        imageUrl = '/static/images/0000.png'
        imageOverlay.setUrl(imageUrl, true);
        imageOverlay._reset();
    }
}

var opacityInput = document.getElementById("opacitySlider");
var res =  document.getElementById('currentValue');
var inputBoxInput = document.getElementById('inputBox');
res.innerHTML = rangeInput.value;
rangeInput.addEventListener('change', function(e) {
    res.innerHTML = e.target.value
    valueInt = rangeInput.value
})
inputBoxInput.addEventListener('change', function(e) {
    res.innerHTML = e.target.value
    valueInt = inputBoxInput.value
})


opacityInput.addEventListener('input', function(e) {
    var opacityValue = e.target.value / 100;
    imageOverlay.setOpacity(opacityValue);
})

map.fitWorld().setView([53.391743810981, -7.759557934271902], 10);

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
    darkColorLightness = '17%';
    whiteColorLightness = '100%';
    lightColorLightness = '95%';
    background1.classList.add('active');
    background2.classList.remove('active');
    background3.classList.remove('active');
    changeBackground();
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
