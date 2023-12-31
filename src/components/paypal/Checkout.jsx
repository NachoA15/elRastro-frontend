import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import NavBar from '../NavBar';

import routerService from "../../service/routerService";

import productoService from "../../service/productoService";

export default function Checkout({usuario, producto}) {
    const options = { 
        "client-id": "AZte9y79PwgBayOc9EegAbG0E_fCwok3erAYKlaMGynqXlUaOo_gbHLvhPH7SceELnW1bUK6Lv6G8RhI",
        "disable-funding": "sofort,card",
        "currency": "EUR",
        "intent": "capture"
    }
    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: producto.puja.cantidad,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
            producto.pagado = true;
            producto.id = producto._id
            productoService.updateProduct(producto)
            routerService.moveToValorarPage(producto._id, usuario, producto.usuario);
        });
    }

    return (
        <>
            <NavBar />
            <div className="checkout">
                <PayPalScriptProvider options={options}>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </PayPalScriptProvider>
            </div>
        </>
    );
}
