var __IS_DEBUG__ = true;

if (__IS_DEBUG__)
	console.log("Input success!");

var d = new Data();
var request = {
	greeting: "hello", 
	info	: d.getInfo() 
};

if (__IS_DEBUG__) 
{
	console.log('new Data: %o', d);
	console.log('Send request with %o', request);
}
chrome.extension.sendRequest(request,
	function (response) {
		if (__IS_DEBUG__)
			console.log('Receive response with %o', response);
	}
);

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

