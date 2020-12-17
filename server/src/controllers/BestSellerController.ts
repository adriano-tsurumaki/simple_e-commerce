import { Request, Response } from 'express';

import db from '../database/connection';

export default class BestSellerController {
    async index(request: Request, response: Response) {

        const quantity = Number(request.params.quantity);

        const trx = await db.transaction();

        const from = '2020-10-01';
        const to = '2020-10-31';

        try {

            const selectedBestBooks = await trx('buys_books')
                .join('buys as by', 'buys_books.id_buy', 'by.id')
                .join('books as bk', 'buys_books.id_book', 'bk.id')
                .select(
                    'bk.title',
                    'bk.author',
                    'bk.image',
                    'bk.price',
                    'bk.rating',
                    'buys_books.id_book',
                )
                .count('buys_books.id_book as quantidade')
                .whereBetween('by.date', [from, to])
                .offset(0)
                .limit(quantity)
                .groupBy('buys_books.id_book')
                .orderBy('quantidade', 'desc')

            trx.commit();

            const listBestBooks = selectedBestBooks.map(selected => {
                const { image, id_book, ...rest } = selected;
                return {
                    img_url_medium: image,
                    id: id_book,
                    ...rest
                }
            });
    

            return response.json(listBestBooks);

        } catch(err) {

            trx.rollback();

            return response.send("Ocorreu um erro: " + err);
        }

    }
}