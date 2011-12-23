console.log("Input success!");

	chrome.extension.sendRequest({greeting: "hello"}, function (response) {
		console.log('response %o', response);
		console.log(response.farewell);
	});

