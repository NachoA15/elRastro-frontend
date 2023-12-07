const moveToProductos = () => {
    window.location.href = '/productos';
}

const moveToProductPage = (idProducto) => {
    window.location.href = '/producto/' + idProducto;
}

const moveToValorarPage = (idProducto, usuarioValorador, usuarioValorado) => {
    window.location.href = '/valorar/' + idProducto + '/' + usuarioValorador + '/' + usuarioValorado;
}

const routerService = {moveToProductPage, moveToValorarPage, moveToProductos}

export default routerService;