import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export const retrieveEntireTable = async () => {
    return new Promise((resolve, reject) => {
        pool.query(`
            SELECT * FROM public."Operadoras"
            ORDER BY "Registro ANS" ASC 
        `)
            .then(res => {
                resolve(res.rows);
            })
            .catch(err => {
                console.error('Error executing query', err.stack);
                reject(err);
            });
    });
};