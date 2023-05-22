import axios from "axios";

const {data} = await axios.post('https://localhost:3001/codeChallengeCategory', {
        name: 'data.name',
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
