const Base_URL = `http://localhost:8001/userapi`
export const endpoints = {
    GET_RANDOMUSER_URL : `https://randomuser.me/api/`,
    ADDUSER_URL : `${Base_URL}/addUser`,
    GETALLUSERS_URL : `${Base_URL}/getAllUsers`,
    DELETE_URL : `${Base_URL}/deleteUser/`,
    DELETEALLUSERS_URL : `${Base_URL}/deleteAllUser`,
}

export const header = {
    headers: {
        'Content-Type': 'application/json',
    },
}