// nfc.js
const output = document.getElementById('output');
const readButton = document.getElementById('readNfc');

// Check if Web NFC is supported
if ('NDEFReader' in window) {
    console.log('Web NFC is supported');

    readButton.addEventListener('click', async () => {
        try {
            const nfcReader = new NDEFReader();
            await nfcReader.scan();
            output.textContent = "Scanning for NFC tag...";

            nfcReader.onreading = (event) => {
                const serialNumber = event.serialNumber;
                output.textContent = `NFC Tag Serial Number: ${serialNumber}`;
                // You can send this data to your server or trigger Apple Pay here
            };
        } catch (error) {
            output.textContent = `Error: ${error}`;
        }
    });
} else {
    console.log('Web NFC is not supported in this browser.');
    output.textContent = "Web NFC is not supported in this browser.";
}

