function buttonClicked() {
	postData('https://example.de/api/', {'op':'categorys', 'username':'username', 'password':'password'})
		.then(data => console.log(data))
		.catch(error => console.error(error))
	
	browser.tabs.create({url:"https://example.de/", active:true});
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

browser.browserAction.onClicked.addListener(buttonClicked);