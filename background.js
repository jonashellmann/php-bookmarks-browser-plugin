function test() {
	browser.tabs.create({url:"https://bookmarks.example.com/", active:true});
}

browser.browserAction.onClicked.addListener(test);