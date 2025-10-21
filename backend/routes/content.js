import express from 'express';
import { fetchTMDB } from '../services/tmdbService.js'; 

const contentRouter = express.Router();


 //Endpoint 1: Search Content

contentRouter.get('/search', async (req, res) => {
  // Extract the search query from the URL parameters
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required.' });
  }
  
  try {
    // Construct the TMDB endpoint path for a multi-search (movies, TV, people)
    const endpoint = `/search/multi?query=${encodeURIComponent(query)}`;
    
    // Call the service function with the endpoint
    const results = await fetchTMDB(endpoint);
    
    // Send the results back to the client
    res.json(results);

  } catch (err) {
    // Error handling for issues in the network or TMDB API response
    console.error('Error during content search:', err);
    const errorMessage = err.message.includes('TMDB API request failed') 
                         ? err.message 
                         : 'Failed to fetch content from external API.';
    res.status(500).json({ error: errorMessage });
  }
});

// Endpoint 2: Get Content Details

contentRouter.get('/details/:tmdbId', async (req, res) => {
    // Extract the TMDB ID from the URL path
    const tmdbId = req.params.tmdbId;

    if (isNaN(parseInt(tmdbId))) {
        return res.status(400).json({ error: 'Invalid TMDB ID provided.' });
    }

    try {
        // Construct the TMDB endpoint path to get movie details, appending credits and videos
        const endpoint = `/movie/${tmdbId}?append_to_response=credits,videos`;
        
        // Call the service function with the endpoint
        const details = await fetchTMDB(endpoint);
        
        // Send the details back to the client
        res.json(details);

    } catch (err) {
        console.error('Error fetching details:', err);
        const errorMessage = err.message.includes('TMDB API request failed') 
                         ? err.message 
                         : 'Failed to fetch details from external API.';
        res.status(500).json({ error: errorMessage });
    }
});


export default contentRouter;
