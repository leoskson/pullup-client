import axios from 'axios';

export const FETCH_USER = 'fetchUser';
export const FETCH_PARKINGLOTS = 'getParkinglots';
export const FETCH_LOCATION = 'fetchLocation';
export const POST_USER = 'postUser';

const ROOT_URL = 'http://ec2-18-220-74-127.us-east-2.compute.amazonaws.com:3000';

export function fetchUser(id) {
    const request = axios.get(`${ROOT_URL}/user/${id}`);
    
    return {
        type: FETCH_USER,
        payload: request
    };
}

export function postUser(values, callback) {
    const request = axios.post(`${ROOT_URL}/user/`, values)
        .then(() => callback());

    return {
        type: POST_USER,
        payload: request
    };
}

export function fetchParkinglots(lat, lng) {
    const request = axios.get(`${ROOT_URL}/parking?zip=30309&latitude=${lat}&longitude=${lng}`);
    
    return {
        type: FETCH_PARKINGLOTS,
        payload: request
    };
}

function showPosition(position) {
    return position;
}

function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                showPosition(pos);
                resolve(pos);
            });
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    })
}

export function fetchLocation() {
    return {
        type: FETCH_LOCATION,
        payload: getLocation()
    };
}
