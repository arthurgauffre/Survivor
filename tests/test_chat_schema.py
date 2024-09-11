import pytest

from

def test_valid():
    # Valid password with all requirements met
    password = SecretStr("SecurePassword!2023")
    assert ChangePasswordSchema.validate_password(password) == password