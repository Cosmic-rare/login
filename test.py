from flask import Flask, render_template, make_response, request, redirect
import os
import json
import datetime

app = Flask(__name__)

# 許可する番号
sekai = ["1214", "1209"]


@app.route("/")
def index():
    cookie = request.cookies.get("a")
    
    # cookieが空ならリダイレクト
    if not cookie:
        return redirect("/login")
    
    # そうでなければ読み込む
    else:
        if cookie is not None:
            cookie = json.loads(cookie)
        return render_template("index.html", a=cookie)

    
@app.route("/login")
def login():
    cookie = request.cookies.get("a")
    
    if not cookie:
        # ログインページの表示
        return render_template("login.html")
    
    # ログイン済みの時にはトップページに行く
    else:
        return redirect("/")

    
@app.route("/save", methods=["POST"])
def save():
    # 保存期間(一週間)
    max_age = 60 * 60 * 24 * 7
    
    expires = int(datetime.datetime.now().timestamp()) + max_age
    a = request.form["a"]
    
    # ログインの番号が許可されている場合
    if a in sekai:
        b = {"id" : a}
        
        # htmlを元にレスポンスを作成=>cookieをセット
        response = make_response(render_template("loginseikou.html"))
        response.set_cookie("a", value=json.dumps(b), expires=expires)
        return response
    
    # 認証されていないならログインページへ
    else:
        return redirect("/login")

    
if __name__ == "__main__":
    # サーバーを起動
    app.run()
