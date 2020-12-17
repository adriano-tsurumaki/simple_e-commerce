import express from 'express';
import BooksController from './controllers/BooksController';
import ItensCartController from './controllers/ItensCartController';
import UsersController from './controllers/UsersController';
import BestSellerController from './controllers/BestSellerController';

// import AuthMid from './middleware/auth';

import db from './database/connection';

const usersController = new UsersController();
const booksController = new BooksController();
const itensCartController = new ItensCartController();
const bestSellerController = new BestSellerController();
const routes = express.Router();

// routes.get('/admin/products', itensController.index);
routes.post('/admin/products/add', booksController.create);

routes.get('/user', usersController.index);

//Registrar
routes.post('/user/register', usersController.create);
//Logar
routes.post('/user/login', usersController.login);

//Adicionar os itens no carrinho
routes.post('/user/cart', itensCartController.create);
//Listar os itens no carrinho
routes.get('/user/cart', itensCartController.index);
//Excluir um item no carrinho
routes.delete('/user/cart', itensCartController.destroy);


//Listar os best sellers
routes.get('/index/bestsellers/:quantity', bestSellerController.index);

//Retorna os dados 
routes.get('/bestsellers/:quantity', async (request, response) => {
    // console.log(request.params.quantity);

    const quantity = Number(request.params.quantity);

    const trx = await db.transaction();

    try {
        const selectedBestBooks = await trx('books')
            .select('title', 'author', 'image', 'price', 'rating', 'id')
            .offset(0)
            .limit(quantity);

        // console.log(selectedBestBooks);

        trx.commit();

        const listBestBooks = selectedBestBooks.map(selected => {
            const { image, ...rest } = selected;
            return {
                img_url_medium: image,
                ...rest
            }
        });

        return response.status(201).json(listBestBooks);
    }
    catch(err) {
        return response.status(400).json({
            success: false,
            msg: 'Unexpected error while listing best seller',
            error: err
        })
    }
})


export default routes;

// index – Lista os dados da tabela
// show – Mostra um item específico
// create – Retorna a View para criar um item da tabela
// store – Salva o novo item na tabela
// edit – Retorna a View para edição do dado
// update – Salva a atualização do dado
// destroy – Remove o dado