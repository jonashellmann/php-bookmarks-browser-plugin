function buttonClicked() {
	var getSettings =  browser.storage.local.get("settings");
	getSettings.then((res) => {
		const {settings} = res;
		var baseurl = settings.baseurl;
		if(baseurl !== "http://example.com/bookmarks/") {
            var querying = browser.tabs.query({url: baseurl + "*"});
            querying.then((tab) => {
                if(tab.length > 0) {
                    browser.tabs.update(tab[0].id, { active: true })
                } else {
                    browser.tabs.create({url:baseurl, active:true});
                }});
        } else {
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

browser.browserAction.onClicked.addListener(buttonClicked);
browser.runtime.onInstalled.addListener(handleInstalled);