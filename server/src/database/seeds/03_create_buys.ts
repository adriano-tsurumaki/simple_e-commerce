import Knex from 'knex';

export async function seed(knex: Knex) {
    return knex('buys').insert([
        {
            date: '2020-10-10',
            time: '12:00:00',
            id_user: 1
        },
        {
            date: '2020-10-10',
            time: '15:00:00',
            id_user: 1
        },
        {
            date: '2020-10-10',
            time: '15:30:00',
            id_user: 1
        },
        {
            date: '2020-10-10',
            time: '15:30:00',
            id_user: 1
        },

        /*--------------------*/

        {
            date: '2020-10-12',
            time: '11:00:00',
            id_user: 2
        },
        {
            date: '2020-10-12',
            time: '11:00:00',
            id_user: 2
        },
        {
            date: '2020-10-12',
            time: '11:00:00',
            id_user: 2
        },
        {
            date: '2020-10-12',
            time: '11:00:00',
            id_user: 2
        },

        /*--------------------*/

        {
            date: '2020-10-14',
            time: '16:00:00',
            id_user: 3
        },
        {
            date: '2020-10-14',
            time: '16:00:00',
            id_user: 3
        },
        {
            date: '2020-10-14',
            time: '16:00:00',
            id_user: 3
        },
        {
            date: '2020-10-14',
            time: '16:00:00',
            id_user: 3
        }

        
    ])
}