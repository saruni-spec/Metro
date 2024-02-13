# decorators.py

from functools import wraps
from flask import request, redirect, url_for


def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not request.user.role == role:
                return redirect(url_for("login"))
            return f(*args, **kwargs)

        return decorated_function

    return decorator
