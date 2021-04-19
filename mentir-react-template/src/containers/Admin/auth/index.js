import {AUTH_CHECK, AUTH_LOGIN, AUTH_LOGOUT} from 'admin-on-rest';
import axios from "axios";

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        // const request = new Request('https://mydomain.com/authenticate', {
        //     method: 'POST',
        //     body: JSON.stringify({ username, password }),
        //     headers: new Headers({ 'Content-Type': 'application/json' }),
        // })

        return axios.post('http://localhost:8083/auth/signin', {username, password})
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then((response) => {
                localStorage.setItem('token', response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    return Promise.resolve();
}