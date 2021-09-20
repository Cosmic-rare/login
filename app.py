from flask import Flask, render_template, make_response, request
import requests
import codecs
import json
from dotenv import load_dotenv
import os
from pymongo import MongoClient
import datetime

client = MongoClient("mongodb://localhost:27017")
app = Flask(__name__)
load_dotenv()

db = client.login
collection = db.hash

def get_user(user_id):
    # apiをたたく関数
    headers = {
        "Authorization": "Bot {}".format(os.getenv('TOKEN'))
    }

    r = requests.get('https://discord.com/api/v9/users/{}'.format(user_id), headers=headers)
    return json.loads(r.text)

@app.route('/<id>/<token>')
def index(id, token):
    # 既に使われているか
    if collection.find_one(filter={'token': token})["used"]:
        return 'そのログインコードはすぐに使われています'
    
    # trueにして使われてることにする
    collection.update_one({'token': token}, {'$set':{'used': True}})

    # usernameを取得する
    text = codecs.decode(get_user(id)['username'].encode())

    # TOKENをcookieに保存する(30分でクリア)
    expires = int(datetime.datetime.now().timestamp()) + 60 * 30
    response = make_response(text)    
    response.set_cookie("TOKEN", value='{"token":"'+token+'"}', expires=expires)
    return response

@app.route('/all')
def all():
    cookie = request.cookies.get("TOKEN")
    if cookie is None:
        return "ログインしていません"
    userName = get_user(collection.find_one(filter={"token": json.loads(cookie)["token"]})["user_id"])["username"]
    return userName

if  __name__ == '__main__':
    app.run(debug=True)
