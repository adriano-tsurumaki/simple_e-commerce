import { Request, Response } from 'express';

import db from '../database/connection';


export default class BooksController {
    // async index(request: Request, response: Response) {}

    //Responsável por adicionar mais livros no banco de dados
    async create(request: Request, response: Response) {
        
        const {
            title,
            author,
            image,
            desc,
            date,
            price,
            page,
            dimension,
            isbn
        } = request.body;

        const trx = await db.transaction();

        try {
            
            await trx('books').insert({
                title,
                author,
                image,
                desc,
                date,
                price,
                page,
                dimension,
                isbn
            });

            await trx.commit();

            response.status(201).json({
                success: 'Created with success'
            })

        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new book'
            });
        }
    }
}