export const ip = "http://127.0.0.1:3013/api/v1/"


export const post = (object, path) => new Promise((resolve, reject) => {
    fetch(ip + path, {
        method: 'POST',
        headers: {
            // 'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(object), credentials: 'include'
    }).then(res => {
        setTimeout(() => null, 0);
        return res.json()
    }).then(json => {
        if (json.success === false) {
            alert(json.message);
            window.location.replace('/login')
        }
        else {
            resolve(json);
        }
    }).catch((err) => reject(err))

})

export const get = (path, token) => new Promise((resolve, reject) => {
    fetch(ip + path, {
        method: 'GET',
        headers: {
            // 'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        setTimeout(() => null, 0);
        return res.json()
    }).then(json => {
        if (json.success === false) {
            window.location.replace('/login')
        }
        else {
            resolve(json);
        }
    }).catch((err) => reject(err))

})
export const get_other = (path, token) => new Promise((resolve, reject) => {
    fetch(path, {
        method: 'GET',
        mode: 'no-cors'
    }).then(res => {
        setTimeout(() => null, 0);
        return res.blob()
    }).then(blob => {
        console.log(blob)
        resolve(blob);
    }).catch((err) => reject(err))

}) 