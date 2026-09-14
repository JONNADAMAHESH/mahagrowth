const { MongoClient } = require('mongodb');
require('dotenv').config();

async function test() {
  const uri = process.env.DATABASE_URL;
  console.log('Testing connection to:', uri.replace(/:([^:@]{3,})@/, ':***@'));
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('valence');
    const count = await db.collection('users').countDocuments();
    console.log('Users count:', count);
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
  }
}

test();
