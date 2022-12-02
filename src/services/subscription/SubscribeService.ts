import Stripe from 'stripe';
import prismaCLient from '../../prisma/index';
import { stripe } from '../../utils/stripe';

interface SubscribeRequest {
    user_id: string
}

class SubscribeService {
    async execute({ user_id }: SubscribeRequest) {
        const stripeConfig = stripe;
        // Buscar o usuário e cadastrar ele no STRIPE caso não tenha cadastrado
        const findUser = await prismaCLient.user.findFirst({
            where: {
                id: user_id
            }
        })

        let customerId = findUser?.stripe_customer_id;

        if (!customerId) {
            // Caso não tenha customerId criamos lá no Stripe
            const stripeCustomer = await stripeConfig.customers.create({
                email: findUser?.email
            })

            await prismaCLient.user.update({
                where: {
                    id: user_id
                },
                data: {
                    stripe_customer_id: stripeCustomer?.id
                }
            })

            customerId = stripeCustomer?.id
        }

        // Inicializar o nosso checkout de pagamento
        const stripeCheckoutSession = await stripeConfig.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                {
                    price: process.env.STRIPE_PRICE,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return { sessionId: stripeCheckoutSession?.id }
    }
}

export { SubscribeService };