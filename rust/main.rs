use std::time::{Duration, Instant};
use rand::seq::SliceRandom;
use reddit::Reddit;

fn main() {
    // Initialize the Reddit API client
    let reddit = Reddit::new("YOUR_REDDIT_USERNAME", "YOUR_REDDIT_PASSWORD");

    let mut last_response_time = Instant::now();

    loop {
        let comments = reddit.get_new_comments();

        for comment in comments {
            // Check if the comment contains "Atatürk"
            if comment.body.contains("Atatürk") {
                // Check if enough time has passed since the last response
                if last_response_time.elapsed() >= Duration::from_secs(200) {
                    let quote = get_random_quote();

                    let photo_link = get_random_photo_link();

                    reddit.reply_to_comment(&comment.id, &format!("Mustafa Kemal Atatürk Quote: {}\n\nRandom Atatürk Photo: {}", quote, photo_link));

                    last_response_time = Instant::now();
                }
            }
        }
    }
}

fn get_random_quote() -> &'static str {
    let quotes = [
        "The truest mentor in life is science.",
        "A nation that does not know its history is like a tree without roots.",
        "A nation which makes the final sacrifice for life and freedom does not get beaten.",
        "The most powerful weapon in the hands of the oppressor is the mind of the oppressed.",
        "Peace at home, peace in the world.",
        "Sovereignty unconditionally belongs to the nation.",
        "Heroes who shed their blood and lost their lives! You are now lying in the soil of a friendly country. Therefore, rest in peace. There is no difference between the Johnnies and the Mehmets to us where they lie side by side here in this country of ours. You, the mothers who sent their sons from faraway countries, wipe away your tears; your sons are now lying in our bosom and are in peace. After having lost their lives on this land they have become our sons as well.",
        "The future is in the skies.",
        "Victory is for those who can say 'Victory is mine'. Success is for those who can begin saying 'I will succeed' and say 'I have succeeded' in the end.",
        "A good teacher is like a candle - it consumes itself to light the way for others.",
    ];

    let mut rng = rand::thread_rng();
    *quotes.choose(&mut rng).unwrap()
}

fn get_random_photo_link() -> &'static str {
    let photo_links = [
        "https://api.emirkabal.com/v1/ataturk",
    ];

    let mut rng = rand::thread_rng();
    *photo_links.choose(&mut rng).unwrap()
}