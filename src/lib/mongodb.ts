import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "";
const client: any = new MongoClient(uri);

let clientPromise: any;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (!clientPromise) {
    clientPromise = client.connect();
}

export const db = client.db(process.env.DATABASE);
