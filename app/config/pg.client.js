import pg from 'pg';

const client = new pg.client(process.env.PGURL);
await client.connect();

export default client; 