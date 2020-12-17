import Knex from 'knex';

export async function seed(knex: Knex) {
    return knex('buys_books').insert([
        {id_buy: 1,id_book: 1},
        {id_buy: 1,id_book: 2},
        {id_buy: 1,id_book: 3},

        {id_buy: 2,id_book: 1},
        {id_buy: 2,id_book: 1},
        {id_buy: 2,id_book: 1},

        {id_buy: 3,id_book: 3},
        {id_buy: 3,id_book: 3},
        {id_buy: 3,id_book: 3},

        {id_buy: 4,id_book: 1},
        {id_buy: 4,id_book: 1},
        {id_buy: 4,id_book: 2},

        /*--------------------*/

        {id_buy: 5,id_book: 12},
        {id_buy: 5,id_book: 12},
        {id_buy: 5,id_book: 12},
        
        {id_buy: 6,id_book: 5},
        {id_buy: 6,id_book: 5},
        {id_buy: 6,id_book: 3},
        
        {id_buy: 7,id_book: 10},
        {id_buy: 7,id_book: 10},
        {id_buy: 7,id_book: 9},

        {id_buy: 8,id_book: 1},
        {id_buy: 8,id_book: 2},
        {id_buy: 8,id_book: 14},
        
        /*--------------------*/
        
        {id_buy: 9,id_book: 15},
        {id_buy: 9,id_book: 16},
        {id_buy: 9,id_book: 17},
        
        {id_buy: 10,id_book: 11},
        {id_buy: 10,id_book: 12},
        {id_buy: 10,id_book: 13},
        
        {id_buy: 11,id_book: 3},
        {id_buy: 11,id_book: 4},
        {id_buy: 11,id_book: 5},

        {id_buy: 8,id_book: 1},
        {id_buy: 8,id_book: 1},
        {id_buy: 8,id_book: 2},


    ]);
}