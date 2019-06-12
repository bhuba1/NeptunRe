document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            if(i == 0) {
                location = "https://github.com/bhuba1";
            }
            ln.onclick = function () {
                browser.tabs.create({active: true, url: location});
            };
        })();
    }
});