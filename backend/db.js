import { Client, Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool({
 PCG_DATABASE_URL: process.env.DATABASE_URL,
 max: 20,
 idleTimeoutMillis: 30000,
 connectionTimeoutMillis: 2000,
 
});

const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  } 
};

const testConnection = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connection successful');
}   catch (err) {
    console.error('Database connection error:', err);
    throw err;
}
};

export { pool, query, testConnection };

