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
            return response.status(200).send({
                auth: false,
                redirectForLogin: true,
                session: 'Token is expired!'});
        }

        const id_user = payload.id;

        const trx = await db.transaction();

        try {

            const selectedIdsCartUser = await trx('carts')
                .select('id', 'total')
                .where({id_user});

            const id_cart = selectedIdsCartUser[0].id;
            const total = selectedIdsCartUser[0].total;

            const selectedItensCarts = await trx('itens_cart')
                .select('id_book', 'id')
                .where({id_cart});

            const listBooks = await Promise.all(selectedItensCarts.map(async (item) => {
                const book = await trx("books")
                    .select('id', 'title', 'author', 'image', 'price')
                    .where({id: item.id_book})
                return {...book, id_item: item.id};
            }));

            trx.commit();

            return response.status(200).json({
                auth: true,
                redirectForLogin: false,
                list: listBooks,
                total
            })

        } catch(err) {

            await trx.rollback();

            return response.status(201).json({
                auth: false,
                redirectForLogin: false,
                msg: 'Unexpected error while listing products on cart!',
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
            return response.status(200).send({
                auth: false,
                redirectForLogin: true,
                session: 'Token is expired!',
                msg: 'Log in to continue'
            });
        }

        const id_user = payload.id;

        const trx = await db.transaction();

        try {
            const insertedIdsCartUser = await trx('carts')
                .select('id')
                .where({id_user});

            const id_cart = insertedIdsCartUser[0].id;

            const isInserted = await trx('itens_cart')
                .select('id_book')
                .where({id_cart, id_book});

            if(isInserted.length !== 0) {
                await trx.commit();

                return response.status(201).json({
                    auth: false,
                    redirectForLogin: false,
                    msg: "Item already added on cart!"
                });
            }

            /*------------------------------------------------------*/
            //Atualizando o total do carrinho

            const selectedTotalCarts = await trx('carts')
                .select('total')
                .where({id_user});

            const total = selectedTotalCarts[0].total;

            const selectedPriceBooks = await trx('books')
                .select('price')
                .where({id: id_book})

            const price = selectedPriceBooks[0].price;

            const numFixed = parseFloat((price + total).toFixed(2));

            console.log({price, total, numFixed});

            await trx('carts')
                .update({total: numFixed})
                .where({
                    id: id_cart,
                    id_user
                })

            /*------------------------------------------------------*/
            
            await trx('itens_cart').insert({
                id_book,
                id_cart
            })
            
            await trx.commit();

            return response.status(201).json({
                auth: true,
                redirectForLogin: false,
                msg: "Item added with successfully"
            });

        } catch(err) {

            await trx.rollback();

            return response.status(201).json({
                auth: false,
                redirectForLogin: false,
                msg: 'Unexpected error while adding product on cart! Error: ' + err
            })
        }
    }

    async destroy(request: Request, response: Response) {

        const authmid = new AuthMid();
        const dataHeader = request.headers.authorization;

        const decrypt = authmid.decrypt(dataHeader as string, 'Basic');
        if(decrypt.error) {
            return response.status(decrypt.status).send({error: decrypt.error});
        }
        if(!decrypt.datas) {
            return response.status(decrypt.status).send({error: "No datas provided"});
        }

        const [token, id_item] = decrypt.datas;

        const payload = authmid.validation(String(token));

        if(payload.expired) {
            return response.status(200).send({
                auth: false,
                redirectForLogin: true,
                session: 'Token is expired!'
            });
        }

        const { id, cart_id } = payload;

        const trx = await db.transaction();

        try {

            const selectedIdsBooks = await trx('itens_cart')
                .select('id_book')
                .where({id: id_item});

            const id_book = selectedIdsBooks[0].id_book;

            const selectedPricesBooks = await trx('books')
                .select('price')
                .where({id: id_book});
            
            const price_book = selectedPricesBooks[0].price;

            const selectedTotalsCarts = await trx('carts')
                .select('total')
                .where({
                    id: cart_id,
                    id_user: id
                });

                
            const total = selectedTotalsCarts[0].total;

            const numFixed = parseFloat((total - price_book).toFixed(2));

            await trx('carts')
                .update({total: numFixed})
                .where({
                    id: cart_id,
                    id_user: id
                })

            await trx('itens_cart')
                .where({id: id_item})
                .del();

            trx.commit();

            return response.status(200).send({
                auth: true,
                total: numFixed,
                redirectForLogin: false,
            });
        } 
        catch(err) {

            trx.rollback();

            console.log(err);

            return response.status(201).json({
                auth: false,
                redirectForLogin: false,
                msg: 'Unexpected error while deleting item cart!',
            })

        }
    }
}