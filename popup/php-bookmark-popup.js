var div = document.getElementById('popup-content');

let p = document.createElement("p");

/*var request = new XMLHttpRequest();
var url = "https://jonas-hellmann.de/bookmarks/api";
var params = "op=categorys&sessionid=1";

request.open("GET", url, true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.send(params);*/

p.innerHTML = "Test";
div.append(p);

/* 
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
https://developer.mozilla.org/de/Add-ons/SDK/Guides/Content_Scripts#Cross-domain_Content_Skripts
https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Add-on_SDK/Guides/Content_Scripts/Cross_Domain_Content_Scripts
https://developer.mozilla.org/de/docs/Web/API/MessagePort
*/