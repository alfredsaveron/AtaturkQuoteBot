import Snoowrap, { CommentStreamItem } from 'snoowrap';

// Initialize the Reddit client
const reddit = new Snoowrap({
  userAgent: 'Your User Agent',
  clientId: 'Your Client ID',
  clientSecret: 'Your Client Secret',
  username: 'Your Reddit Username',
  password: 'Your Reddit Password',
});

// Mustafa Kemal Ataturk quotes
const ataturkQuotes = [
  "The truest mentor in life is science.",
  "A nation devoid of art and artists cannot have a full existence.",
  "Everything we see in the world is the creative work of women.",
  "Teachers are the one and only people who save nations.",
  "Those who use religion for their own benefit are detestable. We are against such a situation and will not allow it. Those who use religion in such a manner have fooled our people; it is against just such people that we have fought and will continue to fight.",
  "o see me does not necessarily mean to see my face. To understand my thoughts is to have seen me.",
  "Human kind is made up of two sexes, women and men. Is it possible that a mass is improved by the improvement of only one part and the other part is ignored? Is it possible that if half of a mass is tied to earth with chains and the other half can soar into skies?",
  "Unless a nation's life faces peril, war is murder.",
  "Mankind is a single body and each nation a part of that body. We must never say ''What does it matter to me if some part of the world is ailing?'' If there is such an illness, we must concern ourselves with it as though we were having that illness.",
  // Add more quotes here
];

// Mustafa Kemal Ataturk photos
const ataturkPhotos = [
  "https://example.com/ataturk-photo1.jpg",
  "https://example.com/ataturk-photo2.jpg",
  // Add more photo links here
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

        // Reply with the quote and photo link
        comment.reply(`Here's a random quote from Mustafa Kemal Ataturk:\n\n"${randomQuote}"\n\nPhoto: ${randomPhoto}`);

        // Update the last response time
        lastResponseTime = currentTime;
      }
    }
  });
}

// Start listening for new comments
async function startBot() {
  const subreddit = await reddit.getSubreddit('your-target-subreddit');
  subreddit.stream.comments().on('comment', processComments);
}

// Start the bot
startBot();
