const fs = require('fs');
let code = fs.readFileSync('server/db/database.ts', 'utf-8');

code = code.replace(/public async init\(\) {([\s\S]*?)  }/, `public async init() {
    try {
      if (!process.env.DATABASE_URL) {
        console.warn('[ValenceDatabase] DATABASE_URL is not set in .env!');
        return;
      }
      this.client = new MongoClient(process.env.DATABASE_URL, {
        tls: true,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
      await this.client.connect();
      this.db = this.client.db('valence');
      console.log('[ValenceDatabase] Successfully connected to MongoDB cluster.');

      await this.seedDefaultData();
      this.isInitialized = true;
    } catch (err) {
      console.error('[ValenceDatabase] Database connection error:', err.message);
      this.client = null;
      this.db = null;
    }
  }`);

fs.writeFileSync('server/db/database.ts', code);
