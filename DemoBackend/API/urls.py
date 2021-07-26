from django.contrib import admin
from django.urls import path
from . import views
 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('config/factory_reset/', views.factoryReset),
    path('reset_errors/', views.resetError),
    path('pause/', views.pause),
    path('run/', views.run),
    path('mode/auto/', views.modeAuto),
    path('mode/timer/', views.modeTimer),
    path('passphrase/', views.passphrase),
    path('wifi/scan/', views.wifiScan),
    path('wifi/connect/', views.wifiConnect),
    path('config/', views.config),
    path('events/', views.getEvents),
    path('data/', views.getData),
]