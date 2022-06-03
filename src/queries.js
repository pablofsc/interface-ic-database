import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const perform = async (operation) => {
    return new Promise((resolve, reject) => {
        pool.query(operation)
            .then(res => {
                resolve(res.rows);
            })
            .catch(err => {
                console.error(`Error executing query with operation ${operation}`, err.stack);
                reject(err);
            });
    });
};

const putSingleQuotesAround = text => text ? "'" + text + "'" : false;

export const retrieveEntireTable = async () => {
    return perform(`
        SELECT * FROM public."Operadoras"
        ORDER BY "Registro ANS" ASC 
    `);
};

export const retrieveSpecific = async (registrationNumber) => {
    return perform(`
        SELECT * FROM public."Operadoras"
        WHERE "Registro ANS" = ${registrationNumber};
    `);
};

export const restoreFromBackup = async () => {
    await perform(`
        DELETE FROM public."Operadoras"
        WHERE "Registro ANS" > 0;
    `);

    return perform(`
        INSERT INTO public."Operadoras"
        SELECT * FROM public."Backup"
    `);
};

export const deleteSpecific = async (registrationNumber) => {
    return perform(`
        DELETE FROM public."Operadoras"
        WHERE "Registro ANS" = ${registrationNumber};
    `);
};

export const update = async (parametersArray) => {
    const originalRegistrationNumber = parametersArray[0];
    const newData = parametersArray[1];

    return perform(`
        UPDATE public."Operadoras"
        SET "Registro ANS" = ${newData['Registro ANS'] || '"Registro ANS"'}, 
            "CNPJ" = ${newData['CNPJ'] || '"CNPJ"'}, 
            "Razao Social" = ${putSingleQuotesAround(newData['Razao Social']) || '"Razao Social"'}, 
            "Nome Fantasia" = ${putSingleQuotesAround(newData['Nome Fantasia']) || '"Nome Fantasia"'}, 
            "Modalidade" = ${putSingleQuotesAround(newData['Modalidade']) || '"Modalidade"'}, 
            "Logradouro" = ${putSingleQuotesAround(newData['Logradouro']) || '"Logradouro"'}, 
            "Numero" = ${putSingleQuotesAround(newData['Numero']) || '"Numero"'}, 
            "Complemento" = ${putSingleQuotesAround(newData['Complemento']) || '"Complemento"'}, 
            "Bairro" = ${putSingleQuotesAround(newData['Bairro']) || '"Bairro"'}, 
            "Cidade" = ${putSingleQuotesAround(newData['Cidade']) || '"Cidade"'}, 
            "UF" = ${putSingleQuotesAround(newData['UF']) || '"UF"'}, 
            "CEP" = ${newData['CEP'] || '"CEP"'}, 
            "DDD" = ${newData['DDD'] || '"DDD"'}, 
            "Telefone" = ${putSingleQuotesAround(newData['Telefone']) || '"Telefone"'}, 
            "Fax" = ${newData['Fax'] || '"Fax"'}, 
            "Endereco eletronico" = ${putSingleQuotesAround(newData['Endereco eletronico']) || '"Endereco eletronico"'}, 
            "Representante" = ${putSingleQuotesAround(newData['Representante']) || '"Representante"'}, 
            "Cargo Representante" = ${putSingleQuotesAround(newData['Cargo Representante']) || '"Cargo Representante"'}, 
            "Data Registro ANS" = ${putSingleQuotesAround(newData['Data Registro ANS']) || '"Data Registro ANS"'}
        WHERE "Registro ANS" = ${originalRegistrationNumber};
    `);
};

export const insert = async (parameters) => {
    return perform(`
        INSERT INTO public."Operadoras"(
            "Registro ANS", 
            "CNPJ", 
            "Razao Social", 
            "Nome Fantasia", 
            "Modalidade", 
            "Logradouro", 
            "Numero", 
            "Complemento", 
            "Bairro", 
            "Cidade", 
            "UF", 
            "CEP", 
            "DDD", 
            "Telefone", 
            "Fax", 
            "Endereco eletronico", 
            "Representante", 
            "Cargo Representante", 
            "Data Registro ANS"
        )
        VALUES (
            ${parameters['Registro ANS'] || 'NULL'}, 
            ${parameters['CNPJ'] || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Razao Social']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Nome Fantasia']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Modalidade']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Logradouro']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Numero']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Complemento']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Bairro']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Cidade']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['UF']) || 'NULL'}, 
            ${parameters['CEP'] || 'NULL'}, 
            ${parameters['DDD'] || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Telefone']) || 'NULL'}, 
            ${parameters['Fax'] || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Endereco eletronico']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Representante']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Cargo Representante']) || 'NULL'}, 
            ${putSingleQuotesAround(parameters['Data Registro ANS']) || 'NULL'}
        );
    `);
};