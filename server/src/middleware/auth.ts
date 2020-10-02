import bcrypt from 'bcryptjs';
import dotenvsafe from 'dotenv-safe';
import jwt from 'jsonwebtoken';

interface payloadComponent {
    id: number;
}

interface payloadExpired {
    expired: boolean;
}

export default class AuthMid {

    decrypt(dataHeader: string, typeHeader: string) {
        dotenvsafe.config();

        if(!dataHeader) {
            return {
                status: 401,
                error: 'No value provided!'
            }
        }

        const parts = dataHeader.split(' ');

        if(parts.length !== 2) {
            return {
                status: 401,
                error: 'Token error'
            }
        }

        if(new RegExp('!/^'+ typeHeader +'$/', 'i').test(parts[0])) {
            return {
                status: 401,
                error: 'Token malformatted'
            };
        }

        let datas;

        if(parts[0] === 'Basic') {
            const bufferOBJ = Buffer.from(parts[1], 'base64');
            datas = Buffer.from(bufferOBJ).toString('utf-8').split(process.env.SEPARATOR!.toString());
        }
        if(parts[0] === 'Bearer') {
            datas = parts[1];
        }

        return {
            status: 200,
            datas
        };
    }

    login(id: string, passwordReq: string, passwordDB: string) {
        dotenvsafe.config();

        const isValidated = bcrypt.compareSync(passwordReq, passwordDB);

        if(isValidated) {
            const token = jwt.sign({
                id: id
            }, process.env.SECRET as string , {
                expiresIn: 1200//20 Minutes
            })
            return {auth: true, token};
        }
        else {
            return {auth: false, token: null};
        }
    }

    validation(token: string) {
        dotenvsafe.config();
        const secret = process.env.SECRET!;
        const payload = JSON.parse(this.verify(token, secret));
        return payload;
    }

    verify(token: string, secret: string) {
        return JSON.stringify(jwt.verify(token, secret, (err, decoded) => {
            if(err)
                return <payloadExpired>{expired: true}
            else
                return <payloadComponent>decoded;
        }))
    }
}