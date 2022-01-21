import { useNavigate } from 'react-router-dom';
const axios = require('axios')


async function createNote(note, token, onResponse) {
    console.log(token)
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
            if (err.response.status == 409) {
                const navigate = useNavigate()
                navigate("/error")
            }
        })
}

export default createNote