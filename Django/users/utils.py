from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from django.utils.crypto import constant_time_compare
from django.utils.http import base36_to_int

class TokenGenerator(PasswordResetTokenGenerator):
    def __init__(self, user_field) -> None:
        super().__init__()
        self.user_field = user_field

    def _make_hash_value(self, user, timestamp):
        return (six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user[self.user_field]))

activation_token_generator = TokenGenerator('is_active')
password_reset_token_generator = TokenGenerator('password')
email_changing_token_generator = TokenGenerator('email')