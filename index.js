import {
  boldMap,
  italicMap,
  boldItalicMap,
  strikethroughMap,
  boldStrikethroughMap,
  italicStrikethroughMap,
  boldItalicStrikethroughMap,
  underlineMap,
  monospaceMap,
  monospaceBoldMap,
} from "./fontStyles.js";

document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const textOutput = document.getElementById("textOutput");
  const boldBtn = document.getElementById("boldBtn");
  const italicBtn = document.getElementById("italicBtn");
  const strikeBtn = document.getElementById("strikeBtn");
  const monoBtn = document.getElementById("monoBtn");
  const underlineBtn = document.getElementById("underlineBtn");
  const copyBtn = document.getElementById("copyBtn");
  const themeToggleBtn = document.getElementById("themeToggle");
  const toast = document.getElementById("toast"); // Toast element

  // Function to show toast notification
  const showToast = () => {
    toast.classList.remove("hidden");
    toast.classList.add("show");

    // Remove the toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hidden");
    }, 3000);
  };

  const injectIcons = (isDarkMode) => {
    themeToggleBtn.innerHTML = "";
    const icon = document.createElement("i");
    icon.classList.add("fas");
    if (isDarkMode) {
      icon.classList.add("fa-moon");
    } else {
      icon.classList.add("fa-sun");
    }
    themeToggleBtn.appendChild(icon);
  };

  const updateThemeIcon = () => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    injectIcons(isDarkMode);
  };

  const applySavedTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    updateThemeIcon();
  };

  applySavedTheme();

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    updateThemeIcon();
  };

  themeToggleBtn.addEventListener("click", toggleTheme);

  let styles = {
    bold: false,
    italic: false,
    strikethrough: false,
    underline: false,
    monospace: false,
  };

  function convertToStyledText(text) {
    return text
      .split("")
      .map((char) => {
        let styledChar = char;

        if (
          styles.bold &&
          styles.italic &&
          styles.strikethrough &&
          boldItalicStrikethroughMap[char]
        ) {
          styledChar = boldItalicStrikethroughMap[char];
        } else if (
          styles.bold &&
          styles.strikethrough &&
          boldStrikethroughMap[char]
        ) {
          styledChar = boldStrikethroughMap[char];
        } else if (
          styles.italic &&
          styles.strikethrough &&
          italicStrikethroughMap[char]
        ) {
          styledChar = italicStrikethroughMap[char];
        } else if (styles.bold && styles.italic && boldItalicMap[char]) {
          styledChar = boldItalicMap[char];
        } else if (styles.bold && boldMap[char]) {
          styledChar = boldMap[char];
        } else if (styles.italic && italicMap[char]) {
          styledChar = italicMap[char];
        } else if (styles.strikethrough && strikethroughMap[char]) {
          styledChar = strikethroughMap[char];
        } else if (styles.underline && underlineMap[char]) {
          styledChar = underlineMap[char];
        } else if (styles.monospace && styles.bold && monospaceBoldMap[char]) {
          styledChar = monospaceBoldMap[char];
        } else if (styles.monospace && monospaceMap[char]) {
          styledChar = monospaceMap[char];
        }

        return styledChar;
      })
      .join("");
  }

  function updateOutput() {
    const styledText = convertToStyledText(textInput.value);
    textOutput.textContent = styledText;
  }

  function toggleButtonState(button, styleKey) {
    styles[styleKey] = !styles[styleKey];
    if (styles[styleKey]) {
      button.classList.add(
        "bg-blue-500",
        "dark:bg-blue-500",
        "text-white",
        "rounded"
      );
    } else {
      button.classList.remove(
        "bg-bg-blue-500",
        "dark:bg-blue-500",
        "text-white",
        "rounded"
      );
    }
    updateOutput();
  }

  boldBtn.addEventListener("click", () => toggleButtonState(boldBtn, "bold"));
  italicBtn.addEventListener("click", () =>
    toggleButtonState(italicBtn, "italic")
  );
  strikeBtn.addEventListener("click", () =>
    toggleButtonState(strikeBtn, "strikethrough")
  );
  // monoBtn.addEventListener("click", () =>
  //   toggleButtonState(monoBtn, "monospace")
  // );
  underlineBtn.addEventListener("click", () =>
    toggleButtonState(underlineBtn, "underline")
  );

  textInput.addEventListener("input", updateOutput);

  copyBtn.addEventListener("click", () => {
    const hiddenElement = document.createElement("textarea");
    hiddenElement.value = textOutput.textContent;
    document.body.appendChild(hiddenElement);
    hiddenElement.select();
    document.execCommand("copy");
    document.body.removeChild(hiddenElement);
    showToast(); // Show toast notification when copied
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tipBtn = document.getElementById("tipBtn");
  const closeModal = document.getElementById("closeModal");
  const tipModal = document.getElementById("tipModal");
  const tipContent = document.getElementById("tipContent");
  const prevTip = document.getElementById("prevTip");
  const nextTip = document.getElementById("nextTip");

  // Array of tips
  const tips = [
    "🪟 + V (Windows) or ⌘ + V (Mac) opens a clipboard manager to see recently copied items.",
    "Ctrl + Shift + V (Windows) or ⌘ + Shift + V (Mac) pastes without formatting in many apps. Perfect for copying from the web into a document.",
    "Double-click a word to select it. Triple-click to select the entire paragraph.",
    "Ctrl + D (Windows) or ⌘ + D (Mac) duplicates the current line in many code editors and word processors.",
    "Ctrl + Backspace (Windows) or ⌘ + Backspace (Mac) deletes the previous entire word instead of just a single character.",
    "Alt + Tab (Windows) or ⌘ + Tab (Mac) lets you quickly switch between open applications.",
    "Ctrl + A (Windows) or ⌘ + A (Mac) selects all text in a document or page in just one step.",
    "You can drag and drop text in many text editors to move it around easily.",
    "Windows Key + L (Windows) or Ctrl + ⌘ + Q (Mac) quickly locks your computer. Perfect for stepping away from your desk.",
    "Use Windows + Left/Right Arrow (Windows) or Control + ⌘ + F (Mac) to snap windows to the sides or full screen for multitasking.",
  ];

  let currentTipIndex = 0;

  // Function to update the modal content with the current tip
  function updateTipContent() {
    tipContent.textContent = tips[currentTipIndex];
    prevTip.disabled = currentTipIndex === 0; // Disable "Prev" if at the first tip
    nextTip.disabled = currentTipIndex === tips.length - 1; // Disable "Next" if at the last tip
  }

  // Show the modal when the tip icon is clicked
  tipBtn.addEventListener("click", () => {
    tipModal.classList.remove("hidden");
    updateTipContent(); // Show the first tip
  });

  // Close the modal
  closeModal.addEventListener("click", () => {
    tipModal.classList.add("hidden");
  });

  // Hide the modal if clicked outside of the modal content
  window.addEventListener("click", (event) => {
    if (event.target === tipModal) {
      tipModal.classList.add("hidden");
    }
  });

  // Navigate to the previous tip
  prevTip.addEventListener("click", () => {
    if (currentTipIndex > 0) {
      currentTipIndex--;
      updateTipContent();
    }
  });

  // Navigate to the next tip
  nextTip.addEventListener("click", () => {
    if (currentTipIndex < tips.length - 1) {
      currentTipIndex++;
      updateTipContent();
    }
  });
});
