import praw
import random
import time

# Set up the AtaturkQuoteBot
reddit = praw.Reddit(
    client_id='YOUR_CLIENT_ID',
    client_secret='YOUR_CLIENT_SECRET',
    user_agent='YOUR_USER_AGENT',
    username='YOUR_REDDIT_USERNAME',
    password='YOUR_REDDIT_PASSWORD'
)

# Define a list of Mustafa Kemal Atatürk quotes
quotes = [
    "The truest mentor in life is science.",
    "A nation devoid of art and artists cannot have a full existence.",
    "A good teacher is like a candle; it consumes itself to light the way for others.",
    "Our true mentor in life is science.",
    "The world is advancing, and we should not lag behind.",
    # Add more quotes here
]

# Define the URL of Mustafa Kemal Atatürk photos
photo_url = 'https://api.emirkabal.com/v1/ataturk'

# Monitor comments
subreddit_name = 'all'  # Replace with the desired subreddit name or 'all' for all subreddits
subreddit = reddit.subreddit(subreddit_name)

# Keep track of the last response time
last_response_time = 0

# Check for comments mentioning "Ataturk"
for comment in subreddit.stream.comments():
    if 'Ataturk' in comment.body:
        current_time = time.time()
        elapsed_time = current_time - last_response_time

        # Check if the cooldown period has passed
        if elapsed_time >= 200:
            # Choose a random quote
            random_quote = random.choice(quotes)

            # Prepare the reply message
            reply_message = f'{random_quote}\n\nHere is a photo of Mustafa Kemal Atatürk: {photo_url}'

            # Reply to the comment with the quote and photo link
            comment.reply(reply_message)

            print('Replied to a comment mentioning Ataturk!')

            # Update the last response time
            last_response_time = time.time()
