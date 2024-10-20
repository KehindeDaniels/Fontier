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
        "bg-fontIconLight",
        "dark:bg-blue-500",
        "text-white",
        "rounded"
      );
    } else {
      button.classList.remove(
        "bg-fontIconLight",
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
