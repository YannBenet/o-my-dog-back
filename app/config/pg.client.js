import pg from 'pg';
import 'dotenv/config';

let client; 

if (process.env.NODE_ENV === 'development') {
    console.log("connexion en local");
    client = new pg.Client(process.env.PGURL_DEV)
} else if (process.env.NODE_ENV === 'production') {
    console.log("connexion à la bdd en ligne");
     client = new pg.Client(process.env.PGURL_PROD)
}

await client.connect()

export default client;
