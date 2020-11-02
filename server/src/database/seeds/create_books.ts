import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('books').insert([
        {
            title: 'Cristianismo puro e simples',
            author: 'C.S. Lewis',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51yyuSLfAZL._SX327_BO1,204,203,200_.jpg',
            desc: 'Em um dos períodos mais sombrios da humanidade, a Segunda Guerra Mundial, C.S. Lewis foi convidado pela BBC a fazer uma série de palestras pelo rádio com o intuito de explicar a fé cristã de forma simples e clara. Mais tarde, ajustado pelo próprio Lewis, esse material daria origem a Cristianismo puro e simples, um grande clássico da literatura. Na obra mais popular e acessível de seu legado, Lewis apresenta os principais elementos da cosmovisão cristã, gradativamente conduzindo o leitor a temas mais profundos e complexos, provocando reflexão e debate. Nesta edição especial e com tradução de uma das maiores especialistas em Lewis do Brasil, você vai encontrar as palavras que encorajaram e fortaleceram milhares de ouvintes em tempos de guerra ― e ainda reverberam mais de 70 anos depois.',
            date: '1603053282',
            price: 26.91,
            rating: 4.9,
            page: 288,
            dimension: '21,4 x 14 x 2 cm',
            isbn: '8578601777'
        },
        {
            title: 'O nome do vento',
            author: 'Patrick Rothfuss',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51CumRhePVL._SX346_BO1,204,203,200_.jpg',
            desc: 'Nothing to say yet',
            date: '1603053282',
            price: 35.91,
            rating: '5.0',
            page: 500,
            dimension: '9x9x9',
            isbn: '0000'
        },
        {
            title: 'O temor do sábio',
            author: 'Patrick Rothfuss',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51YG16TP6LL._SX346_BO1,204,203,200_.jpg',
            desc: 'Nothing to say yet',
            date: '1603053282',
            price: 35.91,
            rating: '4.5',
            page: 500,
            dimension: '9x9x9',
            isbn: '0000'
        },
        {
            title: 'A música do silêncio',
            author: 'Patrick Rothfuss',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51G92GMIluL._SX346_BO1,204,203,200_.jpg',
            desc: 'Nothing to say yet',
            date: '1603053282',
            price: 16.05,
            rating: '4.5',
            page: 500,
            dimension: '9x9x9',
            isbn: '0000'
        },
        {
            title: 'Box Sherlock Holmes',
            author: 'Arthur Conan Doyle',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51NjUyqABrL._SX446_BO1,204,203,200_.jpg',
            desc: 'Nothing to say yet',
            date: '1603053282',
            price: 58.41,
            rating: '5.0',
            page: 500,
            dimension: '9x9x9',
            isbn: '0000'
        }
    ])
}