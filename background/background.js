
var Port;

var aatfDownloadFinished = false
var harDownloadFinished = false
function handleMessage(request, sender, sendResponse) {
    console.log("Message from the content script: " +request.msg);
    if(request.msg == "onload" && request.sender == "content"){
        Port.postMessage({ msg: "onload" });
    }
    else if (request.msg == "aatf"){
        let url = URL.createObjectURL(request.data);
        var download = 1;
        chrome.downloads.download({
            url: url,
            filename: "aatf.json"
        });
        console.log("aatf download result:", download)
        checkandFinishAll(download, "aatf")
    }
    
}

function onError(error) {
    console.error(`Error: ${error}`);
  }

browser.runtime.onConnect.addListener(function(port) {
    if (port.name == "devtools"){
        Port = port
        
        Port.onMessage.addListener(function(msg) {
            // Received message from devtools. Do something:
        
            let url = URL.createObjectURL(msg);
            var download = chrome.downloads.download({
                url: url,
                filename:"har.json"
            });

            console.log("har download result:", download)
            checkandFinishAll(download,"har")
        }); 
    }
});


browser.runtime.onMessage.addListener(handleMessage);
