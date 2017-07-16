  var map;
  var infowindow;

    function getLatLong(callback, address) {
      //if address not supplied, use default value 'Oak Street, San Francisco, USA'
      address = address || 'Oak Street, San Francisco, USA';
      //initialize the Geocoder
      geocoder = new google.maps.Geocoder();
      if (geocoder) {
          geocoder.geocode({
              'address': address
          }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK){
                  initialize(results[0]);
              }
          });
      }
    }

   function initialize(geoObj) {
      var lat = geoObj.geometry.location.lat();
      var lng = geoObj.geometry.location.lng();

      var pos = new google.maps.LatLng(lat, lng);
      var center = new google.maps.LatLng(lat, lng);
                
      map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: center,
        zoom: 14,
        streetViewControl: false,
        panControl: false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      });

      var request = {
        location: pos,
        radius: document.getElementById('range').value,
        types: []
      };

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      resultsList = "<table>"; //overwrites resultsList of previous API call (if it exists)
      service.nearbySearch(request, processResults);
    }


getLatLong(initialize, "");

var button = document.getElementById('btn');

button.addEventListener("click", function () {
    var address = document.getElementById('address').value;
    getLatLong(initialize, address);
});


