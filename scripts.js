/**
 * The function `getLatestRelease` fetches the latest release information for a specified GitHub
 * repository and returns the download URL for the release.
 * @param developer - The `developer` parameter refers to the username or organization name of the
 * developer who owns the GitHub repository from which you want to retrieve the latest release.
 * @param repo - The `repo` parameter in the `getLatestRelease` function represents the name of the
 * repository for which you want to retrieve the latest release information. It is the name of the
 * GitHub repository where you want to fetch the latest release details.
 * @returns The function `getLatestRelease` returns the download URL of the latest release of a
 * specified GitHub repository owned by a developer.
 */
async function getLatestRelease(developer, repo) {
    const url = `https://api.github.com/repos/${developer}/${repo}/releases/latest`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        const downloadUrl = data.assets[0].browser_download_url;
        return downloadUrl;
    } else {
        throw new Error(`Error al obtener la última release: ${response.statusText}`);
    }
}

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
            <a href="${emulator.url}" target="_blank" class="install-button filled">${emulator.type}</a>
        </div>`;
        emulatorsContainer.appendChild(emulatorItem);
    });
    } catch (error) {
        console.error(error);
    }
}

fetchEmulators();