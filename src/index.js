import * as cheerio from "cheerio";

async function scrapeIMDb(imdbId) {
	try {
	  const response = await fetch(`https://www.imdb.com/title/${imdbId}`);
  
	  if (!response.ok) {
		throw new Error("Failed to fetch data");
	  }
  
	  const html = await response.text();
  
	  // Extract JSON data from the <script type="application/ld+json"> tag
	  const ldJsonRegex = /<script type="application\/ld\+json">(.*?)<\/script>/s;
	  const ldJsonMatch = html.match(ldJsonRegex);
  
	  if (!ldJsonMatch) {
		throw new Error("No JSON content found in application/ld+json");
	  }
  
	  const jsonData = JSON.parse(ldJsonMatch[1]);
  
	  // Extract specific data fields
	  const extractedData = {
		aggregateRating: jsonData.aggregateRating ? jsonData.aggregateRating : null,
		image: jsonData.image ? jsonData.image : null,
		genre: jsonData.genre ? jsonData.genre : null,
		keywords: jsonData.keywords ? jsonData.keywords : null,
		duration: jsonData.duration ? jsonData.duration : null,
		director: jsonData.director ? jsonData.director : null,
		creator: jsonData.creator ? jsonData.creator : null,
		actor: jsonData.actor ? jsonData.actor : null
	  };
  
	  // Fetch data from TMDB
	  const tmdbData = await fetchTMDBData(imdbId);
  
	  // Append the TMDB data to the extracted data
	//   extractedData.tmdb = tmdbData;
	  extractedData.overview = tmdbData;
  
	  // Return the combined result
	  return extractedData;
  
	} catch (error) {
	  console.error("Error:", error.message);
	  return { error: error.message }; // Return error message in response
	}
  }
  
  async function fetchTMDBData(imdbId) {
	const tmdbUrl = `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&language=en`;
  
	const options = {
	  method: 'GET',
	  headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTUwYTE0MzRjYjdlNTgxZmM2MDE5ZTEzMzJhMGM5NiIsIm5iZiI6MTY2MjM2MzI0Mi40NDEsInN1YiI6IjYzMTVhNjZhNTUwN2U5MDA3YWMxN2M5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nfy_fQ4MdvcpkaPJf1-dD_cYD09cgdWWgFmA_WcueAY',
	  }
	};
  
	try {
	  const response = await fetch(tmdbUrl, options);
	  const data = await response.json();
  
	  if (data.movie_results.length !== 0) {
		const movieUrl = `https://api.themoviedb.org/3/movie/${data.movie_results[0]?.id}?language=en-US`;
		const movieResponse = await fetch(movieUrl, options);
		const movieData = await movieResponse.json();
		return movieData.overview;  // This is the `dataRes` you're referring to
	  }else if(data.tv_results.length !== 0){
		const tvUrl = `https://api.themoviedb.org/3/tv/${data.tv_results[0]?.id}?language=en-US`;
		const tvResponse = await fetch(tvUrl, options);
		const tvData = await tvResponse.json();
		return tvData.overview;  
	  }else {
		throw new Error('No movie or tv-series found for IMDb ID');
	  }
	} catch (error) {
	  console.error('Error fetching TMDB data:', error);
	  return { error: 'Failed to fetch TMDB data' };
	}
  }
  

export default {
	async fetch(request) {
		const url = new URL(request.url);
		const imdbId = url.searchParams.get("id");

		if (!imdbId) {
			return new Response(JSON.stringify({ error: "Missing IMDb ID" }), {
				headers: { "Content-Type": "application/json" },
				status: 400,
			});
		}

		const data = await scrapeIMDb(imdbId);
		return new Response(JSON.stringify(data), {
			headers: { "Content-Type": "application/json" },
		});
	},
};