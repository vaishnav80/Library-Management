from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Book,Favourite

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'].lower(),
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        user.set_password(validated_data['password']) 
        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username).lower()
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)  

        instance.save()
        return instance

    


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        required=True,
        style={'input_type': 'password'},
        write_only=True
    )

    def validate(self, data):
        username = data.get("username", "").lower()
        password = data.get("password", "")
        print(username,password)
        user = authenticate(username=username, password=password)
        print(user)
        if user is None:
            raise serializers.ValidationError("Invalid username or password")
        print(user)
        
        return {
            "user":user,
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }


class BookSerializer(serializers.ModelSerializer):

    class Meta :
        model = Book
        fields = '__all__'

class FavouriteSerializer(serializers.ModelSerializer):
    book = BookSerializer(source='book_id', read_only=True)  
    
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), write_only=True
    ) 
    

    class Meta:
        model = Favourite
        fields = ['id', 'user_id', 'book', 'book_id']
