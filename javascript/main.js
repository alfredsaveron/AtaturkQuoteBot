const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Reddit API credentials
const reddit = new Snoowrap({
  userAgent: 'YOUR_USERAGENT',
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  username: 'YOUR_REDDIT_USERNAME',
  password: 'YOUR_REDDIT_PASSWORD',
});

// Create a Snoostorm client
const client = new Snoostorm.StreamClient(reddit);

// Configure the bot to listen for comments on Reddit
const streamOpts = {
  subreddit: 'YOUR_SUBREDDIT', // Replace with your desired subreddit
  results: 25, // Number of recent comments to initially fetch
  pollTime: 2000, // Time between polling for new comments (in milliseconds)
};

// Create a Snoostorm comment stream
const comments = client.CommentStream(streamOpts);

// Mustafa Kemal Atatürk quotes
const ataturkQuotes = [
  "The truest mentor in life is science.",
  "Sovereignty belongs unconditionally to the people.",
  "Peace at Home, Peace in the World.",
  "A nation without art and culture cannot have a full existence.",
  // Add more quotes here
];

// Mustafa Kemal Atatürk photos
const ataturkPhotos = [
  "https://api.emirkabal.com/v1/ataturk",
  // Add more photo URLs here
];

// Timestamp to track the last response time
let lastResponseTime = Date.now();

// Listen for comments
comments.on('item', (comment) => {
  const commentText = comment.body.toLowerCase();

  // Check if the comment mentions "atatürk" and cooldown time has passed
  if (commentText.includes("Atatürk") && (Date.now() - lastResponseTime) > 20000) {
    // Generate a random quote and photo index
    const randomQuoteIndex = Math.floor(Math.random() * ataturkQuotes.length);
    const randomPhotoIndex = Math.floor(Math.random() * ataturkPhotos.length);

    // Reply to the comment with the quote and photo
    comment.reply(
      `**Mustafa Kemal Atatürk Quote:**\n\n${ataturkQuotes[randomQuoteIndex]}\n\n` +
      `**Atatürk Photo:**\n\n${ataturkPhotos[randomPhotoIndex]}`
    );

    // Update the last response time
    lastResponseTime = Date.now();
  }
});
