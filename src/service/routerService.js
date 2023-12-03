const moveToProductPage = (idProducto) => {
    window.location.href = '/producto/' + idProducto;
}

const routerService = {moveToProductPage}

export default routerService;