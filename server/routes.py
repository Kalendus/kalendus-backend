import json
import os
from flask import Blueprint, render_template, request
from werkzeug import Response

routes = Blueprint("routes", __name__)
filepath: str = "./server/db/database.json"


@routes.route("/", methods=["GET"])
def read():
    calendar_item: object = {}
    if os.path.exists(filepath):
        with open(filepath, "r") as file:
            jsonDataString = file.read()
            if len(jsonDataString) > 0:
                calendar_item = json.loads(jsonDataString)

    return render_template("home.html", item=calendar_item)


@routes.route("/create", methods=["POST"])
def create():
    jsonData: object = request.json
    if (
        "title" in jsonData
        and "description" in jsonData
        and "start" in jsonData
        and "end" in jsonData
    ):
        with open(filepath, "w") as file:
            file.write(json.dumps(jsonData))

        return Response("", status=200)
    else:
        return Response("", status=400)


@routes.route("/update", methods=["PUT"])
def update():
    pass


@routes.route("/delete", methods=["DELETE"])
def delete():
    pass
