// import pg from 'pg';

// const client = new pg.Client(`${process.env.PGURL}`);
// await client.connect();

// export default client; 

import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'pierrofeu',
  password: process.env.DB_PASSWORD || 'omydog',
  database: process.env.DB_NAME || 'omydog',
});

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));


  export default client; 