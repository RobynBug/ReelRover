import { query, testConnection } from './db.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

// --- API Routes ---

app.get('/', (req, res) => {
  res.send('Welcome to the Reel Rover API');
});


app.get('/reels', async (req, res) => {
  try {
    const reels = await query('SELECT * FROM reels'); 
    res.json(reels);
  } catch (err) {
    console.error('Error fetching reels:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const startServer = async () => {
    try {
        console.log('Attempting to connect to Supabase...');
        await testConnection();

        // Start server listener only if DB is successful
        app.listen(port, () => {
            console.log(`✅ Server is now running on port ${port}`);
        });

    } catch (err) {
        console.error('FATAL ERROR: Server failed to start due to database connection issue.', err.message);
        process.exit(1); 
    }
};


startServer();