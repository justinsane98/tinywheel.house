TWH.openMenuSequence = [
    { e: TWH.dom.ham, p: { rotateZ: '45deg', translateX: '3', translateY: '4'}, o: { duration: 100 } },
    { e: TWH.dom.ger, p: { rotateZ: '-45deg', translateX: '3', translateY: '-4px'}, o: { duration: 100, sequenceQueue: false} },
    { e: TWH.dom.bur, p: { width: '0'}, o: { duration: 100, sequenceQueue: false} },
    { e: TWH.dom.nav, p: { width: '100%', height: '100%', top: 0, right: 0 }, o: { duration: 300 } },
    { e: TWH.dom.navItems, p: 'transition.slideLeftIn', o: { duration: 100, stagger: 50, display: 'block'} },
    { e: TWH.dom.tinyBio, p: 'transition.fadeIn', o: {duration: 100}}
];

TWH.closeMenuSequence = [
    { e: TWH.dom.tinyBio, p: 'transition.fadeOut', o: {duration: 50}},
    { e: TWH.dom.navItems, p: 'transition.slideLeftOut', o: { duration: 50, stagger: 50, display: 'block'} },
    { e: TWH.dom.nav, p: { width: 0, height: 0, top: '-40px', right: '-40px'}, o: { duration: 50 } },
    { e: TWH.dom.nav, p: 'callout.pulse', o: { duration: 100 } },
    { e: TWH.dom.ham, p: { rotateZ: '0deg', translateX: '0', translateY: '0'}, o: { duration: 50 } },
    { e: TWH.dom.ger, p: { rotateZ: '0deg', translateX: '0', translateY: '0'}, o: { duration: 50, sequenceQueue: false} },
    { e: TWH.dom.bur, p: { width: 21}, o: { duration: 50, sequenceQueue: false} }
];

TWH.openNavItemSequence = [
  { e: TWH.dom.navItems, p: 'transition.slideLeftOut', o: { duration: 30, stagger: 30, display: 'block'} },
  { e: TWH.dom.nav, p: { width: '100%', height: '100%'}, o: { duration: 50} },
  { e: TWH.dom.nav, p: { width: 0, height: 0, top: '-40px', right: '-40px'}, o: { duration: 50 } },
  { e: TWH.dom.nav, p: 'callout.pulse', o: { duration: 100, complete: function(){
    TWH.openPostSequence();
  }} },
  { e: TWH.dom.ham, p: { rotateZ: '0deg', translateX: '0', translateY: '0'}, o: { duration: 50, sequenceQueue: false} },
  { e: TWH.dom.ger, p: { rotateZ: '0deg', translateX: '0', translateY: '0'}, o: { duration: 50, sequenceQueue: false} },
  { e: TWH.dom.bur, p: { width: 21}, o: { duration: 50, sequenceQueue: false} }
];

TWH.openFirstNavItemSequence = [
  { e: TWH.dom.navItems, p: 'transition.slideLeftOut', o: { duration: 30, stagger: 30, display: 'block'} },
  { e: TWH.dom.nav, p: { width: '100%', height: '100%'}, o: { duration: 50} },
  { e: TWH.dom.nav, p: { width: 0, height: 0, top: '-40px', right: '-40px' }, o: { duration: 50 } },
  { e: TWH.dom.nav, p: 'callout.pulse', o: { duration: 100 } },
  { e: TWH.dom.ham, p: { rotateZ: '0deg', translateX: '0', translateY: '0'}, o: { duration: 50, sequenceQueue: false} },
  { e: TWH.dom.ger, p: { rotateZ: '0deg', translateX: '0', translateY: '0'}, o: { duration: 50, sequenceQueue: false} },
  { e: TWH.dom.bur, p: { width: 21}, o: { duration: 50, sequenceQueue: false} }
];

TWH.swipeLeftSequence = [
    { e: TWH.dom.location, p: {'text-indent': '1000px'}, o: { duration: 0} },
    { e: TWH.dom.location, p: {'text-indent': '0'}, o: { duration: 300} }
];

TWH.swipeRightSequence = [
  { e: TWH.dom.location, p: {'text-indent': '-1000px'}, o: { duration: 0} },
  { e: TWH.dom.location, p: {'text-indent': '0'}, o: { duration: 300} }
];
TWH.showHeaderSequence = [
  { e: $('.logomark'), p: 'transition.slideDownBigIn', o: { duration: 100} }
];

// yeah dynamic elements!
TWH.closePostSequence = function() {
  TWH.dom.post.velocity({p: {'opacity': 0, 'width': 0, 'height': 0, 'top': '50%', 'left': '50%'}, o: {duration: 100}});
};

TWH.openPostSequence = function() {
  TWH.dom.post.velocity({p: {'opacity': 1, 'width': '100%', 'height': '100%', 'top': 0, 'left': 0}, o: {duration: 100, complete: function(){
    $('.post .logomark').velocity('transition.slideDownBigIn', 100);
    $('.post .close').velocity('transition.expandIn', 100);
  }}});
};
