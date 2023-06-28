import { FastifyInstance } from 'fastify'

import Stripe from 'stripe'

import { env } from '../env'
import { stripe } from '../stripe'

const relevantEvents = new Set([
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.canceled',
  'charge.refunded',
])

const routes = async (app: FastifyInstance) => {
  app.post(
    '/',
    {
      config: {
        rawBody: true,
      },
    },
    async (request, reply) => {
      const rawPayload = request.rawBody as string
      const signature = request.headers['stripe-signature'] as string
      const webhoookSigningSecret = env.STRIPE_WEBHOOK_SIGNING_SECRET

      let event: Stripe.Event

      try {
        event = stripe.webhooks.constructEvent(rawPayload, signature, webhoookSigningSecret)
      } catch (error) {
        const err = error as any
        return reply.status(400).send(`Webhook error: ${err.message}`)
      }

      const { type } = event

      if (relevantEvents.has(type)) {
        switch (type) {
          case 'payment_intent.succeeded':
            console.info('Successful payment, perform necessary actions')
            console.log(event)
            break
          case 'payment_intent.payment_failed':
            console.info('Payment failed, handle the error')
            console.log(event)
            break
          case 'payment_intent.canceled':
            console.info('Canceled payment, handle the cancellation')
            console.log(event)
            break
          case 'charge.refunded':
            console.info('Refunded payment, handle the refund')
            console.log(event)
            break
          default:
            throw new Error('Unhandled event')
        }
      }

      reply.status(200).send({ received: true })
    }
  )
}

export default routes
export const autoPrefix = '/webhook'
