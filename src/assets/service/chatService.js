import Axios from "axios";

const getChats = (setChats) => {
    Axios.get("http://127.0.0.1:5001/chat")
    .then((res) => {
        setChats(res.data)
    })
}

const chatService = {getChats}

export default chatService;