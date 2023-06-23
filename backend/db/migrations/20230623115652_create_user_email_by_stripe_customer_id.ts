import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_email_by_stripe_customer_id', (table) => {
    table.uuid('id').primary()
    table.string('stripe_customer_id').notNullable()
    table
      .string('user_email')
      .references('users.email')
      .notNullable()
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_email_by_stripe_customer_id')
}
