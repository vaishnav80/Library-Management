
from django.urls import path
from .views import RegisterView,LoginView,BookView,FavouriteView,Profile,LogoutView,MyBookview

urlpatterns = [
    path('register/',RegisterView.as_view(),name="register"),
    path('login/',LoginView.as_view(),name='login'),
    path('book/',BookView.as_view(),name= "book"),
    path('favourite/',FavouriteView.as_view(),name="favourite"),
    path('profile/',Profile.as_view(),name='profile'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('mybook/',MyBookview.as_view(),name="mybook")
]