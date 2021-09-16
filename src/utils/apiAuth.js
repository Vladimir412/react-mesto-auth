
const BaseUrl = 'https://auth.nomoreparties.co'

   export const register = (email, password) => {
        return fetch(`${BaseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({email, password})
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(console.log(res))
        })
    }

    export const login = (email, password) => {
        return fetch(`${BaseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({email, password})
        })
        .then(res => {
            return res.ok ? res.json() : Promise.reject(console.log(res))
        })
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
        .then(res => {
            return res.ok ? res.json() : Promise.reject(console.log(res))
        })
    }