import pg from 'pg';
import 'dotenv/config';

const client = new pg.Client(process.env.PGURL);
await client.connect()

export default client; 