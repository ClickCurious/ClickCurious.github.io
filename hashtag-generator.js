
const categoryHashtags = {
    general: ["socialmedia", "contentcreator", "instadaily", "explore", "trending", "viral", "follow", "share", "community", "creative"],
    fashion: ["fashion", "style", "ootd", "outfitoftheday", "fashionstyle", "streetwear", "fashioninspo", "styleinspiration", "fashionlover", "trendy"],
    business: ["business", "entrepreneur", "success", "smallbusiness", "marketing", "branding", "businesstips", "startup", "growth", "motivation"],
    fitness: ["fitness", "workout", "gym", "fitnessmotivation", "healthylifestyle", "training", "fitlife", "exercise", "fitnesstips", "wellness"],
    travel: ["travel", "wanderlust", "travelgram", "adventure", "exploretheworld", "vacation", "travelphotography", "beautifuldestinations", "trip", "nature"],
    food: ["food", "foodie", "foodlover", "instafood", "delicious", "homemade", "foodphotography", "cooking", "recipe", "yummy"],
    technology: ["technology", "tech", "innovation", "gadgets", "artificialintelligence", "coding", "programming", "futuretech", "digital", "software"],
    beauty: ["beauty", "makeup", "skincare", "beautytips", "makeuplover", "glowingskin", "beautyroutine", "cosmetics", "selfcare", "beautyproducts"],
    gaming: ["gaming", "gamer", "videogames", "gamingcommunity", "gameplay", "pcgaming", "mobilegaming", "gamerlife", "esports", "streamer"],
    education: ["education", "learning", "study", "knowledge", "student", "educationmatters", "studytips", "onlinelearning", "learningeveryday", "school"],
    lifestyle: ["lifestyle", "dailyinspiration", "happiness", "positivity", "selfimprovement", "dailymotivation", "mindset", "lifequotes", "wellbeing", "inspiration"]
};

const platformHashtags = {
    instagram: ["instagood", "instagram", "instalove", "photooftheday"],
    tiktok: ["tiktok", "fyp", "foryou", "tiktokviral"],
    youtube: ["youtube", "youtuber", "youtubecreator", "subscribe"],
    facebook: ["facebook", "facebookpage", "community", "shareyourstory"]
};

function cleanHashtag(word) {
    return word
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

function generateHashtags() {
    const topicInput = document.getElementById("hashtagTopic").value.trim();
    const platform = document.getElementById("hashtagPlatform").value;
    const category = document.getElementById("hashtagCategory").value;
    const count = Number(document.getElementById("hashtagCount").value);

    const error = document.getElementById("hashtagError");
    const results = document.getElementById("hashtagResults");
    const hashtagList = document.getElementById("hashtagList");
    const copyMessage = document.getElementById("copyMessage");

    error.textContent = "";
    copyMessage.textContent = "";
    hashtagList.innerHTML = "";

    if (!topicInput) {
        error.textContent = "Please enter a topic or keyword.";
        results.style.display = "none";
        return;
    }

    const topicWords = topicInput
        .split(/\s+/)
        .map(cleanHashtag)
        .filter(word => word.length > 0);

    if (topicWords.length === 0) {
        error.textContent = "Please enter valid letters or numbers.";
        results.style.display = "none";
        return;
    }

    const topicTag = topicWords.join("");

    const hashtags = [
        topicTag,
        ...topicWords,
        ...categoryHashtags[category],
        ...platformHashtags[platform]
    ];

    // Remove duplicates
    const uniqueHashtags = [...new Set(hashtags)];

    // Add combinations from the topic
    if (topicWords.length > 1) {
        uniqueHashtags.push(
            topicWords.join(""),
            topicWords.join("and"),
            topicWords[0] + "tips",
            topicWords[0] + "ideas"
        );
    } else {
        uniqueHashtags.push(
            topicTag + "tips",
            topicTag + "ideas",
            topicTag + "daily",
            topicTag + "community",
            topicTag + "inspiration"
        );
    }

    const finalHashtags = [...new Set(uniqueHashtags)]
        .slice(0, count);

    finalHashtags.forEach(tag => {
        const item = document.createElement("span");
        item.className = "hashtag-item";
        item.textContent = "#" + tag;
        hashtagList.appendChild(item);
    });

    results.style.display = "block";
}

document.getElementById("generateHashtags")
    .addEventListener("click", generateHashtags);

document.getElementById("hashtagTopic")
    .addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            generateHashtags();
        }
    });

document.getElementById("copyAllHashtags")
    .addEventListener("click", async function() {
        const tags = [...document.querySelectorAll(".hashtag-item")]
            .map(item => item.textContent)
            .join(" ");

        if (!tags) return;

        try {
            await navigator.clipboard.writeText(tags);
            document.getElementById("copyMessage").textContent =
                "Hashtags copied successfully!";
        } catch (error) {
            document.getElementById("copyMessage").textContent =
                "Copy failed. Please select and copy the hashtags manually.";
        }
    });
