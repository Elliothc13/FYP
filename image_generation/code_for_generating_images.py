import requests
import shutil
import PIL.Image
PIL.Image
from os import listdir
import mercantile
import numpy as np
import requests

z = 10
tl = [55.504, -11.151]
br = [51.317, -5.054]
tl_tiles = mercantile.tile(tl[1],tl[0],z)
br_tiles = mercantile.tile(br[1],br[0],z)
x_tile_range = [tl_tiles.x,br_tiles.x]
y_tile_range = [tl_tiles.y,br_tiles.y]

for i,x in enumerate(range(x_tile_range[0],x_tile_range[1]+1)):
    for j,y in enumerate(range(y_tile_range[0],y_tile_range[1]+1)):
        print(x,y)
        response = requests.get('https://api.mapbox.com/v4/mapbox.terrain-rgb/'+str(z)+'/'+str(x)+'/'+str(y)+'@2x.pngraw?access_token=[access_token]', stream=True)
        if response.status_code == 200:
            with open('./elevation_images/' + str(i) + '.' + str(j) + '.png', 'wb') as f:
                response.raw.decode_content = True
                shutil.copyfileobj(response.raw, f)  

for img_name in ['elevation']:
    image_files = ['./'+img_name+'_images/' + f for f in listdir('./'+img_name+'_images/')]
    images = [PIL.Image.open(x) for x in image_files]
    edge_length_x = x_tile_range[1] - x_tile_range[0]
    edge_length_y = y_tile_range[1] - y_tile_range[0]
    edge_length_x = max(1,edge_length_x)
    edge_length_y = max(1,edge_length_y)
    width, height = images[0].size
    total_width = width*edge_length_x
    total_height = height*edge_length_y
    composite = PIL.Image.new('RGB', (total_width, total_height))
    anim_idx = 0
    y_offset = 0

    for i in range(0,edge_length_x):
        x_offset = 0
        for j in range(0,edge_length_y):
            tmp_img = PIL.Image.open('./'+img_name+'_images/' + str(i) + '.' + str(j) + '.png')
            composite.paste(tmp_img, (y_offset,x_offset))
            x_offset += width
        y_offset += height
    composite.save('./composite_images/'+img_name+'.png')

elevation_raw = PIL.Image.open('./composite_images/elevation.png')
rgb_elevation = elevation_raw.convert('RGBA')
elevation_data = []

h = 6690
w = 1432
elev_row = []
R, G, B, A = rgb_elevation.getpixel((w, h))
print(R, G, B, A)
height = ((R * 256 * 256 + G * 256 + B) * 0.1)
elev_row.append(height)
elevation_data.append(elev_row)

for h in range(rgb_elevation.height):
    elev_row = []
    for w in range(rgb_elevation.width):
        R, G, B, A = rgb_elevation.getpixel((w, h))
        height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1)
        elev_row.append(height)
    elevation_data.append(elev_row)


for i, level in enumerate(np.arange(0,100,1)):
    print(i,level)
    im = PIL.Image.open('./composite_images/irelandWide.png').convert('RGBA')
    overlay = PIL.Image.new('RGBA', im.size,(4,22,37,255))
    ni = np.array(overlay)
    e=np.array([np.array(xi) for xi in elevation_data])
    depth = level - e
    print(depth.min(),depth.max())
    alpha_mask = np.copy(depth)
    alpha_mask = alpha_mask*255/alpha_mask.max()
    alpha_mask = np.where(alpha_mask<0, 0, alpha_mask)
    alpha_mask = alpha_mask**.02
    alpha_mask = alpha_mask*255/alpha_mask.max()
    print(alpha_mask.min(),alpha_mask.max(),alpha_mask.mean())
    ni[...,3] = alpha_mask[...]
    W = PIL.Image.fromarray(ni)
    im.paste(W , (0,0),W)
    im.save('./depth/'+ str(i).zfill(4) +'.png')