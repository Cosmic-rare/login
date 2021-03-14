from flask import Flask, render_template, make_response, request, redirect
import os
import json
import datetime

app = Flask(__name__)

sekai = ["1214", "1209"]

@app.route("/")
def index():
    cookie = request.cookies.get("a")
    if not cookie:
        return redirect("/login")
    else:
        if cookie is not None:
            cookie = json.loads(cookie)
        return render_template("index.html", a=cookie)

@app.route("/login")
def login():
    cookie = request.cookies.get("a")
    if not cookie:
        return render_template("login.html")
    else:
        return redirect("/")

@app.route("/save", methods=["POST"])
def save():
    max_age = 60 * 60 * 24 * 7
    expires = int(datetime.datetime.now().timestamp()) + max_age
    a = request.form["a"]
    if a in sekai:
        b = {"id" : a}
        response = make_response(render_template("loginseikou.html"))
        response.set_cookie("a", value=json.dumps(b), expires=expires)
        return response
    else:
        return redirect("/login")

if __name__ == "__main__":
    app.run()