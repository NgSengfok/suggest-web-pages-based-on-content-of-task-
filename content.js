var __DEBUG__ = {
	output : false,
	classes : {
		page : {
			output : true,
			methods : {
				page : true,
				sendRequest : true
			}
		},
		data : {
			output : true,
			methods: { 
				data : true,
				getMetaTagWithName : true,
				getMetaObj : true,
				getInfo : true
			}	
		}
	}
}

/**
 * @param function callback
 */
function ConsoleLog(obj, callback)
{
	if (! __DEBUG__.output) return;

	var debug_classes = __DEBUG__.classes;
	var debug_class = debug_classes[obj.class]; 	
	/*
	console.log('debug_classes: %o', debug_classes);
	console.log('debug_class: %o', debug_class);
	*/
	if (! debug_class) return;
	if (! debug_class.output) return;

	var debug_methods = debug_class.methods;
	/*
	console.log('debug_methods: %o', debug_methods);
	*/
	if (! debug_methods) return;

	if (debug_methods[obj.method])
	{
		callback();
	}
}

if (__DEBUG__.output)
	console.log("Input success!");

function Data()
{
	var getMetaTagWithName = function ()
		{
			var meta_tags = document.getElementsByTagName('meta'),
				meta_name = new Array();

			for (var i = 0, size = meta_tags.length; i < size; i++)
			{
				var meta_tag = meta_tags[i];

				if (meta_tag.name) meta_name.push(meta_tag);
			}

			ConsoleLog({class: 'data', method: 'getMetaTagWithName'}, function () {
				console.log('all <meta name="*" /> tags: %o', meta_name);
			});

			return meta_name;
		};

	function data()
	{
		this.meta = this.getMetaObj();
		this.title = document.title;
	}

	data.prototype.getMetaObj = function ()
	{
		var meta_tags = getMetaTagWithName(),
			meta_obj = {};

		for (var i = 0, size = meta_tags.length; i < size; i++)
		{
			var meta_tag = meta_tags[i];

			meta_obj[meta_tag.name] = meta_tag.content;
		}

		ConsoleLog({class: 'data', method: 'getMetaObj'}, function () {
			console.log('meta object: %o', meta_obj);
		});

		return meta_obj;
	};

	data.prototype.getInfo = function ()
	{
		return {
			title: this.title,
			meta: this.meta
		};
	};
	
	return new data();
}

function Page()
{
	function page()
	{	
		this.data = new Data();
		
		ConsoleLog({class: 'page', method: 'page'}, function () {
			console.log('Page init new Data: %o', this.data);
		});
	}

	page.prototype.sendRequest = function (req)
	{
		var request = req || {
			greeting: "hello", 
			// info	: this.data.getInfo() 
		};

		ConsoleLog({class: 'page', method: 'sendRequest'}, function () {
			console.log('Send request with %o', request);
		});

		chrome.extension.sendRequest(request,
			function (response) {
				ConsoleLog({class: 'page', method: 'sendRequest'}, function () {
					console.log('Receive response with %o', response);
				});
			}
		);
	};

	return new page();
}

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	console.log('Receive request(%o) from sender(%o)', request, sender);
	var d = new Data();
	sendResponse(d.getInfo());
});
// var p = new Page();
// p.sendRequest();
