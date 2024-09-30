from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User objects"""
    password = serializers.CharField(write_only=True, required=True, min_length=8, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = [
            'id', 'email', 'phone_number', 'first_name', 'last_name', 
            'profile_pic', 'street_address', 'city', 'state', 
            'postal_code', 'country', 'password', 'is_active'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Serializer for JWT authentication."""
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['user_name'] = user.first_name + " " + user.last_name
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_id'] = self.user.id 
        data['user_name'] = self.user.first_name + " " + self.user.last_name
        return data    
