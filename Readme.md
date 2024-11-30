# 🎬 IMDb & TMDb Real-Time Movie and TV-Series Data API

This project leverages **Cloudflare Workers** to provide a lightweight API for fetching detailed metadata about movies and TV series. It combines data scraped from IMDb with enriched details fetched from [The Movie Database (TMDb)](https://www.themoviedb.org/) API.

---

## 🚀 Features

- **Real-Time IMDb Data Scraping**  
  Extracts key metadata like:
  - Aggregate Ratings
  - Genres, Keywords, Duration
  - Directors, Creators, Actors
  - Poster Images

- **TMDb Integration**  
  Adds detailed overviews for movies and TV series using TMDb's API.

- **High Performance**  
  Powered by Cloudflare Workers for low-latency and scalable API responses.

- **Simple API Endpoint**  
  Fetch structured JSON data by providing an IMDb ID.

---

## 📡 Live Demo

Try out the live API:  
👉 **[API Endpoint](https://my-first-worker.yuvrajkumar120120018809.workers.dev/?id=tt12844910)**

### Sample Request:
```bash
GET https://my-first-worker.yuvrajkumar120120018809.workers.dev/?id=tt12844910
```

### Sample Response:
```json
{
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingCount": 159054,
    "bestRating": 10,
    "worstRating": 1,
    "ratingValue": 5.8
  },
  "image": "https://m.media-amazon.com/images/M/MV5BNDdkNTY1MDQtY2I5MC00OTFlLTg5OWQtZWE2YzE5NWFiMDgzXkEyXkFqcGc@._V1_.jpg",
  "genre": ["Action", "Adventure", "Thriller"],
  "keywords": "fight in a train,fight atop a moving train,underwater scene,yrf spy universe,undercover cop",
  "duration": "PT2H26M",
  "director": [
    {
      "@type": "Person",
      "url": "https://www.imdb.com/name/nm1893457/",
      "name": "Siddharth Anand"
    }
  ],
  "creator": [
    {
      "@type": "Organization",
      "url": "https://www.imdb.com/company/co0077190/"
    },
    {
      "@type": "Person",
      "url": "https://www.imdb.com/name/nm1356270/",
      "name": "Shridhar Raghavan"
    },
    {
      "@type": "Person",
      "url": "https://www.imdb.com/name/nm1063072/",
      "name": "Abbas Tyrewala"
    },
    {
      "@type": "Person",
      "url": "https://www.imdb.com/name/nm1893457/",
      "name": "Siddharth Anand"
    }
  ],
  "actor": [
    {
      "@type": "Person",
      "url": "https://www.imdb.com/name/nm0451321/",
      "name": "Shah Rukh Khan"
    },
    {
      "@type": "Person",
      "url": "https://www.imdb.com/name/nm2138653/",
      "name": "Deepika Padukone"
    },
    {
      "@type": "Person",
      "url": "https://www.imdb.com/name/nm1303433/",
      "name": "John Abraham"
    }
  ],
  "overview": "A soldier caught by enemies and presumed dead comes back to complete his mission, accompanied by old companions and foes."
}
```

---

## 🛠️ Installation & Setup

Follow these steps to deploy this project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Set up your TMDb API Key**:
   - Replace `JSON_WEB_TOKEN` in the `fetchTMDBData` function with your TMDb Bearer Token.

3. **Deploy using Cloudflare Wrangler**:
   - Install Wrangler:  
     ```bash
     npm install -g wrangler
     ```
   - Login to Cloudflare:  
     ```bash
     wrangler login
     ```
   - Publish the Worker:  
     ```bash
     wrangler publish
     ```

---

## 🧑‍💻 How It Works

1. **Scrapes IMDb Data**  
   The Worker fetches IMDb HTML content and extracts key metadata using regex and JSON parsing.

2. **Fetches TMDb Data**  
   Uses TMDb's API to retrieve movie/TV show overviews for additional information.

3. **Combines Results**  
   The scraped IMDb data and TMDb overview are merged into a single JSON response.

---

## 🤔 Use Cases

- Fetching detailed metadata about movies and TV series for apps or websites.
- Powering entertainment recommendation systems with real-time data.
- Research or data collection on IMDb and TMDb metadata.

---

## ⚡ Technologies Used

- **Cloudflare Workers**  
  Serverless platform for scalable and low-latency execution.

- **IMDb**  
  Scraped to retrieve movie and TV-series metadata.

- **TMDb API**  
  Provides detailed descriptions, ratings, and additional metadata.

---

## 📄 License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgments

- **Cloudflare Workers** for providing a powerful serverless platform.  
- **IMDb** for being a rich source of entertainment metadata.  
- **TMDb API** for offering a comprehensive database of movies and TV series.
