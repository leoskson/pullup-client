import axios from 'axios';

export const FETCH_USER = 'fetchUser';
export const FETCH_PARKINGLOTS = 'fetchParkinglots';
export const FETCH_LOCATION = 'fetchLocation';
export const FETCH_SPOTS = 'fetchSpots';
export const FETCH_RESERVATIONS = 'fetchReservations';
export const POST_USER = 'postUser';
export const POST_LOGIN = 'postLogin';
export const SELECT_PARKINGLOT = 'selectParkinglot';
export const POST_RESERVATIONS = 'postReseravations';
export const DELETE_RESERVATION = 'deleteReservation';
export const SELECT_SPOT = 'selectSpot';

// const ROOT_URL = 'http://ec2-18-220-74-127.us-east-2.compute.amazonaws.com:3000';
const ROOT_URL = 'http://localhost:3000';

export function postReservations(data, config) {
    const request = axios.post(`${ROOT_URL}/reservation`, data, config);
     return {
        type: POST_RESERVATIONS,
        payload: request
    };
}

export function selectSpot(id) {
    return {
        type: SELECT_SPOT,
        payload: id
    }
}

export function fetchReservations(id, date, config) {
    const request = axios.get(`${ROOT_URL}/reservation/timeslots?SUUID=${id}&date=${date}`, config);

    return {
        type: FETCH_RESERVATIONS,
        payload: request
    };
}

export function fetchUser(config) {
    const request = axios.get(`${ROOT_URL}/user/${config.headers.UUID}`, config);
    
    return {
        type: FETCH_USER,
        payload: request
    };
}

export function selectParkinglot(id) {
    return {
        type: SELECT_PARKINGLOT,
        payload: id
    };
}

export function fetchParkinglots(lat, lng, config) {
    const request = axios.get(`${ROOT_URL}/parking?latitude=${lat}&longitude=${lng}`, config);
    
    return {
        type: FETCH_PARKINGLOTS,
        payload: request
    };
}

export function fetchSpots(spots, config) {
    const request = axios.post(`${ROOT_URL}/spot`, { spots }, config);

    return {
        type: FETCH_SPOTS,
        payload: request
    }
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

export function postLogin(values) {
    const request = axios.post(`${ROOT_URL}/auth`, values);
    return {
        type: POST_LOGIN,
        payload: request
    }
}

export function postUser(values) {
    const request = axios.post(`${ROOT_URL}/auth/registration`, values);
    return {
        type: POST_USER,
        payload: request
    }
}

export function deleteReservation(RUUID, config) {
    const request = axios.delete(`${ROOT_URL}/reservation/${RUUID}`, config);
    return {
        type: DELETE_RESERVATION,
        payload: request
    }
}