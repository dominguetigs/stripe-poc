// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      created_at: string
      token: string
    }

    user_email_by_stripe_customer_id: {
      id: string
      user_email: string
      stripe_customer_id: string
    }
  }
}
