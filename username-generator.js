
const baseNameInput = document.getElementById("baseName");
const styleInput = document.getElementById("usernameStyle");
const platformSelect = document.getElementById("platformSelect");
const resultCount = document.getElementById("resultCount");
const generateButton = document.getElementById("generateButton");
const resultsContainer = document.getElementById("usernameResults");
const copyMessage = document.getElementById("copyMessage");

const words = {
    cool: [
        "Vibe", "Nova", "Shadow", "Blaze", "Pixel", "Storm",
        "Cosmic", "Frost", "Echo", "Neon", "Mystic", "Lunar",
        "Rogue", "Ace", "Phantom", "Chill", "Turbo", "Spark",
        "Galaxy", "Drift", "Venom", "Infinity", "Cyber", "Flash",
        "Zen", "Orbit", "Wave", "Fusion", "Night", "Crystal"
    ],
    gaming: [
        "Gamer", "Pro", "Ninja", "Legend", "Sniper", "Warrior",
        "Boss", "Hunter", "Dragon", "Phantom", "Ranger", "Assassin",
        "Reaper", "Fighter", "Master", "Champion", "Knight",
        "Titan", "Savage", "Predator", "Viper", "Wolf", "Ghost",
        "Samurai", "Gladiator", "Commander", "Slayer", "Beast",
        "Falcon", "Hawk"
    ],
    professional: [
        "Official", "Studio", "Creative", "Digital", "Connect",
        "Works", "Media", "Design", "Global", "Online", "Expert",
        "Solutions", "Agency", "Network", "Central", "Hub",
        "Vision", "Creator", "Business", "Marketing", "Projects",
        "Ideas", "Team", "Portfolio", "Academy", "Development",
        "Technology", "Concepts", "Labs", "Community"
    ],
    minimal: [
        "HQ", "X", "One", "Daily", "Zone", "Lab", "Hub",
        "Co", "Now", "Go", "Plus", "Max", "Pro", "Core",
        "Dot", "Key", "Link", "Box", "Net", "Web", "Life",
        "Ace", "Zen", "Neo", "Pure", "Lite", "Mode", "Form",
        "Flow", "Loop"
    ]
};

function cleanName(value) {
    return value.trim().replace(/[^a-zA-Z0-9]/g, "");
}

function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

function getPlatformUrl(platform, username) {
    const handle = encodeURIComponent(username);

    const urls = {
        instagram: `https://www.instagram.com/${handle}/`,
        tiktok: `https://www.tiktok.com/@${handle}`,
        youtube: `https://www.youtube.com/@${handle}`,
        facebook: `https://www.facebook.com/${handle}`,
        x: `https://x.com/${handle}`,
        reddit: `https://www.reddit.com/user/${handle}/`,
        github: `https://github.com/${handle}`
    };

    return urls[platform];
}

function generateUsernames() {
    const name = cleanName(baseNameInput.value);

    if (!name) {
        resultsContainer.textContent =
            "Please enter a name or keyword first.";
        copyMessage.textContent = "";
        return;
    }

    const style = styleInput.value;
    const platform = platformSelect.value;
    const selectedWords = words[style];

    const patterns = [];

    // Create many combinations
    selectedWords.forEach(word => {
        patterns.push(
            name + word,
            word + name,
            name + "_" + word,
            word + "_" + name,
            name + "." + word,
            word + "." + name,
            "The" + name + word,
            name + word + "X",
            name + word + "Official",
            "Its" + name + word
        );
    });

    // Additional combinations
    const extraPatterns = [
        "The" + name,
        "Its" + name,
        "Real" + name,
        "Hey" + name,
        "IAm" + name,
        "Mr" + name,
        "ItsMe" + name,
        "Only" + name,
        "Just" + name,
        "ThisIs" + name,
        name + "Official",
        name + "Online",
        name + "World",
        name + "Forever",
        name + "Central",
        name + "Vibes",
        name + "Daily",
        name + "Studio",
        name + "Creates",
        name + "X",
        name + "XX",
        name + "_HQ",
        name + "_Pro",
        name + "360",
        name + "247",
        name + "007",
        name + "101",
        name + "99",
        name + "01",
        "X" + name,
        "Xx" + name + "xX",
        "TheReal" + name,
        "Official" + name,
        "Super" + name,
        "Mega" + name,
        "Ultra" + name,
        "My" + name,
        "Hello" + name,
        "Simply" + name,
        "Amazing" + name,
        "Meet" + name,
        "CallMe" + name,
        "Go" + name,
        "Get" + name,
        "Be" + name
    ];

    patterns.push(...extraPatterns);

    // Add more number combinations
    for (let i = 0; i < 30; i++) {
        const number = Math.floor(Math.random() * 9999) + 1;
        patterns.push(name + number);
        patterns.push(name + "_" + number);
    }

    // Remove duplicates
    const uniqueUsernames = [
        ...new Set(patterns.map(item => item.toLowerCase()))
    ];

    // Randomly choose 10
    const count = Number(resultCount.value);
const suggestions = shuffle(uniqueUsernames).slice(0, count);

    resultsContainer.replaceChildren();
    copyMessage.textContent = "";

    suggestions.forEach(username => {
        const result = document.createElement("div");
        result.className = "username-result";

        const usernameText = document.createElement("strong");
        usernameText.textContent = "@" + username;

        const actions = document.createElement("div");
        actions.style.display = "flex";
        actions.style.gap = "8px";

        const copyButton = document.createElement("button");
        copyButton.className = "copy-button";
        copyButton.textContent = "Copy";

        copyButton.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(username);
                copyMessage.textContent =
                    "Username copied successfully!";
            } catch (error) {
                copyMessage.textContent =
                    "Copy failed. Please copy manually.";
            }
        });

        const checkLink = document.createElement("a");
        checkLink.className = "copy-button";
        checkLink.textContent = "Check profile";
        checkLink.href = getPlatformUrl(platform, username);
        checkLink.target = "_blank";
        checkLink.rel = "noopener noreferrer";
        checkLink.style.textDecoration = "none";

        actions.append(copyButton, checkLink);
        result.append(usernameText, actions);
        resultsContainer.appendChild(result);
    });

    copyMessage.textContent =
        "These are suggestions, not verified available usernames.";
}

generateButton.addEventListener("click", generateUsernames);

baseNameInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        generateUsernames();
    }
});
