import axios from 'axios';

export const FETCH_USER = 'fetch_user';
const ROOT_URL = 'http://ec2-18-220-74-127.us-east-2.compute.amazonaws.com:3000';

export function fetchUser(id) {
    const request = axios.get(`${ROOT_URL}/user/${id}`);
    
    return {
        type: FETCH_USER,
        payload: request
    };
}
