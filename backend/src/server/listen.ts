import { FastifyInstance } from 'fastify'

import { env } from '../env'

export function listen(app: FastifyInstance) {
  app
    .listen({
      port: env.PORT,
    })
    .then(() => {
      console.log(`HTTP Server Running!`)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
