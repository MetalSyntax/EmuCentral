/**
 * The function fetchEmulators fetches emulator data from a JSON file and dynamically creates HTML
 * elements to display the emulator information on a web page.
 */
async function fetchEmulators() {
    try {
        const response = await fetch('emulators.json');
        const data = await response.json();
        const emulatorsContainer = document.querySelector('.emulator-container');
    data.forEach(emulator => {
        const emulatorItem = document.createElement('div');
        emulatorItem.classList.add('emulator-item');
        emulatorItem.innerHTML = `
        <div class="emulator-image">
            <img class="emulator-icon" src="${emulator.logo_url}"/>
        </div>
        <div class="emulator-info">
            <h2 class="emulator-title">${emulator.name}</h2>
            <p class="emulator-developer">${emulator.developer}</p>
        </div>
        <div class="emulator-button">
            <a href="${emulator.url}" target="_blank" class="install-button filled">Download</a>
        </div>`;
        emulatorsContainer.appendChild(emulatorItem);
    });
    } catch (error) {
        console.error(error);
    }
}

fetchEmulators();