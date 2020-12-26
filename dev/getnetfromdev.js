console.log("getdnetfromdev.js loaded")
var port = browser.runtime.connect({name: 'devtools'});

browser.devtools.panels.create(
    "Web Performance Meausrement for Firefox",                      // title
    "../icons/webperf.png",                // icon
    "getnet.html"      // content
  ).then((newPanel) => {
      console.log("Devtools made")
  });

port.onMessage.addListener(function(response) {
    if (response.msg =="onload") {
        console.log("Received message from background to devtool")
        var har = browser.devtools.network.getHAR(function(harLog) {
            if(harLog) {
                console.log("got HAR file");
                // downloadHAR(harLog)
            }
            else console.log("didn't get HAR file")

            let updatedHarLog={};
            updatedHarLog = harLog;
            let harBLOB = new Blob([JSON.stringify(updatedHarLog)]);
            console.log(harBLOB)
            port.postMessage(harBLOB);
        });
    }
    // Write information to the panel, if exists.
    // If we don't have a panel reference (yet), queue the data.
});


function handleMessage(request, sender, sendResponse) {
console.log(request)
}
  
browser.runtime.onMessage.addListener(handleMessage);