import bcrypt from 'bcryptjs';
import dotenvsafe from 'dotenv-safe';
import jwt from 'jsonwebtoken';

export default class AuthMid {

    decrypt(dataHeader: string) {
        dotenvsafe.config();

        if(!dataHeader) {
            return {
                status: 401,
                error: 'No value provided!'
            }
        }

        const parts = dataHeader.split(' ');

        if(parts.length < 2) {
            return {
                status: 401,
                error: 'Lenght incorrectly'
            }
        }

        const bufferOBJ = Buffer.from(parts[1], 'base64');

        const datas = Buffer.from(bufferOBJ).toString('utf-8').split(process.env.SEPARATOR!.toString());

        const name = datas[0];
        const password = datas[1];

        // JSON.parse(`{"name": ${name}, "password": ${password}}`));

        return {
            status: 500,
            name: name,
            password: password
        }
    }

    login(id: string, passwordReq: string, passwordDB: string) {
        dotenvsafe.config();

        const isValidated = bcrypt.compareSync(passwordReq, passwordDB);

        if(isValidated) {
            const token = jwt.sign({ id }, process.env.SECRET as string , {
                expiresIn: 1200//20 Minutes
            })
            return {auth: true, token};
        }
        else {
            return {auth: false, token: null};
        }
    }

    authentication() {}

    validation() {}
}