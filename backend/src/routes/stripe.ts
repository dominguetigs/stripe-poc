import { FastifyInstance } from 'fastify'

import { randomUUID } from 'node:crypto'

import { knex } from '../database'
import { auth } from '../helpers/authentication'
import { stripe } from '../stripe'
import { z } from 'zod'

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
        return reply.status(200).send({})
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

  app.get('/products', auth(app), async (_, reply) => {
    try {
      const products = await stripe.products.list()
      return reply.status(200).send(products)
    } catch (error) {
      return reply.status(400).send()
    }
  })

  app.get('/products/:id', auth(app), async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().nonempty(),
    })

    const { id } = paramsSchema.parse(request.params)

    try {
      const product = await stripe.products.retrieve(id)
      return reply.status(200).send(product)
    } catch (error) {
      return reply.status(400).send()
    }
  })
}

export default routes
export const autoPrefix = '/stripe'
