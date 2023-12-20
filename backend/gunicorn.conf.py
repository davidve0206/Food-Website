"""Gunicorn *production* config file"""

import multiprocessing

# Django WSGI application path in pattern MODULE_NAME:VARIABLE_NAME
wsgi_app = "foodproject.wsgi:application"
# The number of worker processes for handling requests
workers = multiprocessing.cpu_count() * 2 + 1
# The socket to bind
bind = "0.0.0.0:5000"
# Following code is commented out as I do not plan to keep logs for errors
""" # Restart workers when code changes (development only!)
reload = True
# The granularity of Error log outputs
loglevel = "debug"
# Write access and error info to /var/log
accesslog = errorlog = "/var/log/gunicorn/dev.log"
# Redirect stdout/stderr to log file
capture_output = True
# PID file so you can easily fetch process ID
pidfile = "/var/run/gunicorn/dev.pid"
# Daemonize the Gunicorn process (detach & enter background)
daemon = True """