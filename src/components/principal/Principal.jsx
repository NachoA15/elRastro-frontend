import React from 'react'
import GoogleOAuth from '../oauth/GoogleOauth'
import Logo from '../../assets/images/logo.png'
import '../../assets/css/IntroPage.css'

export default function IntroPage() {
    return (
        <>
        <main class="flex-shrink-0">
            {/*<!-- Header-->*/}
            <header class="bg-dark py-5">
                <div class="container px-5">
                    <div class="row gx-5 align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div class="my-5 text-center text-xl-start">
                                <h1 class="display-5 fw-bolder text-white mb-2">elRastro</h1>
                                <p class="lead fw-normal text-white-50 mb-4">Adquiere productos ganando subastas o crea la tuya propia, comunícate anónimamente con otros usuarios y valora tu experiencia.</p>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <GoogleOAuth />
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5" src={Logo} alt="..." /></div>
                    </div>
                </div>
            </header>
            {/*<!-- Features section-->*/}
            <section class="py-5" id="features">
                <div class="container px-5 my-5">
                    <div class="row gx-5">
                        <div class="col-lg-4 mb-5 mb-lg-0"><h2 class="fw-bolder mb-0">Una plataforma de compra-venta basada en subastas</h2></div>
                        <div class="col-lg-8">
                            <div class="row gx-5 row-cols-1 row-cols-md-2">
                                <div class="col mb-5 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-collection"></i></div>
                                    <h2 class="h5">Participa en subastas</h2>
                                    <p class="mb-0">Adquiere un producto siendo la puja más alta. Todas las pujas son anónimas. Paga de forma segura con PayPal.</p>
                                </div>
                                <div class="col mb-5 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-building"></i></div>
                                    <h2 class="h5">Abre tus propias subastas</h2>
                                    <p class="mb-0">Puedes subir un producto que ya no quieras y se abrirá una subasta donde el resto de usuarios podrán pujar por él.</p>
                                </div>
                                <div class="col mb-5 mb-md-0 h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                                    <h2 class="h5">Comunícate con el vendedor</h2>
                                    <p class="mb-0">Si tienes dudas acerca de un producto, puedes chatear con el vendedor de manera privada y anónima. El vendedor no sabrá con quién está hablando.</p>
                                </div>
                                <div class="col h-100">
                                    <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                                    <h2 class="h5">Valora tu experiencia con los usuarios</h2>
                                    <p class="mb-0">El ganador de una subasta puede valorar al vendedor del producto tras concluirse y viceversa. Revisa las valoraciones de los usuarios en su perfil y observa las experiencias de otros usuarios.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- Testimonial section-->*/}
            <div class="py-5 bg-light">
                <div class="container px-5 my-5">
                    <div class="row gx-5 justify-content-center">
                        <div class="col-lg-10 col-xl-7">
                            <div class="text-center">
                                <div class="fs-4 mb-4 fst">Visualiza la localización de cada producto en mapas dispuestos para ello. Por cada producto se calculará una tasa adicional en relación a la huella de carbono emitida en el transporte del mismo.</div>
                                <div class="d-flex align-items-center justify-content-center">
                                    <img class="me-3" src="https://cdn-icons-png.flaticon.com/512/5482/5482069.png" alt="..." width={'50px'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        {/*<!-- Footer-->*/}
        <footer class="bg-dark py-4 mt-auto">
            <div class="container px-5">
                <div class="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div class="col-auto"><div class="small m-0 text-white">Copyright &copy; elRastro 2023</div></div>
                    <div class="col-auto">
                        <a class="link-light small" href="https://github.com/NachoA15/elRastro-frontend">GitHub</a>
                        <span class="text-white mx-1">&middot;</span>
                        <a class="link-light small" href="#!">Contacto</a>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}