const axios = require('axios')


async function loadNoteList(token, onResponse) {
    let options = {
        method: 'get',
        url: 'http://localhost:3030/api/notes/',
        headers: {
            authorization: "Bearer " + token,
        },
    }
    axios(options)
        .then((res) => {
            onResponse(res.data.notes)
        }, (err) => {
            console.log(err)
        })
}

export default loadNoteList