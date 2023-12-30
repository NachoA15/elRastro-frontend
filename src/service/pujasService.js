import Axios from 'axios';

const getPujasByUser = async (correo, setPujas) => {
    await Axios.get("http://127.0.0.1:5002/api/v2/pujas?usuario=" + correo)
    .then ((res) => {
        setPujas(res.data)
    })
}

const pujasService = {getPujasByUser}

export default pujasService;