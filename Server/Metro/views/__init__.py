from .login import bp as login_bp
from .user_registration import bp as user_registration_bp
from .stations import bp as stations_bp
from .loginManager import login_manager
from .saccoRegistration import bp as sacco_registration_bp
from .busRegistration import bp as bus_registration_bp
from .addRoutes import bp as add_routes_bp
from .stations import add_stations_bp
from .addRoutes import get_routes_bp
from .stations import reg_stations_bp
from .busRoute import bp as bus_route_bp
from .findBus import bp as find_bus_bp
from .bookings import bp as bookings_bp
from .decorators import role_required as role
