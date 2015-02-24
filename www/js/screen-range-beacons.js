// Range beacons screen.
;(function(app)
{

var found = false;
var yourBeacon;
var allBeacons=[];



beaconFound = function(beacon,text){
	if ((beacon.major ==33613) && (beacon.minor == 1285) && !found)
	{	
		window.alert(text);
		found = true;
		yourBeacon = beacon;
	}
};

isBeaconLost = function(beacon,beaconInfo){
  
  lost = true;

  window.alert(beaconInfo.beacons.length);

  for(var i=0;i < beaconInfo.beacons.length;i++){

  	if (beaconInfo.beacons[i].major===beacon.major){
  		lost = false;
  	}
  };
  return lost;
};


	app.startRangingBeacons = function()
	{
		function onRange(beaconInfo)
		{
			displayBeconInfo(beaconInfo);
		}

		function onError(errorMessage)
		{
			console.log('Range error: ' + errorMessage);
		}

		function displayBeconInfo(beaconInfo)
		{
			// Clear beacon HTML items.
			$('#id-screen-range-beacons .style-item-list').empty();

			// Sort beacons by distance.
			beaconInfo.beacons.sort(function(beacon1, beacon2) {
				return beacon1.distance > beacon2.distance; });
     
      window.alert(beaconInfo.beacons.length);
    	// if ((found) && (isBeaconLost(yourBeacon,beaconInfo))
    	// {
    	// 	window.alert('I lost you');
    	// 	// found = false;
    	// };   


			// Generate HTML for beacons.
			$.each(beaconInfo.beacons, function(key, beacon)
			{
				var element = $(createBeaconHTML(beacon));
				$('#id-screen-range-beacons .style-item-list').append(element);


			});
		};

		function createBeaconHTML(beacon)
		{


			var colorClasses = app.beaconColorStyle(beacon.color);

      beaconFound(beacon,"ole");


			var htm = '<div class="' + colorClasses + '">'
				+ '<table><tr><td>Major</td><td>' + beacon.major
				+ '</td></tr><tr><td>Minor</td><td>' + beacon.minor
				+ '</td></tr><tr><td>RSSI</td><td>' + beacon.rssi
			if (beacon.proximity)
			{
				htm += '</td></tr><tr><td>Proximity</td><td>'
					+ app.formatProximity(beacon.proximity)
			}
			if (beacon.distance)
			{
				htm += '</td></tr><tr><td>Distance</td><td>'
					+ app.formatDistance(beacon.distance)
			}
			htm += '</td></tr></table></div>';
			return htm;
		};

		// Show screen.
		app.showScreen('id-screen-range-beacons');
		$('#id-screen-range-beacons .style-item-list').empty();

		// Request authorisation.
		estimote.beacons.requestAlwaysAuthorization();

		// Start ranging.
		estimote.beacons.startRangingBeaconsInRegion(
			{}, // Empty region matches all beacons.
			onRange,
			onError);
	};

	app.stopRangingBeacons = function()
	{
		estimote.beacons.stopRangingBeaconsInRegion({});
		app.showHomeScreen();
	};

})(app);
