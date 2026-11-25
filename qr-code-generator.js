
const generateButton = document.getElementById("generateQR");
const qrText = document.getElementById("qrText");
const qrSize = document.getElementById("qrSize");
const qrResult = document.getElementById("qrResult");
const qrImage = document.getElementById("qrImage");
const downloadQR = document.getElementById("downloadQR");
const qrError = document.getElementById("qrError");

generateButton.addEventListener("click", function () {
    const text = qrText.value.trim();
    const size = qrSize.value;

    qrError.textContent = "";

    if (!text) {
        qrError.textContent = "Please enter some text or a website URL.";
        qrResult.style.display = "none";
        return;
    }

    generateButton.disabled = true;
    generateButton.textContent = "Generating...";

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

    const image = new Image();

    image.onload = function () {
        qrImage.src = qrUrl;
        qrResult.style.display = "block";

        downloadQR.href = qrUrl;

        generateButton.disabled = false;
        generateButton.textContent = "Generate QR Code";
    };

    image.onerror = function () {
        qrError.textContent = "Could not generate the QR code. Please check your internet connection and try again.";

        qrResult.style.display = "none";
        generateButton.disabled = false;
        generateButton.textContent = "Generate QR Code";
    };

    image.src = qrUrl;
});

qrText.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generateButton.click();
    }
});
