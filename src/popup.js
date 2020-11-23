window.onload = function () {
  let tab1 = document.getElementById("tab1");
  let tab2 = document.getElementById("tab2");
  let tab3 = document.getElementById("tab3");

  // opens tab inside the popup not a tab in the browser
  function openTab(evt, tabContentID) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabContentID).style.display = "block";
    evt.currentTarget.className += " active";
  }

  tab1.onclick = function () {
    openTab(event, "tabContent1");
  };
  tab2.onclick = function () {
    openTab(event, "tabContent2");
  };
  tab3.onclick = function () {
    openTab(event, "tabContent3");
  };
  tab1.click();

  let msScriptsFoundElmnt = document.getElementById("msScriptsFound");
  let msScriptVersionElmnt = document.getElementById("msScriptVersion");
  let msScriptIDElmnt = document.getElementById("msScriptID");
  let msDataAttributesFoundElmnt = document.getElementById(
    "msDataAttributesFound"
  );
  let msLinksFoundElmnt = document.getElementById("msLinksFound");
  let msFormsFoundElmnt = document.getElementById("msFormsFound");

  let highlightAttributesElmnt = document.getElementById("highlightAttributes");
  let highlightLinksElmnt = document.getElementById("highlightLinks");
  let highlightFormsElmnt = document.getElementById("highlightForms");
  let scanPageElmnt = document.getElementById("scanPage");

  scanPageElmnt.onclick = msScanPage;
  highlightAttributesElmnt.onclick = msHighlightAttributes;
  highlightLinksElmnt.onclick = msHighlightLinks;
  highlightFormsElmnt.onclick = msHighlightForms;

  let queryParams = {
    active: true,
    currentWindow: true
  };

  // messages to send content.js
  // scanPage
  // highlightLinks
  // highlightAttributes
  // highlightForms

  function msScanPage() {
    function getTabs(tabs) {
      let message = {
        scanPage: true
      };
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
    chrome.tabs.query(queryParams, getTabs);
  }

  function msHighlightAttributes() {
    function getTabs(tabs) {
      let message = {
        highlightAttributes: true
      };
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
    chrome.tabs.query(queryParams, getTabs);
  }

  function msHighlightLinks() {
    function getTabs(tabs) {
      let message = {
        highlightLinks: true
      };
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
    chrome.tabs.query(queryParams, getTabs);
  }

  function msHighlightForms() {
    function getTabs(tabs) {
      let message = {
        highlightForms: true
      };
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
    chrome.tabs.query(queryParams, getTabs);
  }

  function receiver(message, sender, sendResponse) {
    console.log(message);
    // message from content.js
    // msScriptFound
    // msScripts
    // msScriptVersions
    // msIDs
    // msAttributesFound
    // msLinksFound
    // msFormsFound

    if (message.msScripts > 1) {
      msScriptsFoundElmnt.classList.add("--error-text");
    }

    if (!message.msScriptFound) {
      msScriptsFoundElmnt.classList.add("--error-text");
      msScriptsFoundElmnt.innerHTML = "No MS script found";
    }

    msScriptsFoundElmnt.innerHTML = message.msScripts;
    msScriptVersionElmnt.innerHTML = message.msScriptVersions;
    msScriptIDElmnt.innerHTML = message.msIDs;
    msDataAttributesFoundElmnt.innerHTML = message.msAttributesFound;
    msLinksFoundElmnt.innerHTML = message.msLinksFound;
    msFormsFoundElmnt.innerHTML = message.msFormsFound;
  }
  chrome.runtime.onMessage.addListener(receiver);
};
