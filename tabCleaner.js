chrome.runtime.onInstalled.addListener(function() {
  /* chrome.storage.sync.set({ color: "#3aa757" } */
  console.log("The color is green.");
});

// console.log(chrome.commands);
// console.log(chrome.runtime);
// console.log(chrome.browserAction);
// console.log(chrome);
// console.log(chrome);
// console.log(chrome.commands);
// console.log(chrome.commands.getAll());
chrome.commands.onCommand.addListener(command => console.log(command));
// chrome.commands.onCommand.addListener(function(command) {
// console.log("hi");
// });
