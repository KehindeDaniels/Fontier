import { updateSelectionCache, getCachedSelection } from "./selection";
import { showTray, hideTray, updateTrayTheme } from "./tray";

export const setupEventListeners = (): void => {
  // Selection change handler
  const handleSelectionChange = (): void => {
    updateSelectionCache();
    const sel = getCachedSelection();

    if (sel) {
      showTray();
    } else {
      hideTray();
    }
  };

  // Event listeners
  document.addEventListener("selectionchange", handleSelectionChange);
  document.addEventListener("mouseup", handleSelectionChange, true);
  document.addEventListener("keyup", handleSelectionChange, true);

  // Hide when scrolling/clicking elsewhere (but not when using tray)
  document.addEventListener("scroll", () => hideTray(), true);
  document.addEventListener(
    "mousedown",
    (e) => {
      if (
        e.target instanceof Node &&
        document.querySelector(".fontier-tray")?.contains(e.target)
      )
        return;
      hideTray();
    },
    true
  );

  // Listen for theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", updateTrayTheme);
};
