import Knex from 'knex';

export async function seed(knex: Knex) {
    return knex('carts').insert([
        {
            total: 0.00,
            id_user: 1,
        },
        {
            total: 0.00,
            id_user: 2,
        },
        {
            total: 0.00,
            id_user: 3,
        },
        {
            total: 0.00,
            id_user: 4,
        },
        {
            total: 0.00,
            id_user: 5,
        },
        {
            total: 0.00,
            id_user: 6,
        },
    ])
}