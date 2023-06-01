import Snoowrap, { CommentStreamItem } from 'snoowrap';

// Initialize the Reddit client
const reddit = new Snoowrap({
  userAgent: 'YOUR_USERAGENT',
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  username: 'YOUR_REDDIT_USERNAME',
  password: 'YOUR_REDDIT_PASSWORD',
});

// Quotes
const ataturkQuotes = [
  "The truest mentor in life is science.",
  "A nation devoid of art and artists cannot have a full existence.",
  "Everything we see in the world is the creative work of women.",
  "Peace at home, peace in the world.",
  "Sovereignty unconditionally belongs to the nation.",
  "Heroes who shed their blood and lost their lives! You are now lying in the soil of a friendly country. Therefore, rest in peace. There is no difference between the Johnnies and the Mehmets to us where they lie side by side here in this country of ours. You, the mothers who sent their sons from faraway countries, wipe away your tears; your sons are now lying in our bosom and are in peace. After having lost their lives on this land they have become our sons as well.",
  "The future is in the skies.",
  "Victory is for those who can say 'Victory is mine'. Success is for those who can begin saying 'I will succeed' and say 'I have succeeded' in the end.",
  "A good teacher is like a candle - it consumes itself to light the way for others.",
  // More here:
];

const ataturkPhotos = [
  "https://api.emirkabal.com/v1/ataturk",
];

// Cooldown period in milliseconds
const cooldownPeriod = 200000;

// Time of the last response
let lastResponseTime = 0;

// Process comments on Reddit posts
function processComments(comments: CommentStreamItem[]) {
  comments.forEach(comment => {
    const body = comment.body.toLowerCase();

    // Check if the comment contains "ataturk"
    if (body.includes('ataturk')) {
      const currentTime = Date.now();

      // Check if the cooldown period has passed
      if (currentTime - lastResponseTime >= cooldownPeriod) {
        // Select a random quote and photo
        const randomQuote = ataturkQuotes[Math.floor(Math.random() * ataturkQuotes.length)];
        const randomPhoto = ataturkPhotos[Math.floor(Math.random() * ataturkPhotos.length)];

        comment.reply(`Here's a random quote from Mustafa Kemal Ataturk:\n\n"${randomQuote}"\n\nRandom Ataturk Photo: ${randomPhoto}`);

        lastResponseTime = currentTime;
      }
    }
  });
}

async function startBot() {
  const subreddit = await reddit.getSubreddit('YOUR_SUBREDDIT');
  subreddit.stream.comments().on('comment', processComments);
}

// Start the bot
startBot();
