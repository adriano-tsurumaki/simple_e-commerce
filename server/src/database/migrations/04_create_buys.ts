import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('buys', table => {
        table.increments('id').primary();


        //Postgresql FORMAT: YY-MM-DD
        table.date('date');
        //Postgresql FORMAT: HH:MM:SS
        table.time('time');

        table.integer('id_user')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('buys');
}

// function showAll() {
//     let atual = new Date();
//     console.log(
//     `data atual: ${atual}\n` +
//     `getFullYear: ${atual.getFullYear()}\n` +
//     `getMonth: ${atual.getMonth()}\n` + 
//     `getDate: ${atual.getDate()}\n` + 
//     `getHours: ${atual.getHours()}\n` +
//     `getMinutes: ${atual.getMinutes()}\n` +
//     `getSeconds: ${atual.getSeconds()}\n` +
//     `getMilliseconds: ${atual.getMilliseconds()}\n` +
//     `getTime: ${atual.getTime()}\n` +
//     `getDay: ${atual.getDay()}\n`
//     )
// }