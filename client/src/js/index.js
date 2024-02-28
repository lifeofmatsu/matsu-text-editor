import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = ''; // Clears the main content area of the application.

const loadSpinner = () => { // Function to show a loading spinner.
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
    <div class="loading-container">
    <div class="loading-spinner" />
    </div>
    `;
    main.appendChild(spinner); // Adds the spinner to the main content area.
};

const editor = new Editor(); // Initializes the text editor.

if (typeof editor === 'undefined') {
    loadSpinner(); // Shows the loading spinner if the editor is not correctly initialized.
}

// Check if service workers are supported in the current browser.
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('./src-sw.js')
		.then(function (registration) {
			console.log(
				'Service Worker registered with scope:',
				registration.scope
			);
		})
		.catch(function (error) {
			console.log('Service Worker registration failed:', error);
		});
}

// if ('serviceWorker' in navigator) {
//     const workboxSW = new Workbox('/src-sw.js'); // Creates a new Workbox service worker instance.
//     workboxSW.register(); // Registers the service worker.
// } else {
//     console.error('Service workers are not supported in this browser.');
// }