
from django.urls import path

from modules.elm.api import views as v

urlpatterns = [
    path(
        "applications",
        v.LeaveApplicationListCreateView.as_view(),
        name="elm-leave-applications",
    ),
]
