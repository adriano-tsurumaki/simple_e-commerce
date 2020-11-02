import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('books', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('author').notNullable();
        table.string('image').notNullable();
        table.text('desc').notNullable();
        table.string('date').notNullable();
        table.double('price').notNullable();

        //O Rating será posto aqui temporariamente
        table.float('rating').notNullable();

        //Futuramente será separado para uma outra tabela
        table.integer('page').notNullable();
        table.string('dimension').notNullable();
        table.string('isbn').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('books');
}