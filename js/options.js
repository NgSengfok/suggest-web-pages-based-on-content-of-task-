function Option()
{
	var addPluginDisableEvent = function () 
		{	
			$$('#plugin-work .plugin-work-radio').each(function (element) {
				element.observe('click', function () {
					var radio_input = $$('#plugin-work .plugin-work-radio:checked').first(),
						radio_value = parseInt(radio_input.value);
					
					console.log('Current work enable or disable is equal to %o', radio_value);

					if (radio_value) { console.log('click enable'); }
					else { console.log('click disable'); }
				});	
			});
		},
		addEvents = function () 
		{
			addPluginDisableEvent();
		},
		initOptionsPage = function () 
		{

		};

	function option()
	{
		initOptionsPage();
		addEvents();
	}

	return new option();
};
