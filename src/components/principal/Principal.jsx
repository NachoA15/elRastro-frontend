import React from 'react'
import NavbarIntroPage from './NavbarIntroPage'
import '../../assets/css/IntroPage.css'

export default function IntroPage() {

    return (
        <>
        <div id='navbarLocation'>
            <NavbarIntroPage />
        </div>
        <div className='container-fluid'>
            <div id='inicio'>
                <div className='textLeft'>
                    <h1 tabIndex="0">Encuentra infinidad de productos</h1>
                    {/*<br/>
                    <p className='intro-text' tabIndex="0">En elRastro </p>
                    <div id='intro-buttons-section'>
                        <button className='button-intro' onClick={() => {}}>Entra</button>
                    </div>*/}
                </div>
            </div>
            <div id='anuncios'>
                <div className='textRight'>
                    <h1 tabIndex="0">Puja por los productos</h1>
                    <br/>
                    <p className='intro-text' tabIndex="0">Por cada producto hay una subasta. Sé el mejor postor para quedártelo.</p>
                    <br/>
                    <p className='intro-text' tabIndex="0">Una vez concluida la subasta, si has sido la puja más alta, se te notificará por correo electrónico 
                    y podrás efectuar el pago por Paypal.
                    </p>
                </div>
            </div>
            {/*<div id='interactua'>
                <div className='textLeft'>
                    <h1 tabIndex="0">Interactúa con otros músicos</h1>
                    <br/>
                    <p className='intro-text' tabIndex="0">Valora a otros usuarios y visita los perfiles de otras personas.</p>
                    <p className='intro-text' tabIndex="0">Personaliza tu perfil con cualquier cosa sobre ti que quieras
                        compartir con el resto.</p>
                    <p className='intro-text' tabIndex="0">¡Conecta con gente que comparte tu misma pasión!</p>
                </div>
            </div>
            <div id='sobre-nosotros'>
                <div className='textRight'>
                    <h1 tabIndex="0">Sobre nosotros</h1>
                    <br/>
                    <p className='intro-text' tabIndex="0">Somos un equipo de estudiantes de Ingeniería de Software de la Universidad de Málaga
                        a los que, como tú, nos apasiona el mundo de la música.</p>
                </div>
            </div>*/}
        </div>
        </>
    )
}