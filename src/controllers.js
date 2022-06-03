import * as db from './queries.js';

const perform = async (response, operation, options) => {
    operation(options)
        .then(result => {
            response.status(200).send(JSON.stringify(result));
            console.log("Success.");
        })
        .catch(error => {
            response.status(500).send(JSON.stringify({ 'status': 'error' }));
            console.log(error);
        });
};

const validateReferenceToExistingEntry = async (response, data) => {
    if (!data['registrationNumber']) {
        console.log("Client specified no identifier. Refused.");
        response.status(400).send(JSON.stringify({ 'reason': 'No ANS registration number provided' }));
        return false;
    }

    const item = await db.retrieveSpecific(data['registrationNumber']);

    if (item.length === 0) {
        console.log("Client specified identifier that does not exist. Refused.");
        response.status(400).send(JSON.stringify({ 'reason': 'ANS registration number provided does not exist in database' }));
        return false;
    }

    return true;
};

export const index = (req, res) => res.send('<h1>Seems to be working.</h1>');

export const getTable = (req, res) => {
    console.log("Received request for the entire table...");
    perform(res, db.retrieveEntireTable);
};

export const restoreTable = (req, res) => {
    console.log("Received request to restore table from backup...");
    perform(res, db.restoreFromBackup);
};

export const deleteEntry = async (req, res) => {
    console.log("Received request to delete specific entry from table...");

    if (await validateReferenceToExistingEntry(res, req.body)) {
        perform(res, db.deleteSpecific, req.body['registrationNumber']);
    }
};

export const updateEntry = async (req, res) => {
    console.log("Received request to update specific entry in table...");

    if (await validateReferenceToExistingEntry(res, req.body)) {
        perform(res, db.update, [req.body['registrationNumber'], req.body]);
    }
};

export const insertEntry = async (req, res) => {
    console.log("Received request to insert new entry in table...");

    perform(res, db.insert, req.body);
};