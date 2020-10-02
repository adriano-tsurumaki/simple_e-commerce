import express from 'express';
import BooksController from './controllers/BooksController';
import ItensCartController from './controllers/ItensCartController';
import UsersController from './controllers/UsersController';
import AuthMid from './middleware/auth';

const usersController = new UsersController();
const booksController = new BooksController();
const itensCartController = new ItensCartController();
const routes = express.Router();
const authmid = new AuthMid();

// routes.get('/admin/products', itensController.index);
routes.post('/admin/products/add', booksController.create);

//Registrar
routes.post('/user/register', usersController.create);
//Logar
routes.post('/user/login', usersController.index);

//Adicionar os itens no carrinho
routes.post('/user/cart', itensCartController.create);
//Listar os itens no carrinho
routes.get('/user/cart', itensCartController.index);


export default routes;