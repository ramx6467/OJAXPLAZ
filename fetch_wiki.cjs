const https = require('https');
const fs = require('fs');

const actors = [
  "Allu Arjun", "Mahesh Babu", "Prabhas", "Ram Charan", "Jr NTR", "Pawan Kalyan", "Nani actor", "Vijay Deverakonda",
  "Shah Rukh Khan", "Salman Khan", "Hrithik Roshan", "Ranbir Kapoor", "Ranveer Singh", "Aamir Khan",
  "Joseph Vijay", "Ajith Kumar", "Rajinikanth", "Suriya actor", "Kamal Haasan", "Dhanush",
  "Yash actor", "Puneeth Rajkumar", "Sudeep", "Darshan actor", "Rakshit Shetty",
  "Mohanlal", "Mammootty", "Fahadh Faasil", "Dulquer Salmaan", "Prithviraj Sukumaran",
  "Tom Cruise", "Leonardo DiCaprio", "Brad Pitt", "Robert Downey Jr", "Chris Hemsworth", "Keanu Reeves"
];

const fetchImage = (name) => {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(name)}&gsrlimit=1&prop=pageimages&format=json&pithumbsize=500`;
    const options = {
      headers: {
        'User-Agent': 'OJAXPLAZMusicApp/1.0 (ram@example.com)'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = json.query.pages;
            const pageId = Object.keys(pages)[0];
            if (pages[pageId].thumbnail) {
              resolve({ name, url: pages[pageId].thumbnail.source });
              return;
            }
          }
          resolve({ name, url: null });
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
    // sleep for 200ms to avoid rate limits
    await new Promise(r => setTimeout(r, 200));
  }
  fs.writeFileSync('actor_images_wiki.json', JSON.stringify(results, null, 2));
}

main();
