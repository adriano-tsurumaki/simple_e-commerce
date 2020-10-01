import { Request, Response } from 'express';

import db from '../database/connection';

export default class ItensCartController {

    //Responsável por listar os itens no carrinho
    async index(request: Request, response: Response) {

    }
    //Responsável por adicionar o item no carrinho
    // async create(request: Request, response: Response) {
    //     const { idProduct } = request.body;

    //     // const id_user;

    //     const trx = await db.transaction();

    //     try {
    //         const selectedIdsCartUser = await trx('carts')
    //             .select('id')
    //             .where({id_user});

    //         const id_carrinho = selectedIdsCartUser[0];

    //         await trx('itens_cart').insert({
    //             id_livro: idProduct,
    //             id_carrinho
    //         })
    //     } catch(err) {
    //         return response.status(400).json({
    //             error: 'Unexpected error while adding product on cart'
    //         })
    //     }
    // }
}