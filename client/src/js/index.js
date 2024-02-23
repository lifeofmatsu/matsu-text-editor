import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";
console.log('1');
const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
    console.log('2');
	const spinner = document.createElement("div");
	spinner.classList.add("spinner");
	spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
	main.appendChild(spinner);
    console.log('3');
};

const editor = new Editor();
console.log('4');
if (typeof editor === "undefined") {
    console.log('5');
	loadSpinner();
}
console.log('6');
// Check if service workers are supported
if ("serviceWorker" in navigator) {
	// register workbox service worker
	const workboxSW = new Workbox("/src-sw.js");
	workboxSW.register();
} else {
	console.error("Service workers are not supported in this browser.");
}
