chrome.runtime.onInstalled.addListener(function() {
  console.log("Tabulous is running!");
});

// > Listen for Commands

chrome.commands.onCommand.addListener(command => {
  if (command === "pin-tab") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
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
    chrome.tabs.query({ currentWindow: true }, function(tab) {
      tab.forEach(function(el) {
        if (el.pinned === false) {
          chrome.tabs.update(el.id, { pinned: true });
        } else
          tab.forEach(function(el) {
            chrome.tabs.update(el.id, { pinned: false });
          });
      });
    });
  }
});

// > Context Menu Items

let closeUnpinnedTabs = {
  id: "closeUnpinnedTabs",
  title: "Close Unpinned Tabs",
  contexts: ["all"]
};

let pinAllToggle = {
  id: "pinToggle",
  title: "(Un)pin-all",
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

  // ! Depracated
  // chrome.contextMenus.create(pinAllToggle);

  // if (clicked.menuItemId === "pinToggle") {
  //   chrome.tabs.query({ currentWindow: true }, function(tab) {
  //     tab.forEach(function(el) {
  //       if (el.pinned === false) {
  //         chrome.tabs.update(el.id, { pinned: true });
  //       } else
  //         tab.forEach(function(el) {
  //           chrome.tabs.update(el.id, { pinned: false });
  //         });
  //     });
  //   });
  // }
});
