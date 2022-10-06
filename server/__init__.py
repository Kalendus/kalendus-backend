from flask import Flask
from flask_cors import CORS


def createApp() -> Flask:
    app = Flask(__name__)
    CORS(app=app)
    app.config["FLASK_SECRET"] = "SOME RANDOM STRING"

    from .routes import routes

    app.register_blueprint(routes, url_prefix="/")

    return app
