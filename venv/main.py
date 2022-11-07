from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

client = MongoClient('mongodb://test:test@15.164.217.23', 27017)
db = client.dbsparta
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/api/list', methods=['GET'])
def getData():
    result = list(db.mystar.find({}, {'_id': False}).sort('like', -1))
    # 2. articles라는 키 값으로 article 정보 보내주기
    return jsonify({'result': 'success', 'stars': result})


@app.route('/api/like', methods=['POST'])
def like():
    name = request.form['name']
    star = db.mystar.find_one({'name': name})
    like = star['like'] + 1

    db.mystar.update_one({'name': name}, {'$set': {'like': like}})
    return jsonify({'result': 'success'})

    å


@app.route('/api/scratch', methods=['POST'])
def scratch():
    db.mystar.delete_one({'name': request.form['name']})
    return jsonify({'result': 'success'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=8080, debug=True)