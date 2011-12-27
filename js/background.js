function Plugin() 
{
	var tabsOnUpdatedFunction = function(tab_id, change_info, tab) 
		{
			console.log('updated tab(status: %o)', change_info.status);
			console.log('tab id: %o; chang info: %o; tab: %o', tab_id, change_info, tab);
			if (change_info.status == 'complete')
			{
				var request = {operate: 'get-page-info'};

				console.log('Send request(%o) to tab(%o)', request, tab.id);

				chrome.tabs.sendRequest(tab.id, request, function (response) {
					console.log('Receive response: %o', response);	
				});
			}
		};	

	function plugin()
	{

	};

	plugin.prototype.isable = function ()
	{	
		return chrome.tabs.onUpdated.hasListener(tabsOnUpdatedFunction);
	};

	plugin.prototype.enable = function ()
	{	
		if (! this.isable())
		{
			chrome.tabs.onUpdated.addListener(tabsOnUpdatedFunction);
			console.log('plugin is enabled now!');
		}
		else 
		{
			console.log('plugin is enabled.');
		}
	};

	plugin.prototype.disable = function () 
	{
		if (this.isable())
		{
			chrome.tabs.onUpdated.removeListener(tabsOnUpdatedFunction);
			console.log('plugin is disable now!');
		}
		else 
		{
			console.log('plugin is disable.');	
		}
	};

	return new plugin();
};
