import { POST_LOGIN } from '../actions';

const DEFAULT_TOKEN = {
    headers: {
        success: true,
        message: "Issued Token!",
        UUID: "e3a438f00bd319079b78d52813ef4833",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVVUlEIjoiZTNhNDM4ZjAwYmQzMTkwNzliNzhkNTI4MTNlZjQ4MzMiLCJpYXQiOjE1NDI2OTg3MzgsImV4cCI6MTU3NDIzNDczOH0.Lpg2lDJLydKUjgT1PgW6CmUYKf4Mv4p0qHZkZrv-DVQ"
    }
}

export default function(state = {}, action) {
    switch(action.type) {
    case POST_LOGIN:
        return {
            headers: action.payload.data
        };
    default:
        return state;
    }
}
