import pg from 'pg';
import 'dotenv/config';

let client; 

if (process.env.NODE_ENV === 'development') {
    console.log("connexion en local");
    client = new pg.Client(process.env.PGURL_DEV)
} else if (process.env.NODE_ENV === 'production') {
    console.log("connexion à la bdd en ligne");
    console.log(process.env.PGURL_PROD);
    client = new pg.Client({
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        port: process.env.PGPORT,
        password: process.env.PGPASSWORD,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

await client.connect()

export default client;
