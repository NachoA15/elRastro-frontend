import Axios from 'axios';

import usuarioService  from "./usuarioService.js";
const getPujasByUser = async (correo, setPujas) => {
    await Axios.get("https://el-rastro-a7-backend.vercel.app/api/v2/pujas?usuario=" + correo,{
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    }).then ((res) => {
        setPujas(res.data)
    }).catch((error) => {
        if(error.response.status === 401){
            usuarioService.logOut(true)
        }});
}

const pujasService = {getPujasByUser}

export default pujasService;