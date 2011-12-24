var __IS_DEBUG__ = true;

var __DEBUG__ = {
	output : true,
	class : {
		Page : {
			output : true,
			methods : {
				page : true,
				sendRequest : true
			}
		},
		Data : {
			output : true,
			methods: { 
				data : true,
				getElementsByTagName : true,
				getMetaObj : true,
				getInfo : true
			}	
		}
	}
}

if (__IS_DEBUG__)
	console.log("Input success!");

function Data()
{
	var __DEBUG_METHOD_GETMETAOBJ__ = false,
		__DEBUG_METHOD_GETMETATAGWITHNAME__ = false,
		getMetaTagWithName = function ()
		{
			var meta_tags = document.getElementsByTagName('meta'),
				meta_name = new Array();

			for (var i = 0, size = meta_tags.length; i < size; i++)
			{
				var meta_tag = meta_tags[i];

				if (meta_tag.name) meta_name.push(meta_tag);
			}

			if (__IS_DEBUG__ && __DEBUG_METHOD_GETMETATAGWITHNAME__)
				console.log('all <meta name="*" /> tags: %o', meta_name);

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

		if (__IS_DEBUG__ && __DEBUG_METHOD_GETMETAOBJ__)
			console.log('meta object: %o', meta_obj);

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
	var __DEBUG_METHOD_SENDREQUEST__ = true,
		__DEBUG_PAGE_CONSTRUCT__ = true;

	function page()
	{	
		this.data = new Data();

		if (__IS_DEBUG__ && __DEBUG_PAGE_CONSTRUCT__) 
			console.log('Page init new Data: %o', this.data);
	}

	page.prototype.sendRequest = function (req)
	{
		var request = req || {
			greeting: "hello", 
			info	: this.data.getInfo() 
		};

		if (__IS_DEBUG__ && __DEBUG_METHOD_SENDREQUEST__) 
			console.log('Send request with %o', request);

		chrome.extension.sendRequest(request,
			function (response) {
				if (__IS_DEBUG__ && __DEBUG_METHOD_SENDREQUEST__) 
					console.log('Receive response with %o', response);
			}
		);
	};

	return new page();
}

var p = new Page();
p.sendRequest();
