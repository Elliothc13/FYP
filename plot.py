import shapefile as shp  # Requires the pyshp package
import matplotlib.pyplot as plt
import plotly.graph_objects as go

sf = shp.Reader("Ireland_50.shp")

plt.figure()
for shape in sf.shapeRecords():
    x = [i[0] for i in shape.shape.points[:]]
    y = [i[1] for i in shape.shape.points[:]]

    plt.plot(x,y)
# ax = plt.axes()
# ax.set(facecolor = "orange")
fig = plt.gcf()
fig.set_size_inches(8, 10)

plt.show()