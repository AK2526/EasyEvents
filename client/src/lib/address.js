import {gridDisk, latLngToCell} from 'h3-js'

let hex = null;

export const getShortAddress = (addressComponents) => {
    let city = "", state = "", country = "";
    addressComponents.forEach((component) => {
        if (component.types.includes("locality")) {
            city = component.long_name + ", ";
        }
        if (component.types.includes("administrative_area_level_1")) {
            state = component.short_name + ", ";
        }
        if (component.types.includes("country")) {
            country = component.long_name;
        }
    });

    return city + state + country;
}

export const getAddressJson = async (placeId) => {
    if (placeId == undefined)
    {
        return {}
    }
    const response = await fetch('/place/' + placeId);
    const data = await response.json();
    let shortadd = getShortAddress(data.address_components);
    
    return {
        location_name: data.name,
        formatted_address: data.formatted_address,
        short_address: shortadd,
        coords: {
            latitude: data.geometry.location.lat,
            longitude: data.geometry.location.lng
        },
        place_id: data.place_id,
        hexhash: latLngToCell(data.geometry.location.lat, data.geometry.location.lng, 4)
    };

}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
        break;
    }
  }
  

export async function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    if (hex == null)
    {
    hex = latLngToCell(position.coords.latitude, position.coords.longitude, 4);
    console.log("SUCCESSFULLY LOCATED")
    }
  }

 export function getNearby(k) {
    getLocation();
    console.log("SERACHING", k, hex)
    if (hex == null)
    {
        return []
    }
    return gridDisk(hex, k);
  }