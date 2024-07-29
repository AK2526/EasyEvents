from flask import Flask, send_file
from flask_cors import CORS
import requests
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route('/yes')
def hello_world():
    return {"a": "BYEEE"}


@app.route('/getimg/<imgTit>')
def test(imgTit):
    k = imgTit.split("%20")
    imgTit = " ".join(k)
    API_URL = "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl"
    headers = {"Authorization": "Bearer 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"}

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.content
    image_bytes = query({
        "inputs": "pixel art, simple, flat colors, " + imgTit + "event",
    })
    # You can access the image with PIL.Image for example

    # Save the image to a file
    with open("image.jpg", "wb") as file:
        file.write(image_bytes)

    return send_file("image.jpg", mimetype='image/jpg')

    # Open the image file
    # image = Image.open("image.jpg")

    # # Perform operations on the image
    # # ...

    # # Close the image file
    # image.close()

if __name__ == '__main__':
    app.run(debug=True)