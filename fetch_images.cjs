const https = require('https');
const fs = require('fs');

const actors = [
  "Allu Arjun", "Mahesh Babu", "Prabhas", "Ram Charan", "N. T. Rama Rao Jr.", "Pawan Kalyan", "Nani (actor)", "Vijay Deverakonda",
  "Shah Rukh Khan", "Salman Khan", "Hrithik Roshan", "Ranbir Kapoor", "Ranveer Singh", "Aamir Khan",
  "Vijay (actor)", "Ajith Kumar", "Rajinikanth", "Suriya", "Kamal Haasan", "Dhanush",
  "Yash (actor)", "Puneeth Rajkumar", "Sudeepa", "Darshan (actor)", "Rakshit Shetty",
  "Mohanlal", "Mammootty", "Fahadh Faasil", "Dulquer Salmaan", "Prithviraj Sukumaran",
  "Tom Cruise", "Leonardo DiCaprio", "Brad Pitt", "Robert Downey Jr.", "Chris Hemsworth", "Keanu Reeves"
];

const fetchImage = (name) => {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=500`;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail) {
            resolve({ name, url: pages[pageId].thumbnail.source });
          } else {
            resolve({ name, url: null });
          }
        } catch (e) {
          resolve({ name, url: null });
        }
      });
    }).on('error', () => resolve({ name, url: null }));
  });
};

async function main() {
  const results = {};
  for (const actor of actors) {
    const res = await fetchImage(actor);
    results[actor] = res.url;
    console.log(`Fetched: ${actor} -> ${res.url ? 'SUCCESS' : 'FAIL'}`);
  }
  fs.writeFileSync('actor_images.json', JSON.stringify(results, null, 2));
}

main();
