from flask import Flask, render_template, jsonify, request
from bson.json_util import dumps
from pymongo import MongoClient  # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.Freesian


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/detail')
def detail():
    return render_template('introduce.html')


@app.route("/api/keyword", methods=["GET"])
def web_mars_get():
    order_list = list(db.minipj.find({'name': 'keyword'}, {'_id': False}))
    return jsonify({'orders': order_list})


@app.route('/api/info', methods=['POST'])
def info():
    # 1. 클라이언트로부터 데이터를 받기
    name = request.form['name']  # 클라이언트로부터 url을 받는 부분

    informs = list(db.minipj.find({'name': name}))
    count = 0





    #return jsonify({'result': 'success' , 'informs' : dumps(informs) , 'datas' : dumps(data)})
    return jsonify({'result': 'success', 'informs': dumps(informs)})


@app.route('/api/save', methods=['POST'])
def save():

        name = request.form['name']  # 클라이언트로부터 url을 받는 부분
        text = request.form['text']  # 클라이언트로부터 url을 받는 부분
        writer = request.form['writer']  # 클라이언트로부터 url을 받는 부분
        total = int(request.form['total'])  # 클라이언트로부터 url을 받는 부분

        if total > 0 : #
            total += 1
        else : # 첫 게시글인 경우에 !
            total = 1

        db.minipj.insert_one({'name': name, 'text': text,'number':total ,'writer': writer, 'show': True})

        data = list(db.minipj.find({'name': name}))

        return jsonify({'result': 'success', 'data' : dumps(data)})


@app.route('/api/goalPromise', methods=['POST'])
def goalpromise():
    #team = request.form['team']  # 클라이언트로부터 url을 받는 부분
    data = db.minipj.find_one({'name': 'team'})

    # 데이터 던지기

    return jsonify({'result': 'success' , 'data' : dumps(data)})



@app.route('/api/guestbook', methods=['POST'])
def guest():
    name = request.form['name']  # 클라이언트로부터 url을 받는 부분


    # 데이터 던지기
    data = list(db.minipj.find({'name': name}))


    return jsonify({'result': 'success', 'data' : dumps(data)})

@app.route('/api/scratch', methods=['POST'])
def scratch():
    name = request.form['name']  # 클라이언트로부터 url을 받는 부분
    number = request.form['number']

    # 데이터 던지기
    db.minipj.update_one({'name': name , 'number' : int(number)}, {'$set': {'show': False}})
    return jsonify({'result': 'success'})

@app.route('/api/updating', methods=['POST'])
def updating():
    name = request.form['name']  # 클라이언트로부터 url을 받는 부분
    number = request.form['number']
    text = request.form['text']


    # 데이터 던지기

    db.minipj.update_one({'name': name , 'number' : int(number)}, {'$set': {'text': text}})
    return jsonify({'result': 'success'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=8082, debug=True)
