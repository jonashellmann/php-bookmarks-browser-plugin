function saveOptions(e) {
	var baseurl = document.querySelector("#baseurl").value;
    if (baseurl.substr(-1) != '/') {
        baseurl = baseurl + '/'; 
    }
	
    var settings = {
        settings: {
            baseurl: baseurl,
            login: document.querySelector("#login").value
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