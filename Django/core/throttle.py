
from rest_framework.throttling import UserRateThrottle

class OnceADayPerURLThrottle(UserRateThrottle):
    scope = 'once_a_day'
  
    def get_cache_key(self, request, view):
        return super().get_cache_key(request, view) + str(request.get_full_path())