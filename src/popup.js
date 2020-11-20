window.onload = function() {
    let msScriptFoundElmnt = document.getElementById("msScriptFound");
    let msScriptVersionElmnt = document.getElementById("msScriptVersion");
    let msScriptIDElmnt = document.getElementById("msScriptID");

    let highlightAttributesElmnt = document.getElementById("highlightAttributes");
    let highlightLinksElmnt = document.getElementById("highlightLinks");
    let highlightFormsElmnt = document.getElementById("highlightForms");

    highlightAttributesElmnt.onclick = msHighlightAttributes;
    highlightLinksElmnt.onclick = msHighlightLinks;
    highlightFormsElmnt.onclick = msHighlightForms;


    let queryParams = {
        active: true,
        currentWindow: true
    };

// messages to send content.js
// highlightLinks
// highlightAttributes
// highlightForms

    function msHighlightAttributes() {
        chrome.tabs.query(queryParams, getTabs);

        function getTabs(tabs) {
            let message = { highlightAttributes: true};
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    };

    function msHighlightLinks() {
        chrome.tabs.query(queryParams, getTabs);

        function getTabs(tabs) {
            let message = { highlightLinks: true};
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    };

    function msHighlightForms() {
        chrome.tabs.query(queryParams, getTabs);

        function getTabs(tabs) {
            let message = { highlightForms: true};
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    };

    chrome.runtime.onMessage.addListener(receiver);

    function receiver(message, sender, sendResponse) {
        console.log(message);
        if (message.msScriptFound) {
            console.log("yes I found Memberstack script");
            msScriptFoundElmnt.innerHTML = message.msScripts;
            if (message.msScripts > 1) {
                msScriptFoundElmnt.classList.add("--error-text");
            }
            msScriptVersionElmnt.innerHTML = message.msScriptVersions;
            msScriptIDElmnt.innerHTML = message.msIDs;
            // chrome.browserAction.setBadgeText({text: 'ON'});
            // chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
        } else {
            console.log("no Memberstack script found");
            // chrome.browserAction.setBadgeText({text: 'OFF'});
            // chrome.browserAction.setBadgeBackgroundColor({color: '#FF0000'});
        }
    }

}

