import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();


//A ordem importa!!!!
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

/*
    index   –   Lista os dados da tabela
    show    –   Mostra um item específico
    create  –   Cria um item da tabela
    store   –   Salva o novo item na tabela
    edit    –   Retorna a View para edição do dado
    update  –   Salva a atualização do dado
    destroy -   Remove o dado
*/