from django.http import HttpResponse
from rest_framework_simplejwt.backends import TokenBackend


def get_user_id_from_jwt_token(request):
    token = request.COOKIES.get('access_token')
    valid_data = TokenBackend(algorithm='HS256').decode(token,verify=False)
    user_id = valid_data.get('user_id')
    return user_id
    
class AuthorizationMiddleware:
    def __init__(self, get_response=None):
        self.get_response = get_response

    def process_view(self, request, view_func, view_args, view_kwargs):
        view_name = '.'.join((view_func.__module__, view_func.__name__))
    
    def __call__(self, request):
        token = request.COOKIES.get('access_token')
        if token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'
        return self.get_response(request)
    
    
class ReplaceUserMeWithUserIdMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path == '/api/users/me' or request.path.startswith('/api/users/me/'):
            if 'access_token' in request.COOKIES:
                user_id = get_user_id_from_jwt_token(request)
                request.path = request.path.replace('/api/users/me',  f'/api/users/{user_id}')
                request.path_info = request.path_info.replace('/api/users/me',  f'/api/users/{user_id}')
            else:
                response = '{"detail": "Authentication credentials were not provided."}'
                return HttpResponse(status=401, content_type='application/json', content=response)

        response = self.get_response(request)

        return response
    
