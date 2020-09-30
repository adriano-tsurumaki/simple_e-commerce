import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('itens_cart', table => {
        table.increments('id');
        table.integer('quantity').notNullable();

        table.integer('id_livro')
            .notNullable()
            .references('id')
            .inTable('books')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table.integer('id_carrinho')
            .notNullable()
            .references('id')
            .inTable('carts')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('itens_cart');
}