from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import RegisterSerializer,LoginSerializer,BookSerializer,FavouriteSerializer
from .models import Book,Favourite
from django.contrib.auth import logout
from django.db.models import Q


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        print(request.data)
        serializer = RegisterSerializer(data = request.data['formData'])
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "registered"
            },status=status.HTTP_201_CREATED)
        else:
            return Response({
                "messsage" : "registeration failed"
            },status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):

        print(request.data)
        serializer = LoginSerializer(data=request.data['formData'])
        print(serializer)
        try:
            
            if not serializer.is_valid():
                return Response({
                    "status": "error",
                    "message": serializer.errors,
                }, status=401)
        

            user = serializer.validated_data
            print(user)
            users = user.pop("user") 
            refresh = RefreshToken.for_user(users)
            print(refresh)
            return Response({
                "status": "success",
                "message": "Login successful",
                "user": user,
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)
           
        except Exception as e:
        
            return Response({
                "status": "error",
                "message": "Authentication failed"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class BookView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self,request):
        print(request.data)
        data = request.data.copy()
        data['author_id'] = request.user.id

        serializer = BookSerializer(data = data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": " book created ",
                
            },status=status.HTTP_201_CREATED)
        else:
            return Response({
                "message" : "Error",
                "error" : serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)
        
    def get(self,request):

        data = Book.objects.all()
        print(data)
        serializer = BookSerializer(data,many= True)
        if serializer:
            return Response({
                "message" : "data fetched",
                "data" : serializer.data
            },status=status.HTTP_200_OK)
        else:
            return Response({
                "message" : "error when fetching",
                
            },status=status.HTTP_200_OK)
        
    def post(self,request):
        data = request.data['id']
        obj = Book.objects.get(id = data)
        obj.delete()
        return Response({
            "message" :"deleted"
        })
        
class MyBookview(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request):
        data = Book.objects.filter(author_id = request.user.id)
        print(data)
        serializer = BookSerializer(data,many= True)
        if serializer:
            return Response({
                "message" : "data fetched",
                "data" : serializer.data
            },status=status.HTTP_200_OK)
        else:
            return Response({
                "message" : "error when fetching",
                
            },status=status.HTTP_200_OK)

class FavouriteView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self,request):

        print(request.data)
        data = request.data.copy()
        data['user_id'] = request.user.id
        obj = Favourite.objects.filter(Q(user_id = request.user.id) & Q(book_id = data['book_id'])).exists()
        if obj:
            return Response({
                "message" : "Already exist"
            },status=status.HTTP_400_BAD_REQUEST)
        serializer = FavouriteSerializer(data = data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "favourite added"
            },status=status.HTTP_201_CREATED)
        else:
            return Response({
                "message" : "error",
                "error" : serializer.errors
            },status=status.HTTP_400_BAD_REQUEST)

    def get(self,request):
        data =  Favourite.objects.filter(user_id = request.user.id)
        serializer = FavouriteSerializer(data,many = True)

        if serializer:
            return Response({
                "message" : "Fetched",
                "data" : serializer.data
            },status=status.HTTP_200_OK)
    

    def put(self,request):
        data = request.data
        print(data)
        obj = Favourite.objects.get(id= data['id'])
        obj.delete()
        return Response({
            "messsage" : "data deleted",
            
        },status=status.HTTP_200_OK)
    

class Profile(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request):
        id = request.user.id
        user = User.objects.get(id = id)
        serializer = RegisterSerializer(user)
        if serializer:
            return Response({
                "message" : "fetched user",
                "data": serializer.data
            },status=status.HTTP_200_OK)
        
    def post(self,request):

        data = request.data['user']
        print(data)
        serializer = RegisterSerializer(request.user,data = data,partial = True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response({"message": "Update failed", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            print(f"Received refresh token: {refresh_token}")
            
            if refresh_token:
                try:
                    token = RefreshToken(refresh_token)
                    token.blacklist()
                    logout(request)
                    return Response({
                        "message": "Successfully logged out"
                    }, status=status.HTTP_200_OK)
                except Exception as e:
                    print(f"Error during token processing: {e}")
                    return Response({
                        "message": "Invalid or expired refresh token"
                    }, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                "message": "Refresh token is required"
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Unexpected error: {e}")
            return Response({
                "message": "An error occurred during logout",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)