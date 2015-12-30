TWH.dom.menu.on('tap', function(){
  TWH.toggleMenu();
});

TWH.dom.post.on('tap', '.close', function(){
  TWH.closePost();
  TWH.dom.journey.css('overflow-y', 'auto');
  TWH.closePostSequence();
  ga('send', 'event', 'Navigation', 'Close Post');
});

TWH.dom.navItems.on('tap', function(){
  var $navItem = $(this);
  TWH.dom.menu.removeClass('open');
  TWH.tmp.content.id = $navItem.index();
  TWH.tmp.content.hash = $navItem.attr('href');
  if(TWH.tmp.content.id === 0){
    TWH.tmp.location.id = TWH.data.location.length - 1;
    TWH.setLocation();
    TWH.setActivities();
    TWH.setMapLocation();
    $.Velocity.RunSequence(TWH.openFirstNavItemSequence);
    TWH.tmp.content.id = null;
    TWH.dom.journey.css('overflow-y', 'auto');
  } else {
    TWH.setContent();
    $.Velocity.RunSequence(TWH.openNavItemSequence);
  }
  TWH.writeHistory();
  ga('send', 'pageview', TWH.tmp.content.hash);
});

TWH.dom.journey.on('swipeleft', function(){
  TWH.previousLocation();
}).on('swiperight', function(){
  TWH.nextLocation();
});

TWH.dom.next.on('tap', function(){
  TWH.nextLocation();
  ga('send', 'pageview', TWH.tmp.location.hash);
});

TWH.dom.previous.on('tap', function(){
  TWH.previousLocation();
  ga('send', 'pageview', TWH.tmp.location.hash);
});


TWH.dom.journey.on('scroll', function() {
  if (this.scrollTop > 125) {
    if($('.fixed').length === 0){
      $.Velocity.RunSequence(TWH.showHeaderSequence);
    }
    TWH.dom.journey.addClass('fixed');
  } else {
    TWH.dom.journey.removeClass('fixed');
  }

});


////////////////////////////////////////////////////////////////////////////////
// Events on dynamic elements
////////////////////////////////////////////////////////////////////////////////
TWH.dom.log.on('tap', '.expand', function() {
  if($('.velocity-animating').length === 0){
    var $elem = $(this).parent();
    $elem.velocity({p: {scale: .5}, o: {duration: 100}});
    $elem.velocity({p: {scale: 1, opacity: 1}, o: {duration: 0}});
    TWH.tmp.activity = $elem.data('id');
    TWH.openActivity();
    TWH.dom.journey.css('overflow-y', 'hidden');
    TWH.openPostSequence();
  }
});
