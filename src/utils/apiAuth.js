
const BaseUrl = 'https://auth.nomoreparties.co'

   export const register = (email, password) => {
        return fetch(`${BaseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({email, password})
        })
        .then(checkResponse)
    }

    export const login = (email, password) => {
        return fetch(`${BaseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({email, password})
        })
        .then(checkResponse)
        .then(data => {
            return data
        })
    }

    export const getDataUser = (token) => {
        return fetch(`${BaseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(checkResponse)
    }

    const checkResponse = (res) => {
        return res.ok? res.json() : Promise.reject(console.log(res))
    }