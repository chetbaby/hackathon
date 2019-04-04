chrome.runtime.onInstalled.addListener(function() {
  console.log("The color is green.");
});

let allPinned = false;

chrome.commands.onCommand.addListener(command => {
  if (command === "pin-tab") {
    console.log("pin tab works!");
    chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
      console.log(tab);
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

  if (command === "(un)pin-all") {
    console.log("hi");
    chrome.tabs.query({ currentWindow: true }, function(tab) {
      tab.forEach(function(el) {
        chrome.tabs.update(el.id, { pinned: true });
      });
    });
  }
  //TODO: insert unpin-all

  // if (command === "unpin-all") {
  //   console.log("hi");
  //   chrome.tabs.query({ currentWindow: true }, function (tab) {

  //     tab.forEach(function(el) {
  //       chrome.tabs.update(el.id, { pinned: true });
  //     });
  //   });
  // }
});

let closeUnpinnedTabs = {
  id: "closeUnpinnedTabs",
  title: "closeUnpinnedTabs",
  contexts: ["all"]
};
chrome.contextMenus.create(closeUnpinnedTabs);

chrome.contextMenus.onClicked.addListener(function(clicked) {
  if (clicked.menuItemId === "closeUnpinnedTabs") {
    chrome.tabs.query({ pinned: false }, function(tab) {
      tab.forEach(function(el) {
        chrome.tabs.remove(el.id);
      });
    });
  }
});
