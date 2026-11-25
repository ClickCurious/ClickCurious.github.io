
const tools = [
    {
        name: "Username Generator",
        description: "Generate creative usernames for social media and gaming.",
        icon: "👤",
        color: "purple",
        featured: true,
        category: "Generators"
    },
    {
        name: "Discount Calculator",
        description: "Calculate discounts, savings and final prices.",
        icon: "🏷️",
        color: "green",
        featured: true,
        category: "Calculators"
    },
    {
        name: "QR Code Generator",
        description: "Create QR codes for website links and text.",
        icon: "▦",
        color: "blue",
        featured: true,
        category: "Generators"
    },
    {
        name: "Shoe Size Converter",
        description: "Convert shoe sizes between US, UK and EU.",
        icon: "👟",
        color: "orange",
        featured: true,
        category: "Converters"
    },
    {
        name: "Hashtag Generator",
        description: "Generate hashtags for your social media posts.",
        icon: "#️⃣",
        color: "purple",
        featured: true,
        category: "Generators"
    }
];

const toolGrid = document.getElementById("toolGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");

function displayTools(list) {
    toolGrid.innerHTML = "";

    list.forEach(tool => {
        const card = document.createElement("article");
        card.className = "tool-card";

        const icon = document.createElement("div");
        icon.className = `tool-icon ${tool.color}`;
        icon.textContent = tool.icon;

        const heading = document.createElement("h3");
        heading.textContent = tool.name;

        const description = document.createElement("p");
        description.textContent = tool.description;

        const category = document.createElement("small");
        category.textContent = tool.category;
        category.style.color = "#8993A3";

        const link = document.createElement("a");

if (tool.name === "Username Generator") {
    link.href = "username-generator.html";
} else if (tool.name === "Discount Calculator") {
    link.href = "discount-calculator.html";
} else if (tool.name === "QR Code Generator") {
    link.href = "qr-code-generator.html";
} else if (tool.name === "Shoe Size Converter") {
    link.href = "shoe-size-converter.html";
} else if (tool.name === "Hashtag Generator") {
    link.href = "hashtag-generator.html";
} else {
    link.href = "#";
}

link.textContent = "Explore tool →";

        card.append(icon, heading, description, category, link);
        toolGrid.appendChild(card);
    });
}

function searchTools() {
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        displayTools(tools.filter(tool => tool.featured));
        searchMessage.textContent = "";
        return;
    }

    const results = tools.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
    );

    displayTools(results);

    searchMessage.textContent = results.length
        ? `${results.length} tool(s) found.`
        : "No tools found. Try another search.";
}

searchButton.addEventListener("click", searchTools);
searchInput.addEventListener("input", searchTools);

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchTools();
    }
});

// Display five featured tools when homepage loads
displayTools(tools.filter(tool => tool.featured));
