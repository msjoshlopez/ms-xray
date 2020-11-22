// runs as soon as extension is installed or refreshed
chrome.runtime.onInstalled.addListener(() => {
    console.log("MS Xray extension installed or refreshed");
});