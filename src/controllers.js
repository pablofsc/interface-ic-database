import * as db from './queries.js';

export const index = (req, res) => res.send('<h1>Seems to be working.</h1>');

export const getTable = (req, res) => {
    console.log("Received request for the entire table...");
    const query = db.retrieveEntireTable();

    query
        .then(answer => {
            res.status(200).send(JSON.stringify(answer));
            console.log("Responded with entire table.");
        })
        .catch(error => {
            res.status(500).send(JSON.stringify({ 'status': 'error' }));
            console.log(error);
        });
};