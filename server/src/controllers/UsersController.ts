import { Request, Response } from 'express';
import db from '../database/connection';
import AuthMid from '../middleware/auth';

import bcrypt from 'bcryptjs';

export default class UsersController {

    //Responsável pela Log in
    async index(request: Request, response: Response) {

        const authmid = new AuthMid();
        const dataHeader = request.headers.authorization;
        
        const decrypt = authmid.decrypt(dataHeader as string)!;

        console.log(decrypt);

        if(decrypt.status === 401) {
            return response.status(decrypt.status).send({error: decrypt.error});
        }

        const pwds = await db.select('password')
            .from('users')
            .where({
                name: decrypt.name
            });

        if(pwds.length === 0) {
            return response.send("Usuário ou senha inválido");
        }

        const pwd = pwds[0];

        const ids = await db.select('id')
            .from('users')
            .where({
                name: decrypt.name
            });

        const id = ids[0];

        const validate = authmid.login(id, decrypt.password as string, pwd.password);

        return response.json(validate);
    }

    // Responsável pela criação do usuário => register
    async create(request: Request, response: Response) {

        const authmid = new AuthMid();
        const dataHeader = request.headers.authorization;

        const decrypt = authmid.decrypt(dataHeader as string);

        if(decrypt.status === 401) {
            return response.status(decrypt.status).send({error: decrypt.error});
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(decrypt.password as string, salt);

        const trx = await db.transaction();

        try {
            
            await trx('users').insert({
                name: decrypt.name,
                password: hash
            });

            await trx.commit();

            response.status(201).json({
                success: 'Created with success'
            })

        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new user'
            })
        }
    }
} 