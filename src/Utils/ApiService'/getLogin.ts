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

async function isValidUserName(username: string) {
    console.log('u', `${BASE_URL}/checkusernameisvalid?username=${username}`);
    try {
        const response = await fetch(`${BASE_URL}/checkusernameisvalid?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    } catch (error) {
        return error?.message;
    }
}

async function regUser(data: object) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
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

async function getUsers(userId:string) {
    try {
        const response = await fetch(`${BASE_URL}/getusers/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.json();
    } catch (error) {
        return error?.message;
    }
}

async function sendRequest(data: object) {
    try {
        const response = await fetch(`${BASE_URL}/sendrequest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        return error?.message;
    }
}

async function getUsersRequests(userId: string) {
    try {
        const response = await fetch(`${BASE_URL}/getrequests/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    } catch (error) {
        return error?.message;
    }
}

async function AceptRequest(data: object) {
    try {
        const response = await fetch(`${BASE_URL}/acceptrequest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        return error?.message;
    }
}

async function getFriendsList(userId: string) {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    } catch (error) {
        return error?.message;
    }
}


// async function updateUser(data: object) {
//     try {
//         const response = await fetch(`${BASE_URL}/updateuser`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//         });
//         return response;
//     } catch (error) {
//         return error?.message;
//     }
// }

// async function deleteUser(data: object) {
//     try {
//         const response = await fetch(`${BASE_URL}/deleteuser`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//         });
//         return response;
//     } catch (error) {
//         return error?.message;
//     }
// }

// async function getUserdata(user: string) {
//     console.log(`${BASE_URL}/getUserData?username=${user}`)
//     try {
//         const response = await fetch(`${BASE_URL}/getUserData?username=${user}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         return await response.json();
//     } catch (error) {
//         return error?.message;
//     }
// }

// async function getPassword(data: object) {
//     try {
//         const response = await fetch(`${BASE_URL}/getpassword`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//         });
//         return response;
//     } catch (error) {
//         return error?.message;
//     }
// }

// async function getConnection() {
//     try {
//         const response = await fetch(`${BASE_URL}/getData`, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' }
//         });
//         return response;
//     } catch (error) {
//         return error?.message;
//     }
// }

export { getLogin, regUser, isValidUserName, getUsers, sendRequest, getUsersRequests, AceptRequest, getFriendsList }