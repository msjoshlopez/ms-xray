// runs as soon as extension is installed or refreshed
chrome.runtime.onInstalled.addListener(() => {
    console.log("MS Xray extension installed or refreshed");
});

chrome.browserAction.onClicked.addListener(function(activeTab) {
    console.log("boom")
    chrome.tabs.executeScript(null, {file: "content.js"});
});



// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//     console.log("Whoa somethign happened")
//     chrome.browserAction.setBadgeText({text: 'ON'});
//     chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
//   });

