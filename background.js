var test = "Test Value";

browser.browserAction.onClicked.addListener((tab) => {
  
  console.log("HALLO");
});
var id = browser.extension.getURL("");

console.log(id);
