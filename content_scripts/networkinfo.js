var site = ""
var first = false;

//ORIGINAL
window.addEventListener('load',function(e){
  console.log("Page Loaded")
  var sending = browser.runtime.sendMessage({
    msg: "onload",
    sender: "content"
  });
  
  setTimeout(function(){
    console.log("calculate AATF after 2 sec")
    calculateATF()
  }, 2000);  
});
