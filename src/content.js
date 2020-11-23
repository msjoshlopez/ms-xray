console.log("MS Xray content.js has loaded");

//declare global variables
let msFormAttributes
let msMemberAttributes

function msScriptCheck() {
    const msScriptURL = "https://api.memberstack.io/static/memberstack.js";
    const pageScripts = document.getElementsByTagName("script");
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
        for (const msScript of msScripts) {
            // get the version of memberstack script from the array of scripts on the page
            const split = msScript.split("?");
            if (split.length === 1) {
                msScriptVersions.push("No platform specified")
            } else {
                msScriptVersions.push(split[split.length - 1]);
                // remove all duplicate versions from the array
                msScriptVersions = [...new Set(msScriptVersions)];
            }
        }
    }

    // get all the ms attributes on page and add them to msAttributesFound to show count in popup
    msMemberAttributes = document.querySelectorAll('[data-ms-member],[data-ms-content],[data-ms-membership]');
    for (const msMemberAttribute of msMemberAttributes) {
        msAttributesFound.push(msMemberAttribute);
        console.log("msAttributesFound " + msMemberAttribute);
    };

    // get all the ms forms on page
    msFormAttributes = document.querySelectorAll('[data-ms-form]');
    for (const msFormAttribute of msFormAttributes) {
        msFormsFound.push(msFormAttribute);
        console.log("msFormsFound " + msFormAttribute);
    };

    // get all the ms links on page
    // #/ms

    const msScriptMessage = {
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

function msHighlightLinks() {
    console.log("todo: highlight all links on page");
}

function msHighlightAttributes() {
	for (const msAttribute of msMemberAttributes) {
		msAttribute.style.border = "thick solid #FDFF47";
	};
}

function msHighlightForms() {
  for (const msFormAttribute of msFormAttributes) {
    msFormAttribute.style.border = "thick solid #FDFF47";
  };
}

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
        msHighlightLinks();
    } else if (message.highlightAttributes) {
        // TODO: highlight all the elements with memberstack data attributes
        console.log("highlight all ms attributes");
        msHighlightAttributes();
    } else if (message.highlightForms) {
        console.log("highlight all ms forms");
        msHighlightForms();
    }
}
chrome.runtime.onMessage.addListener(messageReceived);