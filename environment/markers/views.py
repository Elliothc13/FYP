"""Markers view."""

from django.views.generic.base import TemplateView


class MarkersMapView(TemplateView):
    """Markers map view."""

    template_name = "map.html"

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)