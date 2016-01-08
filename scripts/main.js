TWH.dom = {
  journey: $('.journey'),
  menu: $('.menu'),
  nav: $('.nav'),
  navItems: $('.nav > a'),
  hambuger: $('.hamburger'),
  ham: $('.ham'),
  bur: $('.bur'),
  ger: $('.ger'),
  sash: $('.sash'),
  location: $('.location'),
  city: $('.city'),
  state: $('.state'),
  log: $('.log'),
  logo: $('.logo'),
  post: $('.post'),
  next: $('.next'),
  previous: $('.previous'),
  map: $('#map'),
  tinyBio: $('.tiny-bio')
};

TWH.init = function() {
  TWH.mapInit();
  TWH.checkHash();
  TWH.setLocation();
  TWH.listLocations();
  TWH.setMapLocation();
  TWH.setActivities();
};

TWH.initAnimationCallback = function(){
  if (TWH.tmp.activity || TWH.tmp.activity === 0) {
    TWH.openActivity();
    TWH.openPostSequence();
  } else if (TWH.tmp.content.id){
    TWH.setContent();
    TWH.openPostSequence();
  }

};

TWH.toggleMenu = function() {
  if (TWH.dom.menu.is('.open')) {
    $.Velocity.RunSequence(TWH.closeMenuSequence);
    TWH.dom.menu.removeClass('open');
        TWH.dom.journey.css('overflow-y', 'auto');
    ga('send', 'event', 'Navigation', 'Open Navigation');
  } else {
    TWH.dom.menu.addClass('open');
    TWH.dom.journey.css('overflow-y', 'hidden');
    $.Velocity.RunSequence(TWH.openMenuSequence);
    ga('send', 'event', 'Navigation', 'Close Navigation');
  }
};

TWH.checkHash = function(){
  if(window.location.hash) {
    var hash = window.location.hash.substr(1);
    // maybe look at validating...
    // if there is a location in the hash
    if(window.location.hash.indexOf('+') > -1){
      var hashLocation = hash.split('+', 3);
      var hashCity = hashLocation[0].replace(/-/g, ' ').toLowerCase();
      var hashState = hashLocation[1].replace(/-/g, ' ').toLowerCase();
      if (hashLocation[2]) {
        TWH.tmp.activity = parseInt(hashLocation[2]);
      }
      $.each(TWH.data.location, function(i, location){
        if (location.city.toLowerCase() === hashCity && location.state.toLowerCase() === hashState){
          TWH.tmp.location.id = i;
          return false;
        }
      });
    } else {
      // if the hash matches content
      if (TWH.data.site.sections.indexOf(hash) > -1) {
        $.each(TWH.data.site.content, function(i, content){
          if (content && content.title.toLowerCase().replace(' ', '-') === hash){
            TWH.tmp.content.id = i;
            return false;
          }
        });
      }
    }
  }
};

TWH.setContent = function(){
  TWH.makePost();
  TWH.dom.post.find('.title').text(TWH.data.site.content[TWH.tmp.content.id].title);
  TWH.dom.post.find('.content').html(TWH.data.site.content[TWH.tmp.content.id].body.replace(/\n/g, '<br>') );
};

TWH.setLocation = function() {
  TWH.dom.city.text(TWH.data.location[TWH.tmp.location.id].city + ', ');
  TWH.dom.state.text(TWH.data.location[TWH.tmp.location.id].state);
};

TWH.nextLocation = function() {
  if (TWH.tmp.location.id !== 0 && $('.open').length === 0 && $('.max').length === 0) {
    // load next location if possible
    $.Velocity.RunSequence(TWH.swipeRightSequence);
    TWH.tmp.location.id -= 1;
    TWH.writeHistory();
    TWH.setLocation();
    TWH.setActivities();
    TWH.setMapLocation();
  }
};

TWH.previousLocation = function() {
  if (TWH.tmp.location.id !== TWH.data.location.length - 1 && $('.open').length === 0 && $('.max').length === 0) {
    // load previous location if possible
    $.Velocity.RunSequence(TWH.swipeLeftSequence);
    TWH.tmp.location.id += 1;
    TWH.writeHistory();
    TWH.setLocation();
    TWH.setActivities();
    TWH.setMapLocation();

  }
};

TWH.selectLocation = function() {
  TWH.writeHistory();
  TWH.setLocation();
  TWH.setActivities();
  TWH.setMapLocation();
};

TWH.listLocations = function() {
  var list = $('<ul/>').addClass('location-list');

  $.each(TWH.data.location, function(i, location){
    var li = $('<li/>').addClass('listed-location').text(location.city + ', ' + location.state);
    list.append(li);
  });

  TWH.dom.sash.append(list);
};

TWH.setMapLocation = function(){
  TWH.map.setView(TWH.data.location[TWH.tmp.location.id].coordinates, 8);
};

TWH.setActivities = function() {
  TWH.dom.log.empty();
  if (TWH.data.location[TWH.tmp.location.id].activity) {
    $.each(TWH.data.location[TWH.tmp.location.id].activity, function(i, activity) {
      var li = $('<li></li>').addClass('activity');
      var expand = $('<div/>');
      expand.addClass('expand');
      li.append(expand);

      if (activity.type === 'blog') {
        var p = $('<p></p>');
        li.addClass('blog');
        p.text(activity.title);
        li.append(p);
      }
      if (activity.type === 'instagram') {
        li.addClass('instagram');
        li.css('background-image', 'url(' + activity.media + ')');
      }
      li.attr('data-id', i);
      TWH.dom.log.append(li);
    });

    TWH.dom.log.children().velocity('transition.expandIn', { stagger: 100, complete: function(){
      TWH.initAnimationCallback();
    }});
  }
};

TWH.openActivity = function() {
  if (TWH.tmp.activity || TWH.tmp.activity === 0) {
    if($('.activity:eq(' + TWH.tmp.activity + ')').is('.blog')){
      TWH.tmp.activityType = 'blog';
      TWH.makePost();
      TWH.openBlog();
    } else {
      TWH.tmp.activityType = 'instagram';
      TWH.makePost();
      TWH.openInstagram();
    }
  }
};

TWH.writeHistory = function() {
  if (TWH.tmp.content.id || TWH.tmp.content.id === 0) {
    TWH.tmp.content.title = TWH.tmp.content.hash.substr(1).charAt(0).toUpperCase() + TWH.tmp.content.hash.substr(1).slice(1);
    window.history.pushState( {}, TWH.tmp.content.title, TWH.tmp.content.hash );
  }
  else {
    TWH.tmp.location.title = TWH.data.location[TWH.tmp.location.id].city + ', ' + TWH.data.location[TWH.tmp.location.id].state;
    TWH.tmp.location.hash = '#' + TWH.data.location[TWH.tmp.location.id].city.replace(/ /g, '-').toLowerCase() + '+' + TWH.data.location[TWH.tmp.location.id].state.replace(/ /g, '-').toLowerCase();
    if (TWH.tmp.activity || TWH.tmp.activity === 0) {
      TWH.tmp.location.hash = TWH.tmp.location.hash + '+' + TWH.tmp.activity;
    }
    window.history.pushState( {}, TWH.tmp.location.title, TWH.tmp.location.hash );
  }

};

TWH.makePost = function() {
  TWH.dom.post.append('<header>');
  TWH.dom.post.addClass('open');
  TWH.dom.post.append($('<div/>').addClass('logomark'));
  TWH.dom.post.append($('<div/>').addClass('close'));
  if (TWH.tmp.activityType === 'instagram') {
    TWH.dom.post.addClass('post--' + TWH.tmp.activityType);
    TWH.dom.post.append($('<div/>').addClass('media'));
    TWH.dom.post.append($('<div/>').addClass('description'));
  } else {
    TWH.dom.post.addClass('post--blog');
    TWH.dom.post.append($('<div/>').addClass('title'));
    TWH.dom.post.append($('<div/>').addClass('content'));
  }

};

TWH.openInstagram = function() {
  TWH.writeHistory();
  var img = $('<img/>').attr('src', TWH.data.location[TWH.tmp.location.id].activity[TWH.tmp.activity].media);
  TWH.dom.post.find('.media').append(img);
  TWH.dom.post.find('.description').html(TWH.data.location[TWH.tmp.location.id].activity[TWH.tmp.activity].description.replace(/\n/g, '<br>') );
};

TWH.openBlog = function() {
  TWH.writeHistory();
  TWH.dom.post.find('.title').text(TWH.data.location[TWH.tmp.location.id].activity[TWH.tmp.activity].title);
  TWH.dom.post.find('.content').html(TWH.data.location[TWH.tmp.location.id].activity[TWH.tmp.activity].content.replace(/\n/g, '<br>') );
};

TWH.clearContent = function() {
  TWH.tmp.content.title = null;
  TWH.tmp.content.id = null;
  TWH.tmp.content.hash = null;
};

TWH.closePost = function(){
  TWH.tmp.activity = null;
  TWH.clearContent();
  TWH.writeHistory();
  TWH.dom.post.removeClass('post--' + TWH.tmp.activityType);
  TWH.tmp.activityType = null;
  TWH.dom.post.removeClass('open');
  TWH.dom.post.empty();
};

TWH.mapInit = function (){
  L.mapbox.accessToken = TWH.data.mapbox.accessToken;
  TWH.map = L.mapbox.map('map', TWH.data.mapbox.mapId, {
    zoomControl: false
  });
  // Disable drag and zoom handlers.
  TWH.map.dragging.disable();
  TWH.map.touchZoom.disable();
  TWH.map.doubleClickZoom.disable();
  TWH.map.scrollWheelZoom.disable();
};

TWH.init();
