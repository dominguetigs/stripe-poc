import { FastifyInstance } from 'fastify'

import { fastifyCors } from '@fastify/cors'

import fastifyJwt from '@fastify/jwt'
import autoLoad from '@fastify/autoload'

import path from 'path'

export function setupPlugins(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: true,
  })

  app.register(fastifyJwt, { secret: '123456789876543210' })

  app.register(autoLoad, {
    dir: path.join(__dirname, '../plugins'),
    options: Object.assign({}),
  })

  app.register(autoLoad, {
    dir: path.join(__dirname, '../routes'),
    options: { prefix: 'api/v1' },
  })
}
