const https = require('https');
const fs = require('fs');

const actors = [
  "Allu Arjun", "Mahesh Babu", "Prabhas", "Ram Charan", "Jr NTR", "Pawan Kalyan", "Nani", "Vijay Deverakonda",
  "Shah Rukh Khan", "Salman Khan", "Hrithik Roshan", "Ranbir Kapoor", "Ranveer Singh", "Aamir Khan",
  "Vijay", "Ajith Kumar", "Rajinikanth", "Suriya", "Kamal Haasan", "Dhanush",
  "Yash", "Puneeth Rajkumar", "Sudeep", "Darshan", "Rakshit Shetty",
  "Mohanlal", "Mammootty", "Fahadh Faasil", "Dulquer Salmaan", "Prithviraj",
  "Tom Cruise", "Leonardo DiCaprio", "Brad Pitt", "Robert Downey Jr", "Chris Hemsworth", "Keanu Reeves"
];

const fetchImage = (name) => {
  return new Promise((resolve) => {
    // We search for songs and take the first artworkUrl100 and replace with larger
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=song&limit=1`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0 && json.results[0].artworkUrl100) {
            resolve({ name, url: json.results[0].artworkUrl100.replace('100x100bb', '400x400bb') });
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
