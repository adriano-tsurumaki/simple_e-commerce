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

//Retorna os dados 
routes.get('/bestsellers/:quantity', (request, response) => {
    console.log(request.params.quantity);

    const books = [{
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51CumRhePVL._SX346_BO1,204,203,200_.jpg',
        title: 'O nome do vento',
        author: 'Patrick Rothfuss',
        price: 'R$ 35,91',
        rating: '5.0',
        id: 1
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51YG16TP6LL._SX346_BO1,204,203,200_.jpg',
        title: 'O temor do sábio',
        author: 'Patrick Rothfuss',
        price: 'R$ 35,91',
        rating: '4.5',
        id: 2
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51G92GMIluL._SX346_BO1,204,203,200_.jpg',
        title: 'A música do silêncio',
        author: 'Patrick Rothfuss',
        price: 'R$ 16,05',
        rating: '4.5',
        id: 3
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51NjUyqABrL._SX446_BO1,204,203,200_.jpg',
        title: 'Box Sherlock Holmes',
        author: 'Arthur Conan Doyle',
        price: 'R$ 58,41',
        rating: '5.0',
        id: 4
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51CumRhePVL._SX346_BO1,204,203,200_.jpg',
        title: 'O nome do vento',
        author: 'Patrick Rothfuss',
        price: 'R$ 35,91',
        rating: '5.0',
        id: 5
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51YG16TP6LL._SX346_BO1,204,203,200_.jpg',
        title: 'O temor do sábio',
        author: 'Patrick Rothfuss',
        price: 'R$ 35,91',
        rating: '4.5',
        id: 6
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51G92GMIluL._SX346_BO1,204,203,200_.jpg',
        title: 'A música do silêncio',
        author: 'Patrick Rothfuss',
        price: 'R$ 16,05',
        rating: '4.5',
        id: 7
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51NjUyqABrL._SX446_BO1,204,203,200_.jpg',
        title: 'Box Sherlock Holmes',
        author: 'Arthur Conan Doyle',
        price: 'R$ 58,41',
        rating: '5.0',
        id: 8
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51CumRhePVL._SX346_BO1,204,203,200_.jpg',
        title: 'O nome do vento',
        author: 'Patrick Rothfuss',
        price: 'R$ 35,91',
        rating: '5.0',
        id: 9
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51YG16TP6LL._SX346_BO1,204,203,200_.jpg',
        title: 'O temor do sábio',
        author: 'Patrick Rothfuss',
        price: 'R$ 35,91',
        rating: '4.5',
        id: 10
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51G92GMIluL._SX346_BO1,204,203,200_.jpg',
        title: 'A música do silêncio',
        author: 'Patrick Rothfuss',
        price: 'R$ 16,05',
        rating: '4.5',
        id: 11
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51NjUyqABrL._SX446_BO1,204,203,200_.jpg',
        title: 'Box Sherlock Holmes',
        author: 'Arthur Conan Doyle',
        price: 'R$ 58,41',
        rating: '5.0',
        id: 12
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51CumRhePVL._SX346_BO1,204,203,200_.jpg',
        title: 'O nome do vento',
        author: 'Patrick Rothfuss',
        price: 'R$ 35,91',
        rating: '5.0',
        id: 13
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51YG16TP6LL._SX346_BO1,204,203,200_.jpg',
        title: 'O temor do sábio',
        author: 'Patrick Rothfuss',
        price: 'R$ 35,91',
        rating: '4.5',
        id: 14
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51G92GMIluL._SX346_BO1,204,203,200_.jpg',
        title: 'A música do silêncio',
        author: 'Patrick Rothfuss',
        price: 'R$ 16,05',
        rating: '4.5',
        id: 15
    },
    {
        img_url_medium: 'https://images-na.ssl-images-amazon.com/images/I/51NjUyqABrL._SX446_BO1,204,203,200_.jpg',
        title: 'Box Sherlock Holmes',
        author: 'Arthur Conan Doyle',
        price: 'R$ 58,41',
        rating: '5.0',
        id: 16
    },]

    return response.status(201).json(books)
})


export default routes;