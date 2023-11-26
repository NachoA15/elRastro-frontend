const openChat = (idProducto, idVendedor, idComprador) => {
    let conversationId = idProducto + "_" + idVendedor + "_" + idComprador;
    window.location.href = "/chat/" + conversationId;
}

const chatService = {openChat}

export default chatService