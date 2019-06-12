console.log("Switcher here!");
function listenForClicks() {
  document.addEventListener("click", (e) => {

    // Sends a "start" message to the content script in the active tab.
    function start(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "start",
        });
      
    }

    // Sends a "stop" message to the content script in the active tab.
    function stop(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "stop",
      });
    }

    // Just log the error to the console.
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "start()" or "stop()" as appropriate.
     */
    if (e.target.classList.contains("start")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(start)
        .catch(reportError);
    }
    else if (e.target.classList.contains("stop")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(stop)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 **/
browser.tabs.executeScript({file: "main.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);