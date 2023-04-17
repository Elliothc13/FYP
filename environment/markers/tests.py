from django.test import Client, TestCase
from django.urls import reverse
import time
import requests
# Create your tests here.

class MarkersMapViewTestCase(TestCase):

    def test_website_loads_successfully(self):
        url = reverse("markers:map/")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "map.html")

    def test_load_time(self):
        url = "http://127.0.0.1:8000/markers/map/"
        start_time = time.time()
        response = requests.get(url)
        end_time = time.time()
        load_time = end_time - start_time
        print(f"Load time: {load_time} seconds")    

    #check everything on page loads
    def test_water_height_slider_exists(self):
        url = "http://127.0.0.1:8000/markers/map/"
        client = Client()
        response = client.get(url)
        self.assertContains(response, '<input class="slider" type="range" min="0" max="1050" value="0" id="slider">')

    def test_number_input_exists(self):
        url = "http://127.0.0.1:8000/markers/map/"
        client = Client()
        response = client.get(url)
        self.assertContains(response, '<input type="number" min="1" max="1050" id="inputBox">')
    
    def test_Current_Value_display_exists(self):
        url = "http://127.0.0.1:8000/markers/map/"
        client = Client()
        response = client.get(url)
        self.assertContains(response, '<div id="currentValue"></div>')
    
    def test_Apply_button_exists(self):
        url = "http://127.0.0.1:8000/markers/map/"
        client = Client()
        response = client.get(url)
        self.assertContains(response, '<button class="btn btn-primary" id="btn">Apply</button>')

    def test_Toggle_Image_Overlay_button_exists(self):
        url = "http://127.0.0.1:8000/markers/map/"
        client = Client()
        response = client.get(url)
        self.assertContains(response, '<button class="btn btn-primary" id="btn_2">Toggle Image Overlay</button>')

    def test_Opacity_Slider_exists(self):
        url = "http://127.0.0.1:8000/markers/map/"
        client = Client()
        response = client.get(url)
        self.assertContains(response, '<input class="slider" type="range" min="20" max="100" value="100" id="opacitySlider">')

    def test_Map_Div_exists(self):
        url = "http://127.0.0.1:8000/markers/map/"
        client = Client()
        response = client.get(url)
        self.assertContains(response, '<div id="map" style="height: 500px;"></div>')