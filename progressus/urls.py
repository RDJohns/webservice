from django.urls import path

from . import views
app_name = 'progressus'
urlpatterns = [
    # ex: /progressus/
    path('', views.index, name='index'),
    path('liste', views.getPers, name='liste1'),
    path('listeGroupe', views.getPersGroup, name='liste2'),
    path('recherche', views.recherche, name='recherche'),
]