
const currencyInput = document.getElementById("currency");
const originalPriceInput = document.getElementById("originalPrice");
const discountInput = document.getElementById("discountPercentage");

const calculateButton = document.getElementById("calculateButton");
const resetButton = document.getElementById("resetButton");

const resultsCard = document.getElementById("resultsCard");
const errorMessage = document.getElementById("errorMessage");

const resultOriginal = document.getElementById("resultOriginal");
const resultDiscount = document.getElementById("resultDiscount");
const resultSavings = document.getElementById("resultSavings");
const resultFinal = document.getElementById("resultFinal");

// Format amounts according to the selected currency
function formatCurrency(amount, currency) {
    try {
        return new Intl.NumberFormat("en", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 2
        }).format(amount);
    } catch (error) {
        return currency + " " + amount.toFixed(2);
    }
}

// Calculate discount
function calculateDiscount() {
    const originalPrice = Number(originalPriceInput.value);
    const discountPercentage = Number(discountInput.value);

    errorMessage.textContent = "";
    resultsCard.style.display = "none";

    // Validate inputs
    if (
        originalPriceInput.value.trim() === "" ||
        discountInput.value.trim() === ""
    ) {
        errorMessage.textContent =
            "Please enter both the original price and discount percentage.";
        return;
    }

    if (!Number.isFinite(originalPrice) || originalPrice <= 0) {
        errorMessage.textContent =
            "Please enter a valid original price greater than zero.";
        return;
    }

    if (
        !Number.isFinite(discountPercentage) ||
        discountPercentage < 0 ||
        discountPercentage > 100
    ) {
        errorMessage.textContent =
            "Discount must be between 0% and 100%.";
        return;
    }

    // Perform calculations
    const savings = originalPrice * (discountPercentage / 100);
    const finalPrice = originalPrice - savings;

    const currency = currencyInput.value;

    // Display results
    resultOriginal.textContent =
        formatCurrency(originalPrice, currency);

    resultDiscount.textContent =
        discountPercentage + "%";

    resultSavings.textContent =
        formatCurrency(savings, currency);

    resultFinal.textContent =
        formatCurrency(finalPrice, currency);

    resultsCard.style.display = "block";
}

// Reset calculator
function resetCalculator() {
    originalPriceInput.value = "";
    discountInput.value = "";
    currencyInput.value = "LKR";

    resultsCard.style.display = "none";
    errorMessage.textContent = "";
}

// Button events
calculateButton.addEventListener("click", calculateDiscount);
resetButton.addEventListener("click", resetCalculator);

// Press Enter to calculate
[originalPriceInput, discountInput].forEach(input => {
    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            calculateDiscount();
        }
    });
});
