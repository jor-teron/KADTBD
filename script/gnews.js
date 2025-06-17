// Replace with your GNews API key
const apiKey = '4177e9f4b2e65b5409adc26ad5cc7f90';
const cacheKey = 'gnews_headlines';
const cacheExpiry = 60 * 60 * 1000; // 1 hour in milliseconds

const urls = [
    // National (India, focus on general news)
    `https://gnews.io/api/v4/top-headlines?lang=en&country=in&category=general&max=5&q=-entertainment -sports&token=${apiKey}`,
    `https://gnews.io/api/v4/top-headlines?lang=en&country=in&category=general&max=5&token=${apiKey}`,
    // World (focus on global news)
    `https://gnews.io/api/v4/top-headlines?lang=en&category=world&max=5&q=-entertainment -sports&token=${apiKey}`,
    `https://gnews.io/api/v4/top-headlines?lang=en&category=world&max=5&token=${apiKey}`,
    // State (Assam)
    `https://gnews.io/api/v4/search?lang=en&country=in&max=3&q=Assam&token=${apiKey}`,
    // District/Town (Assam districts/towns)
    `https://gnews.io/api/v4/search?lang=en&country=in&max=2&q=Diphu&token=${apiKey}`
];

let articles = [];
let currentIndex = 0;

async function fetchHeadlines() {
    // Check cache first
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheExpiry) {
            articles = data;
            if (articles.length > 0) {
                console.log('Using cached headlines:', articles.length);
                displayHeadline();
                startRotation();
                return;
            }
        }
    }

    try {
        // Fetch each URL individually to handle failures gracefully
        const responses = await Promise.allSettled(urls.map(async (url, index) => {
            const response = await fetch(url);
            if (!response.ok) {
                const error = new Error(`API call ${index + 1} failed: ${response.status} ${response.statusText}`);
                error.status = response.status;
                throw error;
            }
            return response.json();
        }));

        // Process results, logging errors for failed calls
        const allArticles = [];
        responses.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                const articles = result.value.articles || [];
                console.log(`API call ${index + 1} (${urls[index].split('?')[0]}) returned ${articles.length} articles`);
                allArticles.push(...articles);
            } else {
                console.error(`API call ${index + 1} (${urls[index].split('?')[0]}) failed: ${result.reason.message}`);
            }
        });

        // Deduplicate articles by URL
        const uniqueArticles = [];
        const seenUrls = new Set();
        for (const article of allArticles) {
            if (!seenUrls.has(article.url)) {
                seenUrls.add(article.url);
                uniqueArticles.push(article);
            }
        }
        articles = uniqueArticles;

        // Cache results
        if (articles.length > 0) {
            localStorage.setItem(cacheKey, JSON.stringify({
                data: articles,
                timestamp: Date.now()
            }));
        }

        if (articles.length === 0) {
            document.getElementById('news').innerHTML = '<p>No headlines found.</p>';
            console.warn('No articles retrieved from any API call.');
            return;
        }
        displayHeadline();
        startRotation();
    } catch (error) {
        document.getElementById('news').innerHTML = `<p>Error: ${error.message}</p>`;
        console.error('Fetch error:', error);
    }
}

function displayHeadline() {
    const newsDiv = document.getElementById('news');
    if (!newsDiv) {
        console.error('No element with id="news" found in the HTML.');
        return;
    }
    if (articles.length === 0) {
        newsDiv.innerHTML = '<p>No headlines found.</p>';
        return;
    }
    const article = articles[currentIndex];
    newsDiv.innerHTML = `
        <div class="article">
            <div id="news-headline" style="font-weight:888;"><a href="${article.url}" target="_blank">${article.title}</a></div>
<!--            <p>${article.description || 'No description available.'}</p> -->
            <p><br><small>Source: ${article.source.name} | Published: ${new Date(article.publishedAt).toLocaleDateString()}</small></p>
        </div>
    `;
}

function startRotation() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % articles.length; // Loop back to 0
        displayHeadline();
    }, 10000); // Rotate every 5 seconds
}

// Fetch headlines on script load
fetchHeadlines();
