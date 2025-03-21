import * as fs from 'fs';
import * as path from 'path';
import DbClient from "./dbClient";

const runMigrations = async () => {
    try {
        const client = DbClient.getInstance();
        const schemaPath = path.join(__dirname, 'dropTables.sql');
        const query = fs.readFileSync(schemaPath, 'utf-8');

        await client.connect();
        console.log('Connected to the database.');

        await client.query(query);
        console.log('Tables dropped successfully.');
    } catch (err) {
        console.error('Error droping tables:', err);
    }
};

runMigrations();
