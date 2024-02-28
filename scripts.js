/**
 * The function fetchEmulators fetches emulator data from a JSON file and dynamically creates HTML
 * elements to display the emulator information on a web page.
 */
async function fetchEmulators() {
    try {
        const response = await fetch('emulators.json');
        const data = await response.json();
        const emulatorsContainer = document.querySelector('.emulator-container');
    data.sort((a, b) => a.name.localeCompare(b.name));
    for (const emulator of data) {
        const emulatorItem = document.createElement('div');
        const downloadLink = await getApkLastRelease(emulator.user, emulator.repo);
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
            <a href="${emulator.url.includes('https://github.com/') && downloadLink ? downloadLink : emulator.url}" target="_blank" class="install-button filled"><i class="fa-solid fa-download"></i> Download</a>
        </div>`;
        emulatorsContainer.appendChild(emulatorItem);
    }
    } catch (error) {
        console.error(error);
    }
}
window.onload = function() {
    fetchEmulators();
};

/**
 * The function `getApkLastRelease` fetches the latest release information from a GitHub repository and
 * returns the download URL for the APK file if found.
 * @param user - The `user` parameter is typically the username or organization name of the GitHub
 * account that owns the repository you want to retrieve information from.
 * @param repo - The `repo` parameter in the `getApkLastRelease` function represents the name of the
 * GitHub repository from which you want to retrieve the latest release information.
 * @returns The function `getApkLastRelease` returns the download URL of the latest APK file in the
 * specified GitHub repository's releases. If an APK file is found, it returns the browser download URL
 * of that APK file. If no APK file is found in the latest release, it returns the message 'No se
 * encontró un APK en la última release.'
 */
const getApkLastRelease = async (user, repo) => {
    const url = `https://api.github.com/repos/${user}/${repo}/releases/latest`;
    try {
        const response = await fetch(url);
        const release = await response.json();
        const tagName = release.tag_name;
        const asset = release.assets.find(asset => asset.name.endsWith('.apk'));
        return asset ? asset.browser_download_url : 'No se encontró un APK en la última release.';
    } catch (error) {
        console.error('Error al obtener la información:', error);
    }
};

/**
 * The above JavaScript function toggles a dark mode theme on specific elements of a webpage based on
 * user preference stored in local storage.
 */
const toggleModeButton = document.getElementById('toggle-mode');
const sunIcon = document.querySelector('.fa-sun');
const moonIcon = document.querySelector('.fa-moon');
function toggleDarkMode() {
  const elementsToToggle = [
    document.body,
    document.querySelector('.header'),
    document.querySelector('.copyright'),
  ];
  elementsToToggle.forEach(element => {
    element.classList.toggle('dark-mode');
  });
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
  sunIcon.classList.toggle('hidden', document.body.classList.contains('dark-mode'));
  moonIcon.classList.toggle('hidden', !document.body.classList.contains('dark-mode'));
}
toggleModeButton.addEventListener('click', toggleDarkMode);
/* The code block you provided is checking the value stored in the local storage under the key
'dark-mode'. If the value is 'true', it means that the user has preferred dark mode. */
const isDarkModePreferred = localStorage.getItem('dark-mode') === 'true';
if (isDarkModePreferred) {
    toggleDarkMode();
    sunIcon.classList.toggle('hidden', isDarkModePreferred);
} else {
    moonIcon.classList.toggle('hidden', !isDarkModePreferred);
}