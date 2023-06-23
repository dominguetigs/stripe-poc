import { FastifyInstance } from 'fastify'

import { randomUUID } from 'node:crypto'

import { knex } from '../database'
import { auth } from '../helpers/authentication'
import { stripe } from '../stripe'

const routes = async (app: FastifyInstance) => {
  app.get('/customer-by-email', auth(app), async (request, reply) => {
    const userEmail = request?.user_data?.email

    try {
      const userEmailByStripeCustomerId = await knex(
        'user_email_by_stripe_customer_id'
      )
        .where('user_email', userEmail)
        .first()

      if (!userEmailByStripeCustomerId) {
        return reply.status(404).send('User not found')
      }

      return reply.status(200).send(userEmailByStripeCustomerId)
    } catch (error) {
      return reply.status(500).send({ error })
    }
  })

  app.post('/customer', auth(app), async (request, reply) => {
    const userEmail = request?.user_data?.email

    try {
      const { id } = await stripe.customers.create({ email: userEmail })

      await knex('user_email_by_stripe_customer_id').insert({
        id: randomUUID(),
        user_email: userEmail,
        stripe_customer_id: id,
      })

      return reply.status(200).send({ stripe_customer_id: id })
    } catch (error) {
      return reply.status(500).send()
    }
  })
}

export default routes
export const autoPrefix = '/stripe'
