// Find the install button by its ID.
const installButton = document.getElementById('buttonInstall');

// Define a variable to hold the beforeinstallprompt event.
let deferredPrompt;

// Add an event listener for beforeinstallprompt event.
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update the install button's display property to make it visible.
    // installButton.style.display = 'block';
    installButton.classList.toggle('hidden', false);
});

// Add an event listener for the install button's click event.

installButton.addEventListener('click', async () => {
	if (!deferredPrompt) {
		return;
	}

	deferredPrompt.prompt();
	const result = await deferredPrompt.userChoice;
	console.log('User response to the install prompt', result);
	deferredPrompt = null;
	installButton.classList.toggle('hidden', true);
});

installButton.addEventListener('click', async () => {
    // Check if the deferredPrompt is available.
    if (!deferredPrompt) {
        return;
    }
    // Show the install prompt.
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt.
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, log the outcome of the prompt.
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, discard it.
    deferredPrompt = null;
    // Optionally, hide the install button after prompting.
    // installButton.style.display = 'none';
    installButton.classList.toggle('hidden', true);
});

// Add an event listener for the appinstalled event.
window.addEventListener('appinstalled', (event) => {
    // Log the installation to the console.
    console.log('PWA was installed', event);
    // Reset the deferred prompt variable, as it can't be used again.
    deferredPrompt = null;
});
