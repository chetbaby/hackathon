chrome.runtime.onInstalled.addListener(function() {
  console.log("The color is green.");
});

chrome.commands.onCommand.addListener(command => {
  if (command === "pin-tab") {
    console.log("pin tab works!");
    chrome.tabs.query({ active: true }, function(tab) {
      chrome.tabs.update(tab[0].id, { pinned: true });
    });
  }

  if (command === "close-tabs") {
    chrome.tabs.query({ pinned: false }, function(tab) {
      tab.forEach(function(el) {
        chrome.tabs.remove(el.id);
      });
    });
  }
});

let closeUnpinnedTabs = {
  id: "CloseUnpinnedTabs",
  title: "CloseUnpinnedTabs",
  contexts: ["all"]
};
chrome.contextMenus.create(closeUnpinnedTabs);
