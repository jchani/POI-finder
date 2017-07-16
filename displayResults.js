    var numResults = 0;
    var resultsList;
    

    function processResults(results, status, pagination) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            resultsList += createMarker(results[i]);
            numResults++;
          }
        if(pagination.hasNextPage){
          pagination.nextPage();
        }
        populateResults(resultsList);
      }
    }

    function createMarker(place) {

      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
      });

      $('#count').text('Number of results: ' + numResults);

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);

      });
      
      return '<tr><td>' + place.types[0] + "</td><td>" + place.name + '</td></tr>';
    }
    
    function populateResults(list){
      placesList = document.getElementById('results');
      placesList.innerHTML = list + "</table>";
    }
    

