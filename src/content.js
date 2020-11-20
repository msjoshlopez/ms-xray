window.onload = () => {
    msScriptCheck();
}

function msScriptCheck() {
    let msScriptURL = "https://api.memberstack.io/static/memberstack.js";
    let pageScripts = document.getElementsByTagName("script");
    let msScriptFound = false;
    let msScripts = [];
    let msScriptVersions = [];
    let msIDs = [];
    let msAttributesFound = 0;
    let msLinksFound = 0;
    let msFormsFound = 0;


    for (pageScript of pageScripts) {
        if (pageScript.src.indexOf(msScriptURL) != -1) {
            msScriptFound = true;
            msScripts.push(pageScript.src);
            msIDs.push(pageScript.getAttribute("data-memberstack-id"));
            msIDs = [...new Set(msIDs)];
        }
     }

     if (msScriptFound) {
        for (msScript of msScripts) {
            // get the version of memberstack script from the array of scripts on the page
            msScript = msScript.split("?"); 
            msScriptVersions.push(msScript[msScript.length - 1]);
            // remove all duplicate versions from the array
            msScriptVersions = [...new Set(msScriptVersions)];
        }

        let msScriptMessage = {
            msScriptFound: msScriptFound,
            msScripts: msScripts.length,
            msScriptVersions: msScriptVersions,
            msIDs: msIDs,
            msAttributesFound: msAttributesFound,
            msLinksFound: msLinksFound,
            msFormsFound: msFormsFound
        };
        console.log(msScriptMessage);
    
        chrome.runtime.sendMessage(msScriptMessage);
     }

}

chrome.runtime.onMessage.addListener(messageReceived);

// messages in popup.js
// highlightLinks
// highlightAttributes
// highlightForms
function messageReceived(message, sender, sendResponse) {
    console.log(message);
    if (message.highlightLinks) {
        // TODO: highlight all the elements with memberstack links on the page
        console.log("highlight all ms links");
    } else if (message.highlightAttributes) {
        // TODO: highlight all the elements with memberstack data attributes
        console.log("highlight all ms attributes");
    } else if (message.highlightForms) {
        // TODO: hightlight all the memberstack form elements on the page
        console.log("highlight all ms forms");
    }
}