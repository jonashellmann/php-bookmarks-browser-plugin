function buttonClicked() {
	var getSettings =  browser.storage.local.get("settings");
	getSettings.then((res) => {
		const {settings} = res;
		var baseurl = settings.baseurl;
		if(baseurl === 'http://example.com/bookmarks/') {
			browser.runtime.openOptionsPage();
		}
	});
}

function postData(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    credentials: 'same-origin',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
  })
  .then(response => response.json())
}

function handleInstalled(details) {
	if(details.reason=="install") {
		browser.storage.local.set({
            settings: {
                baseurl: 'http://example.com/bookmarks/',
                username: 'user'
            },
        });
	}
}

function onUpdateSettings(settings) {
	var url = settings.baseurl + '?username=' + settings.username;
	if(url !== 'http://example.com/bookmarks/') {
		browser.browserAction.setPopup({popup: url});
	}
	else {
		browser.browserAction.setPopup({popup: ''});
	}
    
}

browser.browserAction.onClicked.addListener(buttonClicked);
browser.runtime.onInstalled.addListener(handleInstalled);
browser.runtime.onMessage.addListener(msg => {
    if(msg.type == "settings-updated") {
        const {settings} = msg.message;
        onUpdateSettings(settings);
    }
});
var getSettings = browser.storage.local.get("settings"); 
getSettings.then((res) => { 
	const {settings} = res; 
	onUpdateSettings(settings); 
});
