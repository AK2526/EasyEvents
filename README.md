# EasyEvents
EasyEvents is an application that can help you host events and gather a list of people who might be interested in your events. With an account, users can create an event, edit it, generate custom images for it, etc. Click below to go to the demo video for more information: 

[![Click here!](https://img.youtube.com/vi/_U6NdDZmUWA/0.jpg)](https://www.youtube.com/watch?v=_U6NdDZmUWA)

## Building

### Client
Go into the [client folder](client) and use npm install to install all the necessary packages. Run the react app as directed [here](client/README.md).

### Server
Go into the server folder and create a python virtual environment. Use pip to install all the necessary packages in [requirements.txt](server/requirements.txt).
Create API keys for HuggingFace and Google Maps Places. Store the API keys in an file adjacent to [server.py](server/server.py). This project uses Firebase to store information, feel free to create a new Firebase Project and update files as required.
Run [server.py](server/server.py). 

## Tools
- Uses [Pixel-Art-XL by nerijs](https://huggingface.co/nerijs/pixel-art-xl?text=meet+and+greet+meet+people+in+toronto+event+thumbnail+%28no+text%2C+no+people%29)
- Uses [Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- Uses [Firebase](https://firebase.google.com/). Firebase Cloud Storage was used for saving images. Firestore was used to store information about events.


Alan Kulangara
