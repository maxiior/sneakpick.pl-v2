from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
import re


class MinimumLengthValidator:
    def __init__(self, min_length=8):
        self.min_length = min_length

    def validate(self, password):
        if len(password) < self.min_length:
            raise ValidationError(
                _("This password must contain at least 8 characters."),
                code='password_too_short',
            )


class NumberValidator(object):
    def validate(self, password):
        if not re.findall('\d', password):
            raise ValidationError(
                _("The password must contain at least 1 digit."),
                code='password_no_number',
            )


class UppercaseValidator(object):
    def validate(self, password):
        if not re.findall('[A-Z]', password):
            raise ValidationError(
                _("The password must contain at least 1 uppercase letter."),
                code='password_no_upper',
            )


class LowercaseValidator(object):
    def validate(self, password):
        if not re.findall('[A-Z]', password):
            raise ValidationError(
                _("The password must contain at least 1 lowercase letter."),
                code='password_no_lower',
            )


class SpecialCharactersValidator(object):
    def validate(self, password):
        if not re.findall('[^A-Za-z0-9]', password):
            raise ValidationError(
                _("The password must contain at least 1 special character."),
                code='password_no_special_characters',
            )
