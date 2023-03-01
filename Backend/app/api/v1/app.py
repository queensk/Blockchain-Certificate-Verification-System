#!/usr/bin/python3
"""
Flask Application
"""
from app.models import storage
from app.api.v1.views import app_views
from os import environ
from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


if __name__ == "__main__":
    """ Main Function """
    host = environ.get('BVC_API_HOST')
    port = environ.get('BVC_API_PORT')
    debug = environ.get("BCV_DEV")
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    if debug:
        debug = True
    else:
        debug = False
    app.run(host=host, port=port, debug=debug, threaded=True)
