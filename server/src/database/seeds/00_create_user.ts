import Knex from 'knex';

export async function seed(knex: Knex) {
    return knex('users').insert([
        {
            name: 'asd',
            password: '$2a$10$u9EUVqe5YDaPR2JQ8rt.n.XBuR5Xb/KlPA.l0Otn6nGM/GBY2djYi',
            email: 'asd@example.com'
        },
        {
            name: 'user1',
            password: '$2a$10$u9EUVqe5YDaPR2JQ8rt.n.XBuR5Xb/KlPA.l0Otn6nGM/GBY2djYi',
            email: 'user1@example.com'
        },
        {
            name: 'user2',
            password: '$2a$10$u9EUVqe5YDaPR2JQ8rt.n.XBuR5Xb/KlPA.l0Otn6nGM/GBY2djYi',
            email: 'user2@example.com'
        },
        {
            name: 'user3',
            password: '$2a$10$u9EUVqe5YDaPR2JQ8rt.n.XBuR5Xb/KlPA.l0Otn6nGM/GBY2djYi',
            email: 'user3@example.com'
        },
        {
            name: 'user4',
            password: '$2a$10$u9EUVqe5YDaPR2JQ8rt.n.XBuR5Xb/KlPA.l0Otn6nGM/GBY2djYi',
            email: 'user4@example.com'
        },
        {
            name: 'user5',
            password: '$2a$10$u9EUVqe5YDaPR2JQ8rt.n.XBuR5Xb/KlPA.l0Otn6nGM/GBY2djYi',
            email: 'user5@example.com'
        },
        {
            name: 'user6',
            password: '$2a$10$u9EUVqe5YDaPR2JQ8rt.n.XBuR5Xb/KlPA.l0Otn6nGM/GBY2djYi',
            email: 'user6@example.com'
        },
    ])
}