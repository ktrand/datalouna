import * as fs from 'fs';
import * as path from 'path';
import DbClient from "./dbClient";

const seedDatabase = async () => {
    const client = DbClient.getInstance();

    try {
        await client.connect();
        console.log('Connected to the database.');

        const seedPath = path.join(__dirname, 'seed.sql');
        const query = fs.readFileSync(seedPath, 'utf-8');

        await client.query(query);
        console.log('Database seeded successfully.');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
};

seedDatabase();
