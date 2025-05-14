import dotenv from 'dotenv';
import { env } from 'process';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

dotenv.config({});

export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        expiresIn: process.env.EXPIRES_IN,
        refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN ,
    }

}