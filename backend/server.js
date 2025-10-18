import { prisma, testPrismaConnection } from './db.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---

app.get('/', (req, res) => {
  res.send('Welcome to the Reel Rover API (Prisma Ready)');
});

app.get('/reels', async (req, res) => {
  try {
    res.status(501).json({ error: 'Route not implemented yet. Focus on /api/auth/...' });
  } catch (err) {
    console.error('Error fetching reels:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const startServer = async () => {
    try {
        console.log('Attempting to connect to Supabase via Prisma...');

        await testPrismaConnection();
        app.listen(port, () => {
            console.log(`Server is now running on port ${port}`);
            console.log(`Open http://localhost:${port} in your browser.`);
        });

    } catch (err) {
        console.error('❌ FATAL ERROR: Server failed to start due to database connection issue.', err.message);
        process.exit(1); 
    }
};

startServer();