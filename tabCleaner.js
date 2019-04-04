chrome.runtime.onInstalled.addListener(function() {
  /* chrome.storage.sync.set({ color: "#3aa757" } */
  console.log("The color is green.");
});

console.log(chrome.commands);
console.log(chrome.runtime);
// console.log(chrome.browserAction);
// console.log(chrome);
// console.log(chrome);

chrome.commands.onCommand.addListener(function(command) {
  if (command === "pin-tab") {
    console.log("hi");
  }
});
