# FYP
Link to Github Repo: https://github.com/Elliothc13/FYP

To run this project you will have to:
- Make sure that python 3.11 is installed
  - can be downloaded either manually or from the microsoft store if you are running windows
- Make sure that pip is installed 
  - Make sure pip is up to date
- Run the command `pip install django`
- Change your directory to the same as `requirements.txt` which is in `FYP`
- Run the command `pip install -r requirements.txt`
- change to the directory `environment`
- Run the command `python manage.py migrate`
- Run the command `python manage.py runserver` or `py manage.py runserver`
- The website will then be running at `http://127.0.0.1:8000/`. Open this and you will be automatically redirected to the website.

To run the tests you will have to:
- Make sure you have the website running
- Run the command `python manage.py test` or `py manage.py test`
- It should output `Ran 9 tests in [number]s OK`

The code that was used for generating the overlays was also added to the `image_generation` folder but it is not required to run the program
- the steps are simply:
  - Request terrain-rgb images from mapbox for the area of ireland (images were removed to save space)
  - Compile the images into 1 composite image
  - I manually created a transparent image with the same dimensions as the original by importing it into Gimp, adding an alpha channel and deleting the original image.
  - The code then uses the terrain-rgb image (different colours represent different elevations) to print over the transparent image with the water overlay.
