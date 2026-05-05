import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
  throw new Error(
    "Falta STRIPE_SECRET_KEY. Copia .env.example a .env en Strip_Pasarela_Demo/ y añade tu clave de Stripe."
  );
}

const stripe = new Stripe(stripeSecret);


export const procesarPago = async (req, res) => {
    try {
        const sesion = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    product_data: {
                        name: "Producto de prueba",
                        description: "Este es un producto de prueba",
                    },
                    currency: "mxn",
                    unit_amount: 1000,
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: "http://localhost:4000/exito",
            cancel_url: "http://localhost:4000/cancelado",
        });

        res.json({ url: sesion.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};