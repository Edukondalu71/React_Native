import { BASE_URL } from "./BaseUrl";

async function getLogin(data: object) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        return error?.message;
    }
}

async function regUser(data: object) {
    try {
        const response = await fetch(`${BASE_URL}/adduser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        return error?.message;
    }
}

async function updateUser(data: object) {
    try {
        const response = await fetch(`${BASE_URL}/adduser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        return error?.message;
    }
}

async function deleteUser(data: object) {
    try {
        const response = await fetch(`${BASE_URL}/adduser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        return error?.message;
    }
}

async function getUserdata(data: object) {
    try {
        const response = await fetch(`${BASE_URL}/adduser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        return error?.message;
    }
}

async function getPassword(data: object) {
    try {
        const response = await fetch(`${BASE_URL}/getpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        return error?.message;
    }
}

export { getLogin, regUser, getPassword }