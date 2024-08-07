import {latLngToCell} from 'h3-js'
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
