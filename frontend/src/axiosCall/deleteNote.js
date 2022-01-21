import { useNavigate } from 'react-router-dom';
const axios = require('axios')


async function deleteNote(id, token, onResponse) {
    let options = {
        method: 'delete',
        url: 'http://localhost:3030/api/notes/' + id,
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

export default deleteNote