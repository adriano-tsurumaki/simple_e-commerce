import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('carts', table => {
        table.increments('id').primary();
        table.float('total').notNullable();
        table.integer('id_user')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('carts');
}