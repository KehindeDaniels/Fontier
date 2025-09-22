import { setupEventListeners } from "./events";
import { updateTrayTheme } from "./tray";

// Initialize the content script
const init = (): void => {
  setupEventListeners();
  updateTrayTheme(); // Set initial theme
  console.log("Content script loaded (Fontier, with reverse conversion).");
};

// Start the extension
init();
console.log("Fontier content script loaded ✅");
