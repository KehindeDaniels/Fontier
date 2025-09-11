// console.log("contentScript.js is running");
// document.addEventListener("mouseup", function () {
//   const selectedText = window.getSelection().toString().trim();
//   if (selectedText.length > 0 && window.getSelection().rangeCount > 0) {
//     const toolbar =
//       document.getElementById("fontier-toolbar") || createToolbar();
//     positionToolbar(toolbar);
//     showToolbar(toolbar, selectedText);
//   }
// });

// function createToolbar() {
//   const toolbar = document.createElement("div");
//   toolbar.id = "fontier-toolbar";
//   toolbar.innerHTML =
//     '<button id="fontier-bold">B</button><button id="fontier-italic">I</button>';
//   document.body.appendChild(toolbar);
//   toolbar.style.display = "none"; // Start hidden
//   return toolbar;
// }

// function positionToolbar(toolbar) {
//   const selection = window.getSelection();
//   const range = selection.getRangeAt(0);
//   const rect = range.getBoundingClientRect();
//   toolbar.style.position = "absolute";
//   toolbar.style.top = `${rect.top + window.scrollY - 40}px`;
//   toolbar.style.left = `${rect.left + window.scrollX}px`;
//   toolbar.style.display = "block";
// }

// function showToolbar(toolbar, text) {
//   document.getElementById("fontier-bold").onclick = function () {
//     replaceSelectedText(boldify(text));
//   };
//   document.getElementById("fontier-italic").onclick = function () {
//     replaceSelectedText(italicize(text));
//   };
// }

// function boldify(text) {
//   return text
//     .split("")
//     .map((char) => boldMap[char] || char)
//     .join("");
// }

// function italicize(text) {
//   return text
//     .split("")
//     .map((char) => italicMap[char] || char)
//     .join("");
// }

// function replaceSelectedText(styledText) {
//   const selection = window.getSelection();
//   if (!selection.rangeCount) return;
//   const range = selection.getRangeAt(0);
//   range.deleteContents();
//   range.insertNode(document.createTextNode(styledText));
// }

// // Additional CSS for the toolbar
// const style = document.createElement("style");
// style.textContent = `
//   #fontier-toolbar {
//     padding: 4px;
//     background-color: white;
//     border: 1px solid black;
//     border-radius: 4px;
//     box-shadow: 0px 0px 5px rgba(0,0,0,0.5);
//     z-index: 1000;
//   }
//   #fontier-toolbar button {
//     background: none;
//     border: none;
//     cursor: pointer;
//     font-size: 16px;
//     margin: 0 4px;
//   }
// `;
// document.head.appendChild(style);
