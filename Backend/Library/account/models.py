from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Book(models.Model):

    title = models.CharField(max_length=20)
    author = models.CharField(max_length=25)
    genre = models.CharField(max_length=20)
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(null=True,blank=True)
    author_id = models.ForeignKey(User,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='cover_photo',blank=True,null=True)

    def __str__(self):
        return f"{self.title}"
    

class Favourite(models.Model):

    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    book_id = models.ForeignKey(Book,on_delete = models.CASCADE)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user_id.username}"