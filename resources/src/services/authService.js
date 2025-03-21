import { jwtDecode } from 'jwt-decode';
import {useRequest} from "@/hooks/useRequest.js";

const { request, isLoading, isError, message } = useRequest();

const register = (login, password) => {
    return request({
        method: 'post',
        url: import.meta.env.VITE_API_URL + `/register`,
        data: {
            login,
            password
        }
    });
};

const login = (login, password) => {
    return request({
        method: 'post',
        url: import.meta.env.VITE_API_URL + `/login`,
        data: {
            login,
            password
        }
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('token');
    location.reload();
};

const getUser = (id) => {
    return request({
        method: 'get',
        url: import.meta.env.VITE_API_URL + `/element`,
        params: {
            table: 'users',
            id
        }
    })
}

const putUser = (data) => {
    return request({
        method: 'put',
        url: import.meta.env.VITE_API_URL + `/element`,
        data: {
            table: 'users',
            data
        }
    })
};

const getTokenData = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
            return decodedToken;
        }
        return null;
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
};

export default {
    register,
    login,
    logout,
    getUser,
    putUser,
    getTokenData
};