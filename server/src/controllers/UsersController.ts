import { Request, Response } from 'express';
import db from '../database/connection';
import AuthMid from '../middleware/auth';

import bcrypt from 'bcryptjs';

export default class UsersController {

    async index(request: Request, response: Response) {
        
        const authmid = new AuthMid();
        const dataHeader = request.headers.authorization;

        console.log(dataHeader);

        const decrypt = authmid.decrypt(dataHeader as string, 'Bearer');

        console.log(decrypt);

        if(decrypt.status === 401) {
            return response.status(decrypt.status).send({error: decrypt.error});
        }
        if(!decrypt.datas) {
            return response.status(decrypt.status).send({error: "No datas provided"});
        }

        const payload = authmid.validation(String(decrypt.datas));

        console.log(payload);

        if(payload.expired) {
            return response.status(200).send({auth: false, session: 'Token is expired!'});
        }

        return response.status(201).send({auth: true});
    }

    //Responsável pela Log in
    async login(request: Request, response: Response) {

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
            return response.send({auth: false, msg: "Usuário ou senha inválido"});
        }

        const pwd = pwds[0];

        const ids = await db.select('id')
            .from('users')
            .where({
                name
            });

        const id = ids[0].id;

        const cart_ids = await db.select('id')
            .from('carts')
            .where({
                id_user: id
            })

        const cart_id = cart_ids[0].id;

        const validate = authmid.login(id, cart_id, password, pwd.password);
        
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
        const email = decrypt.datas[2];

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password as string, salt);

        const trx = await db.transaction();

        try {
            
            const insertedUsersIds = await trx('users').insert({
                name,
                password: hash,
                email
            });

            const id_user = insertedUsersIds[0];

            const insertedCartsIds = await trx('carts').insert({
                id_user,
                total: 0
            })

            const id_cart = insertedCartsIds[0];

            await trx.commit();

            const validate = authmid.login(id_user.toString(), id_cart.toString(), password, hash);

            response.status(201).json({
                auth: validate.auth,
                token: validate.token,
                redirectForLogin: false,
                msg: 'Created with success'
            })

        } catch(err) {

            await trx.rollback();

            return response.status(400).json({
                auth: false,
                redirectForLogin: true,
                msg: 'Unexpected error while creating new user'
            })
        }
    }
} 