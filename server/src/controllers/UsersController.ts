import { Request, Response } from 'express';
import db from '../database/connection';
import bcrypt from 'bcryptjs';
import dotenvsafe from 'dotenv-safe';
import jwt from 'jsonwebtoken';


export default class UsersController {

    //Responsável pela Log in
    async index(request: Request, response: Response) {
        
        const authHeader = request.headers.authorization;

        if(!authHeader) {
            return response.status(401).send({err: 'No value provided'});
        }

        const parts = authHeader.split(' ');

        if(parts.length < 2) {
            return response.status(401).send({err: 'Length incorrectly'})
        }

        const bufferOBJ = Buffer.from(parts[1], 'base64');

        const datas = Buffer.from(bufferOBJ).toString('utf-8').split(' ');

        const name = datas[0];
        const password = datas[1];

        dotenvsafe.config();

        const pwds = await db.select('password')
            .from('users')
            .where({
                name
            });

        const pwd = pwds[0];

        const ids = await db.select('id')
            .from('users')
            .where({
                name
            });

        const id = ids[0];

        const isValidated = bcrypt.compareSync(password, pwd.password);

        if(isValidated) {
            const token = jwt.sign({ id }, process.env.SECRET as string , {
                expiresIn: 300//5 Minutes
            })
            return response.json({auth: true, token});
        }
        else {
            return response.json({auth: false, token: null})
        }
    }

    async validate(request: Request, response: Response) {
        
    }

    //Responsável pela criação do usuário => register
    async create(request: Request, response: Response) {
        const {
            name,
            password
        } = request.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


        const trx = await db.transaction();

        try {
            
            await trx('users').insert({
                name, 
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