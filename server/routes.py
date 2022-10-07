from datetime import datetime
import json
import os
from flask import Blueprint, render_template, request
from werkzeug import Response

routes = Blueprint("routes", __name__)
filepath: str = "./server/db/database.json"


@routes.route("/", methods=["GET"])
def read():
    calendar_items: list = []
    if os.path.exists(filepath):
        with open(filepath, "r") as file:
            jsonDataString = file.read()
            if len(jsonDataString) > 0:
                calendar_items = json.loads(jsonDataString)

    for item in calendar_items:
        item["start"] = datetime.strptime(
            item["start"].split(".")[0], "%Y-%m-%dT%H:%M:%S"
        ).strftime("%d.%m.%Y")

        item["end"] = datetime.strptime(
            item["end"].split(".")[0], "%Y-%m-%dT%H:%M:%S"
        ).strftime("%d.%m.%Y")

    return render_template("home.html", items=calendar_items)


@routes.route("/create", methods=["POST"])
def create():
    jsonData: object = request.json
    if (
        "title" in jsonData
        and "description" in jsonData
        and "start" in jsonData
        and "end" in jsonData
    ):
        fileData: list = []

        with open(filepath, "r") as file:
            fileContents = file.read()
            if len(fileContents) > 0:
                fileData = json.loads(fileContents)

            fileData.append(jsonData)

        with open(filepath, "w") as file:
            file.write(
                json.dumps(fileData, indent=2)
            )  # indent to make it human readable

        return Response("", status=200)
    else:
        return Response("", status=400)


@routes.route("/update", methods=["PUT"])
def update():
    if request.content_length > 0:
        updatedItem = request.json
        fileData: list = []

        with open(filepath, "r") as file:
            fileContents = file.read()
            if len(fileContents) > 0:
                fileData = json.loads(fileContents)

        for item in fileData:
            if item["title"] == updatedItem["title"]:
                if "description" in updatedItem:
                    item["description"] = updatedItem["description"]
                if "start" in updatedItem:
                    item["start"] = updatedItem["start"]
                if "end" in updatedItem:
                    item["end"] = updatedItem["end"]

                with open(filepath, "w") as file:
                    file.write(json.dumps(fileData, indent=2))

                return Response("", status=200)

        return Response("", status=404)
    else:
        return Response("", status=400)


@routes.route("/delete", methods=["DELETE"])
def delete():
    if request.content_length > 0:
        title: str = request.json
        fileData: list = []

        with open(filepath, "r") as file:
            fileContents = file.read()
            if len(fileContents) > 0:
                fileData = json.loads(fileContents)

        for item in fileData:
            if item["title"] == title:
                fileData.remove(item)

                with open(filepath, "w") as file:
                    file.write(json.dumps(fileData, indent=2))

                return Response("", status=200)

        return Response("", status=404)
    else:
        return Response("", status=400)
