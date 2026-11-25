
const shoeCharts = {
    men: [
        { cm: 24, US: "6", UK: "5.5", EU: "39" },
        { cm: 24.5, US: "6.5", UK: "6", EU: "39.5" },
        { cm: 25, US: "7", UK: "6.5", EU: "40" },
        { cm: 25.5, US: "7.5", UK: "7", EU: "40.5" },
        { cm: 26, US: "8", UK: "7.5", EU: "41" },
        { cm: 26.5, US: "8.5", UK: "8", EU: "42" },
        { cm: 27, US: "9", UK: "8.5", EU: "42.5" },
        { cm: 27.5, US: "9.5", UK: "9", EU: "43" },
        { cm: 28, US: "10", UK: "9.5", EU: "44" },
        { cm: 28.5, US: "10.5", UK: "10", EU: "44.5" },
        { cm: 29, US: "11", UK: "10.5", EU: "45" },
        { cm: 29.5, US: "11.5", UK: "11", EU: "45.5" },
        { cm: 30, US: "12", UK: "11.5", EU: "46" },
        { cm: 31, US: "13", UK: "12.5", EU: "47" }
    ],

    women: [
        { cm: 22, US: "5", UK: "3", EU: "35" },
        { cm: 22.5, US: "5.5", UK: "3.5", EU: "35.5" },
        { cm: 23, US: "6", UK: "4", EU: "36" },
        { cm: 23.5, US: "6.5", UK: "4.5", EU: "36.5" },
        { cm: 24, US: "7", UK: "5", EU: "37" },
        { cm: 24.5, US: "7.5", UK: "5.5", EU: "37.5" },
        { cm: 25, US: "8", UK: "6", EU: "38" },
        { cm: 25.5, US: "8.5", UK: "6.5", EU: "38.5" },
        { cm: 26, US: "9", UK: "7", EU: "39" },
        { cm: 26.5, US: "9.5", UK: "7.5", EU: "40" },
        { cm: 27, US: "10", UK: "8", EU: "40.5" },
        { cm: 27.5, US: "10.5", UK: "8.5", EU: "41" },
        { cm: 28, US: "11", UK: "9", EU: "42" },
        { cm: 29, US: "12", UK: "10", EU: "43" }
    ],

    children: [
        { cm: 12, US: "5C", UK: "4.5", EU: "21" },
        { cm: 12.5, US: "5.5C", UK: "5", EU: "21.5" },
        { cm: 13, US: "6C", UK: "5.5", EU: "22" },
        { cm: 13.5, US: "6.5C", UK: "6", EU: "22.5" },
        { cm: 14, US: "7C", UK: "6.5", EU: "23" },
        { cm: 14.5, US: "7.5C", UK: "7", EU: "24" },
        { cm: 15, US: "8C", UK: "7.5", EU: "25" },
        { cm: 15.5, US: "8.5C", UK: "8", EU: "25.5" },
        { cm: 16, US: "9C", UK: "8.5", EU: "26" },
        { cm: 16.5, US: "9.5C", UK: "9", EU: "27" },
        { cm: 17, US: "10C", UK: "9.5", EU: "27.5" },
        { cm: 17.5, US: "10.5C", UK: "10", EU: "28" },
        { cm: 18, US: "11C", UK: "10.5", EU: "28.5" },
        { cm: 18.5, US: "11.5C", UK: "11", EU: "29" },
        { cm: 19, US: "12C", UK: "11.5", EU: "30" },
        { cm: 19.5, US: "12.5C", UK: "12", EU: "30.5" },
        { cm: 20, US: "13C", UK: "12.5", EU: "31" },
        { cm: 20.5, US: "13.5C", UK: "13", EU: "31.5" },
        { cm: 21, US: "1Y", UK: "13.5", EU: "32" },
        { cm: 21.5, US: "1.5Y", UK: "1", EU: "33" },
        { cm: 22, US: "2Y", UK: "1.5", EU: "33.5" },
        { cm: 22.5, US: "2.5Y", UK: "2", EU: "34" },
        { cm: 23, US: "3Y", UK: "2.5", EU: "35" }
    ]
};

const footCategory = document.getElementById("footCategory");
const footLength = document.getElementById("footLength");
const convertLength = document.getElementById("convertLength");

const sizeCategory = document.getElementById("sizeCategory");
const sizeSystem = document.getElementById("sizeSystem");
const existingSize = document.getElementById("existingSize");
const convertExisting = document.getElementById("convertExisting");

const shoeError = document.getElementById("shoeError");
const shoeResults = document.getElementById("shoeResults");

const resultUS = document.getElementById("resultUS");
const resultUK = document.getElementById("resultUK");
const resultEU = document.getElementById("resultEU");
const resultCM = document.getElementById("resultCM");

// Find the closest available size in a chart.
function findClosestSize(chart, value, field) {
    return chart.reduce((closest, current) => {
        const currentDifference = Math.abs(Number(current[field]) - value);
        const closestDifference = Math.abs(Number(closest[field]) - value);

        return currentDifference < closestDifference ? current : closest;
    });
}

// Display conversion results.
function displayShoeResults(size) {
    resultUS.textContent = size.US;
    resultUK.textContent = size.UK;
    resultEU.textContent = size.EU;
    resultCM.textContent = size.cm + " cm";

    shoeError.textContent = "";
    shoeResults.style.display = "block";
}

// Convert foot length to shoe sizes.
convertLength.addEventListener("click", function () {
    const category = footCategory.value;
    const length = Number(footLength.value);

    shoeResults.style.display = "none";
    shoeError.textContent = "";

    if (!footLength.value || !Number.isFinite(length)) {
        shoeError.textContent = "Please enter your foot length in cm.";
        return;
    }

    const chart = shoeCharts[category];

    if (length < chart[0].cm || length > chart[chart.length - 1].cm) {
        shoeError.textContent =
            `Please enter a length between ${chart[0].cm} and ${chart[chart.length - 1].cm} cm for this category.`;
        return;
    }

    const closestSize = findClosestSize(chart, length, "cm");

    displayShoeResults(closestSize);
});

// Convert an existing US, UK or EU shoe size.
convertExisting.addEventListener("click", function () {
    const category = sizeCategory.value;
    const system = sizeSystem.value;
    const size = Number(existingSize.value);

    shoeResults.style.display = "none";
    shoeError.textContent = "";

    if (!existingSize.value || !Number.isFinite(size)) {
        shoeError.textContent = "Please enter your existing shoe size.";
        return;
    }

    const chart = shoeCharts[category];

    // Match children's US sizes such as 5C, 1Y, etc.
    let closestSize;

    if (system === "US" && category === "children") {
        const enteredSize = existingSize.value.trim().toUpperCase();

        closestSize = chart.find(item => item.US === enteredSize);

        if (!closestSize) {
            shoeError.textContent =
                "Enter a children's US size such as 5C, 10C or 1Y.";
            return;
        }
    } else {
        const minimum = Math.min(...chart.map(item => Number(item[system])));
        const maximum = Math.max(...chart.map(item => Number(item[system])));

        if (size < minimum || size > maximum) {
            shoeError.textContent =
                `Please enter a size between ${minimum} and ${maximum}.`;
            return;
        }

        closestSize = findClosestSize(chart, size, system);
    }

    displayShoeResults(closestSize);
});

// Press Enter to convert foot length.
footLength.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        convertLength.click();
    }
});

// Press Enter to convert an existing shoe size.
existingSize.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        convertExisting.click();
    }
});
