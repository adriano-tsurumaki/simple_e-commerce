import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('buys_books', table => {
        table.increments('id').primary();

        table.integer('id_buy')
            .notNullable()
            .references('id')
            .inTable('buys')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
            
        table.integer('id_book')
            .notNullable()
            .references('id')
            .inTable('books')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('buys_books');
}