import { Request, Response, NextFunction } from 'express';

import db from '../database/connection';
import AuthMid from '../middleware/auth';

export default class ItensCartController {

    //Responsável por listar os itens no carrinho
    async index(request: Request, response: Response) {
        const authmid = new AuthMid();
        const dataHeader = request.headers.authorization;

        const decrypt = authmid.decrypt(dataHeader as string, 'Bearer');
        if(decrypt.error) {
            return response.status(decrypt.status).send({error: decrypt.error});
        }
        if(!decrypt.datas) {
            return response.status(decrypt.status).send({error: "No datas provided"});
        }

        const payload = authmid.validation(String(decrypt.datas));

        if(payload.expired) {
            return response.status(200).send({auth: false, session: 'Token is expired!'});
        }

        const id_user = payload.id;

        const trx = await db.transaction();

        try {

            const selectedIdsCartUser = await trx('carts')
                .select('id')
                .where({id_user});

            const id_cart = selectedIdsCartUser[0].id;

            const selectedItensCarts = await trx('itens_cart')
                .select('*')
                .where({id_cart});

            trx.commit();

            return response.status(200).json({
                success: true,
                data: selectedItensCarts
            })

        } catch(err) {
            return response.status(400).json({
                success: false,
                msg: 'Unexpected error while listing products on cart!' + err
            })
        }
    }
    // Responsável por adicionar o item no carrinho
    async create(request: Request, response: Response) {
        const authmid = new AuthMid();
        const { id_book } = request.body;
        const dataHeader = request.headers.authorization;

        const decrypt = authmid.decrypt(dataHeader as string, 'Bearer');
        if(decrypt.error) {
            return response.status(decrypt.status).send({error: decrypt.error});
        }
        if(!decrypt.datas) {
            return response.status(decrypt.status).send({error: "No datas provided"});
        }

        const payload = authmid.validation(String(decrypt.datas));

        if(payload.expired) {
            return response.status(200).send({auth: false, session: 'Token is expired!'});
        }

        const id_user = payload.id;

        const trx = await db.transaction();

        try {
            const insertedIdsCartUser = await trx('carts')
                .select('id')
                .where({id_user});

            
            const id_cart = insertedIdsCartUser[0].id;

            
            await trx('itens_cart').insert({
                id_book,
                id_cart,
                quantity: 1
            })
            
            await trx.commit();

            return response.status(201).json({
                success: true,
                msg: "Item added with successfully"
            });

        } catch(err) {
            return response.status(400).json({
                success: false,
                msg: 'Unexpected error while adding product on cart!' + err
            })
        }
    }
}