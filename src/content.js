console.log("MS Xray content.js has loaded");

function msScriptCheck() {
    let msScriptURL = "https://api.memberstack.io/static/memberstack.js";
    let pageScripts = document.getElementsByTagName("script");
    let msScriptFound = false;
    let msScripts = [];
    let msScriptVersions = [];
    let msIDs = [];
    let msAttributesFound = [];
    let msLinksFound = [];
    let msFormsFound = [];

    for (pageScript of pageScripts) {
        if (pageScript.src.indexOf(msScriptURL) != -1) {
            msScriptFound = true;
            msScripts.push(pageScript.src);
            msIDs.push(pageScript.getAttribute("data-memberstack-id"));
            msIDs = [...new Set(msIDs)];
        }
    }

    if (msScripts.length > 0) {
        for (msScript of msScripts) {
            // get the version of memberstack script from the array of scripts on the page
            msScript = msScript.split("?");
            msScriptVersions.push(msScript[msScript.length - 1]);
            // remove all duplicate versions from the array
            msScriptVersions = [...new Set(msScriptVersions)];
        }
    }

    // get all the ms attributes on page and add them to msAttributesFound to show count in popup
    let msMemberAttributes = document.querySelectorAll('[data-ms-member]');
    for (msMemberAttribute of msMemberAttributes) {
        msAttributesFound.push(msMemberAttribute);
        console.log("msAttributesFound " + msMemberAttribute);
    };

    let msContentAttributes = document.querySelectorAll('[data-ms-content]');
    for (msContentAttribute of msContentAttributes) {
        msAttributesFound.push(msContentAttribute);
        console.log("msAttributesFound " + msContentAttribute);
    };

    let msMembershipAttributes = document.querySelectorAll('[data-ms-membership]');
    for (msMembershipAttribute of msMembershipAttributes) {
        msAttributesFound.push(msMembershipAttribute);
        console.log("msAttributesFound " + msMembershipAttribute);
    };

    // get all the ms forms on page
    let msFormAttributes = document.querySelectorAll('[data-ms-form]');
    for (msFormAttribute of msFormAttributes) {
        msAttributesFound.push(msFormAttribute);
        console.log("msAttributesFound " + msFormAttribute);
        msFormsFound.push(msFormAttribute);
        console.log("msFormsFound " + msFormAttribute);
    };

    // get all the ms links on page
    // #/ms

    let msScriptMessage = {
        msScriptFound: msScriptFound,
        msScripts: msScripts.length,
        msScriptVersions: msScriptVersions,
        msIDs: msIDs,
        msAttributesFound: msAttributesFound.length,
        msLinksFound: msLinksFound.length,
        msFormsFound: msFormsFound.length
    };
    console.log(msScriptMessage);

    chrome.runtime.sendMessage(msScriptMessage);
}

function msHighlightAttributes() {
    console.log("highlight all attributes on page");
}

chrome.runtime.onMessage.addListener(messageReceived);

// messages in popup.js
// highlightLinks
// highlightAttributes
// highlightForms
function messageReceived(message, sender, sendResponse) {
    console.log(message);
    if (message.scanPage) {
        console.log("scan the page");
        msScriptCheck();
    } else if (message.highlightLinks) {
        // TODO: highlight all the elements with memberstack links on the page
        console.log("highlight all ms links");
        msHighlightAttributes();
    } else if (message.highlightAttributes) {
        // TODO: highlight all the elements with memberstack data attributes
        console.log("highlight all ms attributes");
    } else if (message.highlightForms) {
        // TODO: hightlight all the memberstack form elements on the page
        console.log("highlight all ms forms");
    }
}