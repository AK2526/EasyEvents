from flask import Flask, request
from flask_cors import CORS
import requests
import io
from PIL import Image
from api import googleAPI, hugginfaceAPI
import firebase_admin
from firebase_admin import credentials, firestore, storage

FIREBASE_CONFIG = '{apiKey: "AIzaSyD6PPDvvZyJTghD4qxw81ECji7U9BsOtN0",' +\
'authDomain: "easy-events-alank.firebaseapp.com",' +\
  'projectId: "easy-events-alank",' +\
  'storageBucket: "easy-events-alank.appspot.com",' +\
  'messagingSenderId: "576369314308",' +\
  'appId: "1:576369314308:web:b2f118b406ce7306a44351",' +\
  'measurementId: "G-SDJW9FCGW4"' +\
'}'

API_URL = "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl"
headers = {"Authorization": "Bearer " + hugginfaceAPI}


cred = credentials.Certificate("certificates/serviceAccount.json")
projectapp = firebase_admin.initialize_app(cred)
firestore_client = firebase_admin.firestore.client(app=projectapp)

db = firestore.client()

bucket = firebase_admin.storage.bucket(name="easy-events-alank.appspot.com", app=projectapp)


app = Flask(__name__)
CORS(app)

def getImage(name):
    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.content
    image_bytes = query({
        "inputs": "pixel art, simple, " + name + " event",
    })
    return image_bytes


@app.route('/getimg/<imgTit>')
def test(imgTit):
    k = imgTit.split("%20")
    imgTit = " ".join(k)


    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.content
    image_bytes = query({
        "inputs": "pixel art, simple, " + imgTit + "event",
    })
    # You can access the image with PIL.Image for example

    # Save the image to a file
    with open("image.jpg", "wb") as file:
        file.write(image_bytes)

    return send_file("image.jpg", mimetype='image/jpg')


@app.route('/location/<location>')
def findPlace(location):
    API_URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + location + "&inputtype=textquery&fields=formatted_address,name,place_id&key=" + googleAPI
    response = requests.get(API_URL)
    data = response.json()
    if data['status'] == 'OK':
        return data['candidates'][0]
    else:
        return {}
    
@app.route('/place/<place_id>')
def getPlace(place_id):
    API_URL = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + place_id + "&fields=address_components,formatted_address,place_id,name,geometry&key=" + googleAPI
    response = requests.get(API_URL)
    data = response.json()
    if data['status'] == 'OK':
        return data['result']
    else:
        return {}

@app.route('/genimg', methods=['POST'])
def genimg():
    try:
        data = request.json
        # Get data
        event_id = data['event_id']
        details = data['details']
        user_id = data['user_id']
        
        docref = db.collection('events').document(user_id)
        doc = docref.get().to_dict()

        # Check if event exists and user is authorized
        if doc is None:
            return {"status": "Non existent event"}
        elif doc["user_id"] != user_id:
            return {"status": "Unauthorized"}
        
        # Upload image to firebase
        blobby = bucket.blob("thumbnails/" + event_id + "")
        blobby.upload_from_string(getImage(details), content_type="image/jpg")
        
        return {"status": "Success"}
    except:
        return {"status": "Error"}

if __name__ == '__main__':
    app.run(debug=True)