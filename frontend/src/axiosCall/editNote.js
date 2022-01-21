import { useNavigate } from 'react-router-dom';
const axios = require('axios')


async function editNote(note, token, onResponse) {
    let options = {
        method: 'put',
        url: 'http://localhost:3030/api/notes/' + note.id,
        data: {
            title: note.title,
            body: note.body,
            color: note.color,
        },
        headers: {
            authorization: "Bearer " + token,
        },
    }
    axios(options)
        .then((res) => {
            onResponse(res.data.notes)
        }, (err) => {
            console.log(err)
            if (err.response.status == 409) {
                const navigate = useNavigate()
                navigate("/error")
            }
        })
}

export default editNote