const axios = require('axios')


async function createNote(note, token, onResponse) {
    let options = {
        method: 'post',
        url: 'http://localhost:3030/api/notes/new',
        data: {
            ...note
        },
        headers: {
            authorization: "Bearer " + token,
        },
    }
    axios(options)
        .then((res) => {
            onResponse(res.data.result)
        }, (err) => {
            console.log(err)
        })
}

export default createNote