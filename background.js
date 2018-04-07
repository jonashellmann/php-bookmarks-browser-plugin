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
