import { FastifyInstance } from 'fastify'

import path from 'path'

import autoLoad from '@fastify/autoload'
import fastifyJwt from '@fastify/jwt'
import { fastifyCors } from '@fastify/cors'

import { env } from '../env'

export function setupPlugins(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: true,
  })

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET
  })

  app.register(autoLoad, {
    dir: path.join(__dirname, '../plugins'),
    options: Object.assign({}),
  })

  app.register(autoLoad, {
    dir: path.join(__dirname, '../routes'),
    options: { prefix: 'api/v1' },
  })
}
