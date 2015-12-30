var TWHa = TWHa || {};

TWHa.accessToken = '19913938.1677ed0.2cd8214466374c50a27b63591c849384';
TWHa.googleApiKey = 'AIzaSyDD6eBpLkJh6xlynBt3RWonp0R3XHUgYsY';
TWHa.maxId = '1100264030770086512_2238683119';
TWHa.fetchLocation = function(city, state) {
  var address = city.replace(' ', '+') + ',' + state;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      var location = {};
      var latLong = [];
      location.city = city.charAt(0).toUpperCase() + city.slice(1);
      location.state = $('.location-state option[value=' + state + ']').text();
      latLong.push(results[0].geometry.location.lat());
      latLong.push(results[0].geometry.location.lng());
      location.coordinates = latLong;
      if ($('.instagram-json').val() !== ''){
        location.activity = JSON.parse($('.instagram-json').val());
      }
      $('.location-json').val(JSON.stringify(location, null, 2));
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
};
TWHa.fetchFeed = function (id, count){
  var url = 'https://api.instagram.com/v1/users/' + id + '/media/recent';
  $.ajax({
    url: url,
    dataType: 'jsonp',
    type: 'GET',
    data: {'access_token': TWHa.accessToken, 'count': count},
    success: function(data){
      for (var x in data.data) {
        var post = {};
        post.type = 'instagram';
        post.thumbnail = data.data[x].images.thumbnail.url;
        post.media = data.data[x].images.standard_resolution.url;
        post.description = data.data[x].caption.text;
        console.log(data.data[x].id);
        if ($('.instagram-json').val()) {
          $('.instagram-json').val($('.instagram-json').val() + ',\n' + JSON.stringify(post, null, 2));
        } else {
          $('.instagram-json').val(JSON.stringify(post, null, 2));
        }
      }
    },
    error: function(data) {
      console.log(data);
    }
  });
};

$('.instagram-fetch').click(function() {
  $('.instagram-json').val('').css('display', 'block');
  TWHa.fetchFeed($('.instagram-id').val(), $('.instagram-count').val());
});

$('.location-fetch').click(function() {
  $('.location-json').val('').css('display', 'block');
  TWHa.fetchLocation($('.location-city').val(), $('.location-state').val());
});
