import {
  boldMap,
  italicMap,
  boldItalicMap,
  strikethroughMap,
  boldStrikethroughMap,
  italicStrikethroughMap,
  boldItalicStrikethroughMap,
  underlineMap,
} from "../../../legacy/fontStyles.js";

document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const textOutput = document.getElementById("textOutput");
  const boldBtn = document.getElementById("boldBtn");
  const italicBtn = document.getElementById("italicBtn");
  const underlineBtn = document.getElementById("underlineBtn");
  const strikeBtn = document.getElementById("strikeBtn");
  const copyBtn = document.getElementById("copyBtn");
  const themeToggleBtn = document.getElementById("themeToggle");

  const styles = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  };

  const showToast = () => {
    const toast = document.createElement("div");
    toast.textContent = "Text copied!";
    toast.className =
      "fixed bottom-2 right-2 bg-blue-500 text-white p-2 rounded";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const updateTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    themeToggleBtn.innerHTML = isDark
      ? `<i class="fas fa-moon"></i>`
      : `<i class="fas fa-sun"></i>`;
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const loadTheme = () => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      themeToggleBtn.innerHTML = `<i class="fas fa-moon"></i>`;
    } else {
      document.documentElement.classList.remove("dark");
      themeToggleBtn.innerHTML = `<i class="fas fa-sun"></i>`;
    }
  };

  loadTheme();
  themeToggleBtn.addEventListener("click", updateTheme);

  const convertToStyledText = (text) =>
    text
      .split("")
      .map((char) => {
        if (
          styles.bold &&
          styles.italic &&
          styles.strikethrough &&
          boldItalicStrikethroughMap[char]
        )
          return boldItalicStrikethroughMap[char];
        if (styles.bold && styles.strikethrough && boldStrikethroughMap[char])
          return boldStrikethroughMap[char];
        if (
          styles.italic &&
          styles.strikethrough &&
          italicStrikethroughMap[char]
        )
          return italicStrikethroughMap[char];
        if (styles.bold && styles.italic && boldItalicMap[char])
          return boldItalicMap[char];
        if (styles.bold && boldMap[char]) return boldMap[char];
        if (styles.italic && italicMap[char]) return italicMap[char];
        if (styles.underline && underlineMap[char]) return underlineMap[char];
        if (styles.strikethrough && strikethroughMap[char])
          return strikethroughMap[char];
        return char;
      })
      .join("");

  const updateOutput = () => {
    textOutput.textContent = convertToStyledText(textInput.value);
  };

  const toggleStyle = (button, style) => {
    styles[style] = !styles[style];
    // Toggle the button's background color and text color should be white
    button.classList.toggle("text-white", styles[style]);
    button.classList.toggle("bg-blue-500", styles[style]);
    updateOutput();
  };

  boldBtn.addEventListener("click", () => toggleStyle(boldBtn, "bold"));
  italicBtn.addEventListener("click", () => toggleStyle(italicBtn, "italic"));
  underlineBtn.addEventListener("click", () =>
    toggleStyle(underlineBtn, "underline")
  );
  strikeBtn.addEventListener("click", () =>
    toggleStyle(strikeBtn, "strikethrough")
  );

  textInput.addEventListener("input", updateOutput);

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(textOutput.textContent).then(() => {
      // Change icon and text after successful copy
      copyBtn.innerHTML = `<i class="fas fa-check mr-1"></i> Copied!`;

      // Reset the button after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        copyBtn.innerHTML = `<i class="fas fa-copy mr-1"></i> Copy`;
      }, 2000); // 2 seconds
    });
  });
});
