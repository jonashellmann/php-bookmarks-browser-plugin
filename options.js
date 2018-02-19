var getSettings =  browser.storage.local.get("settings");
getSettings.then((res) => {
	const {settings} = res;
	
	document.querySelector("#baseurl").value = settings.baseurl;
	document.querySelector("#login").value = settings.username;
});

function saveOptions(e) {
	var baseurl = document.querySelector("#baseurl").value;
    if (baseurl.substr(-1) != '/') {
        baseurl = baseurl + '/'; 
    }
	
    var settings = {
        settings: {
            baseurl: baseurl,
            username: document.querySelector("#login").value
        },
    };
    
    var result = browser.storage.local.set(settings);
    browser.runtime.sendMessage({
        type: "settings-updated",
        message: settings,
    });    
    e.preventDefault();
}

document.querySelector("form").addEventListener("submit", saveOptions);