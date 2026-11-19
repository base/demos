import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    // @ts-ignore
    (global as any)._mongoClientPromise = client.connect();
  }
  // @ts-ignore
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise; 