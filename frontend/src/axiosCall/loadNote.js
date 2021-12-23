const axios = require('axios')


async function loadNote(id, token, onResponse) {
    let options = {
        method: 'get',
        url: 'http://localhost:3030/api/notes/' + id,
        headers: {
            authorization: "Bearer " + token,
        },
    }
    axios(options)
        .then((res) => {
            onResponse(res.data.result.note)
        }, (err) => {
            console.log(err)
        })
}

export default loadNote