// Define application object and common functions.
var email;
var	USER_NAME = 1;
var app = (function()
{
	// Application object.
	var app = {};


	// Application data.
	app.currentScreenId = null;
	app.beaconColorStyles = [
		'style-color-unknown style-color-unknown-text',
		'style-color-mint style-color-mint-text',
		'style-color-ice style-color-ice-text',
		'style-color-blueberry-dark style-color-blueberry-dark-text',
		'style-color-white style-color-white-text',
		'style-color-transparent style-color-transparent-text'];
	app.proximityNames = [
		'unknown',
		'immediate',
		'near',
		'far'];

	// ------------- Private helper function ------------- //

	function myToJson(text){

		added = 1;
		result="";

		tmp = text.split(/[,:}{' ']/);

		for(var i=0; i < tmp.length; i++){
			if (tmp[i].length>0)
			{
				// window.alert(tmp[i]);
				result+="'"+tmp[i]+"'";
				if ((added % 2) == 1)
				{
					result+=": ";
				} else
				{
						result+=',';
				}
				added+=1;
			}
		}		

		result.slice(0,-1);

		return '{'+result.slice(0,-1)+'}'

	}

		function myToArray(text){

			result=[];
			tmp = text.split(/[\s,:}{']/);
			for(var i=0;i < tmp.length;i++){
				if (tmp[i].length>0)
				{
					result.push(tmp[i]);
				}
			}
			return result;
		}

  function onDeviceReady() {
        var element = document.getElementById('deviceProperties');
        element.innerHTML = 'Device Model: '    + device.model    + '<br />' +
                            'Device Cordova: '  + device.cordova  + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: '     + device.uuid     + '<br />' +
                            'Device Version: '  + device.version  + '<br />';


        var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");

				deviceInfo.get(function(result) {        		
        						element.innerHTML += result;
        						
        						// hlp = myToJson(result);
        						phoneData = myToArray(result);
   						      // window.alert(JSON.parse(hlp));
   						      email = phoneData[USER_NAME];

    		});                            
   
    }


	// ------------- Application functions ------------- //

	app.initialize = function()
	{
		window.alert("hello");
	}

	app.formatDistance = function(meters)
	{
		if (!meters) { return 'Unknown'; }

		if (meters > 1)
		{
			return meters.toFixed(3) + ' m';
		}
		else
		{
			return (meters * 100).toFixed(3) + ' cm';
		}
	};

	app.formatProximity = function(proximity)
	{
		if (!proximity) { return 'Unknown'; }

		// Eliminate bad values (just in case).
		proximity = Math.max(0, proximity);
		proximity = Math.min(3, proximity);

		// Return name for proximity.
		return app.proximityNames[proximity];
	};

	app.beaconColorStyle = function(color)
	{
		if (!color)
		{
			color = 0;
		}

		// Eliminate bad values (just in case).
		color = Math.max(0, color);
		color = Math.min(5, color);

		// Return style class for color.
		return app.beaconColorStyles[color];
	};

	app.showScreen = function(screenId)
	{
		// Hide current screen if set.
		if (app.currentScreenId != null)
		{
			$('#' + app.currentScreenId).hide();
		}

		// Show new screen.
		app.currentScreenId = screenId;
		$('#' + app.currentScreenId).show();
		document.body.scrollTop = 0;
	};

	app.showHomeScreen = function()
	{
		app.showScreen('id-screen-home');
	};

	app.onNavigateBack = function()
	{
		history.back();
	};

	// ------------- Initialisation ------------- //

	document.addEventListener('deviceready', onDeviceReady, false);

	app.showHomeScreen();

	// ------------- Return application object ------------- //

	return app;

})();
