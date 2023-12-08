import React from "react";

export default function NavBar({ubicacion}) {
    let usuario = localStorage.getItem("email");
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="profilepNav">
                <div className="container px-4">
                    <a className="navbar-brand" href="/">elRastro</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            {/*<li className="nav-item"> <a href="/addProduct" className="addProducts nav-link"><button type="button" className="btn btn-outline-light btn-sm subir-anuncio">Subir producto</button></a></li>*/}
                            <li className="nav-item" style={{marginLeft: "20px"}}><a className={ubicacion === 'Productos'? 'nav-link active' : 'nav-link'} href="/productos">Productos</a></li>
                            <li className="nav-item" style={{marginLeft: "20px"}}><a className={ubicacion === 'Subir Producto'? 'nav-link active' : 'nav-link'} href={"/upload_product/"}>Subir Producto</a></li> 
                            <li className="nav-item" style={{marginLeft: "20px"}}> <a className={ubicacion === 'Mis Productos'? 'nav-link active' : 'nav-link'} href={"/misProductos"}>Mis productos</a></li> 
                            <li className="nav-item" style={{marginLeft: "20px"}}><a className={ubicacion === 'Mis chats'? 'nav-link active' : 'nav-link'} href="/chats"> Mis chats</a></li> 
                            <li className="nav-item" style={{marginLeft: "20px"}}><a className={ubicacion === 'Mis Pujas'? 'nav-link active' : 'nav-link'} href={"/misPujas"}> Mis pujas</a></li>
                            <li className="nav-item" style={{marginLeft: "20px"}}><a className={ubicacion === 'Mi perfil'? 'nav-link active' : 'nav-link'} href={"/usuario/" + usuario}>Mi perfil</a></li>
                            <li className="nav-item" style={{marginLeft: "20px"}}><a className="nav-link" href="/" onClick={(e) => {
                            
                                e.preventDefault();
                                Swal.fire({
                                    icon: 'question',
                                    html: '<h3>¿Quiere cerrar sesión?</h3> Volverás a la página principal.',
                                    confirmButtonText: 'Sí',
                                    confirmButtonColor: 'green',
                                    showDenyButton: 'true',
                                    denyButtonText: 'No'
                                }).then((result) => {

                                })
                            }} >Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}