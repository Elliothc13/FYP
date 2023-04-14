"""Markers urls."""

from django.urls import path

from .views import MarkersMapView

from django.conf import settings
from django.conf.urls.static import static

app_name = "markers"

urlpatterns = [
    path("map/", MarkersMapView.as_view(), name="map/"),
]

if settings.DEBUG:
 urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
 urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)