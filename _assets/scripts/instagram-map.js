/*eslint-disable */
TWH.fetchFeed = function (url){
  if (!url) {
    url = 'https://api.instagram.com/v1/users/' + TWH.tmp.userId + '/media/recent';
  }
  $.ajax({
      url: url,
      dataType: 'jsonp',
      type: 'GET',
      data: {'access_token': TWH.tmp.accessToken, 'count': TWH.tmp.count},
      success: function(data){
          // iterate over media
          for(var x in data.data){
            if (data.data[x].location){
              // TWH.createFeature(data.data[x].images.thumbnail.url, data.data[x].images.standard_resolution.url, data.data[x].location.latitude, data.data[x].location.longitude, data.data[x].caption.text);
              console.log("thumbnail:\n" + data.data[x].images.thumbnail.url + "\n\nmedia:\n" + data.data[x].images.standard_resolution.url + "\n\ncoordinates:\n" + [data.data[x].location.latitude, data.data[x].location.longitude] + "\n\ndescription:\n" + data.data[x].caption.text)
            }
          }

          TWH.tmp.nextUrl = data.pagination.next_url;
          TWH.loadInstagramLayer();
      },
      error: function(data){
          console.log(data);
      }
  });
};

TWH.loadInstagramLayer = function() {
  var instagramLayer = L.mapbox.featureLayer().addTo(TWH.map);
  instagramLayer.setGeoJSON(TWH.tmp.geojson);
  instagramLayer.on('click', function(e) {
      e.layer.openPopup();
  });
};

TWH.mapInit = function (){
  L.mapbox.accessToken = 'pk.eyJ1IjoianVzdGluc2FuZTk4IiwiYSI6ImI4YTcyNGVjZTQ4MDkyMWMzM2ViMTRjNDUyNTkxNjc3In0.BOIAKq15wYz4knM2knUjGA';
  TWH.map = L.mapbox.map('map', 'justinsane98.c693152d', {
    zoomControl: false
  }).setView([32.28604740286858, -106.7874889820877], 7);
  // Disable drag and zoom handlers.
  TWH.map.dragging.disable();
  TWH.map.touchZoom.disable();
  TWH.map.doubleClickZoom.disable();
  TWH.map.scrollWheelZoom.disable();
}
