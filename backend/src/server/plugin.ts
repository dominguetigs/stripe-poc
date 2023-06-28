import { FastifyInstance } from 'fastify'

import path from 'path'

import autoLoad from '@fastify/autoload'
import fastifyJwt from '@fastify/jwt'
import { fastifyCors } from '@fastify/cors'

import { fastifyRawBody } from 'fastify-raw-body'

import { env } from '../env'

export function setupPlugins(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: true,
  })

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET
  })

  app.register(fastifyRawBody, {
    field: 'rawBody',
    global: false,
    encoding: 'utf8',
    runFirst: true,
    routes: []
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
