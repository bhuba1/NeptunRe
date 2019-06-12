//document.body.style.border = "5px solid red";
console.log('Hello There!');


var enabled = false;
var delay = 5000;


/*
On startup, check whether we have stored settings.
If we don't, then store the default settings.
*/
var re;

browser.storage.local.get()
    .then((storedSettings) => {
      // if there are stored settings
      console.log("STORED: " + storedSettings.enabled);
      if (storedSettings.enabled !== undefined)enabled = storedSettings.enabled;
      

    })
    .catch(()=> {
      console.log("Error retrieving stored settings");
    });



re = setTimeout(function(){
  console.log("EN: " + enabled);
  if(enabled) {
    window.location.reload(1);
  }

}, delay);




function clear(e) {
	var key = e.which;
	
	clearTimeout(re);
  console.log('Stopped refreshing!');
}


//document.addEventListener('keypress', clear);
//document.addEventListener('click', clear);


function start() {
  
  browser.storage.local.set({enabled:true});
  console.log("Started refreshing");
  window.location.reload(1);
}

function stop() {

  browser.storage.local.set({enabled:false});
  console.log('Stopped refreshing!');
  clearTimeout(re);
}

/**
 * Listen for messages from the background script.
 * 
*/
browser.runtime.onMessage.addListener((message) => {
  if (message.command === "start") {
    
    start();

  } else if (message.command === "stop") {

    stop();
  }
  //console.log("ASDASDA");
});
console.log("END OF FILE");