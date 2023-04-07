#!/usr/bin/python3
"""
Blueprint for API
"""


from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from app.api.v1.views.schools import *
from app.api.v1.views.users import *
from app.api.v1.views.index import *
from app.api.v1.views.certificates import *
from app.api.v1.views.certificate_contract import *
from app.api.v1.views.login import *
from app.api.v1.views.certificate_pdf_Parsing import *
from app.api.v1.views.certificate_verification_request import *
from app.api.v1.views.admin_routes import *
