import { Request, Response } from 'express';

import db from '../database/connection';

export default class ItensCartController {

    //Responsável por listar os itens no carrinho
    async index(request: Request, response: Response) {

    }
    //Responsável por adicionar o item no carrinho
    async create(request: Request, response: Response) {
        const { idProduct } = request.body;

        const trx = await db.transaction();

        try {
            
        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while adding product on cart'
            })
        }
    }
}