import { Request, Response } from 'express';
import db from '../database/connection';
import AuthMid from '../middleware/auth';

import bcrypt from 'bcryptjs';

export default class UsersController {

    //Responsável pela Log in
    async index(request: Request, response: Response) {

        const authmid = new AuthMid();
        const dataHeader = request.headers.authorization;
        
        const decrypt = authmid.decrypt(dataHeader as string, 'Basic');

        if(decrypt.status === 401) {
            return response.status(decrypt.status).send({error: decrypt.error});
        }
        if(!decrypt.datas) {
            return response.status(decrypt.status).send({error: "No datas provided"});
        }

        const name = decrypt.datas[0];
        const password = decrypt.datas[1];

        const pwds = await db.select('password')
            .from('users')
            .where({
                name
            });

        if(pwds.length === 0) {
            return response.send("Usuário ou senha inválido");
        }

        const pwd = pwds[0];

        const ids = await db.select('id')
            .from('users')
            .where({
                name
            });

        const id = ids[0].id;

        const validate = authmid.login(id, password, pwd.password);

        return response.status(200).json(validate);
    }

    // Responsável pela criação do usuário => register
    async create(request: Request, response: Response) {

        const authmid = new AuthMid();
        const dataHeader = request.headers.authorization;

        const decrypt = authmid.decrypt(dataHeader as string, 'Basic');

        if(decrypt.error) {
            return response.status(decrypt.status).send({error: decrypt.error});
        }
        if(!decrypt.datas) {
            return response.status(decrypt.status).send({error: "no datas provided"});
        }

        const name = decrypt.datas[0];
        const password = decrypt.datas[1];

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password as string, salt);

        const trx = await db.transaction();

        try {
            
            const insertedUsersIds = await trx('users').insert({
                name: name,
                password: hash
            });

            const id_user = insertedUsersIds[0];

            await trx('carts').insert({
                id_user
            })

            await trx.commit();

            response.status(201).json({
                success: true,
                msg: 'Created with success'
            })

        } catch(err) {
            return response.status(400).json({
                success: false,
                msg: 'Unexpected error while creating new user'
            })
        }
    }
} 