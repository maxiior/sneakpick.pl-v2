from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six


class ActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.is_active))

class PasswordResetTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.password))

generate_activation_token = ActivationTokenGenerator()
password_reset_token = PasswordResetTokenGenerator()