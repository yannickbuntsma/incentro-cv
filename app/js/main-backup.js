$(document).ready(function() {
  // $('#fullpage').fullpage({
  //   anchors:['first', 'second', 'third']
  // });

  let scrollSpeed = 800; // in milliseconds
  // Add smooth scrolling to all links
  $("a").on("click", function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      let hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        scrollSpeed,
        function() {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });

  // MENU LINK HIGHLIGHTING
  let navIndicator = document.querySelector("#nav-indicator");

  window.addEventListener('scroll', () => {
    let viewportOffset = document.querySelector('#home').getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    let top = viewportOffset.top;

    let navIndicatorPosition = (Math.ceil(-top) / window.innerHeight) * (100 / 3) + (33 / 3);
    navIndicatorPosition = Math.floor(navIndicatorPosition / 33);

    if(navIndicatorPosition === -1) {
      return navIndicatorPosition === 0;
    }
    navIndicator.style.top = navIndicatorPosition * 33 + "%";
  });

  // MOUSEWHEEL SCROLL TO ANCHOR
  let wheelDistance = function(evt){
    if (!evt) evt = event;
    let w = evt.wheelDelta, d = evt.detail;
    if (d){
      if (w) return w/d/40*d>0?1:-1; // Opera
      else return -d/3;              // Firefox;         TODO: do not /3 for OS X
    } else return w/120;             // IE/Safari/Chrome TODO: /3 for Chrome OS X
  };

  let wheelDirection = function(evt){
    if (!evt) evt = event;
    return (evt.detail<0) ? 1 : (evt.wheelDelta>0) ? 1 : -1;
  };

    let delay = false;


  $(document).on('wheel DOMMouseScroll touchmove', function(event) {
      event.preventDefault();
      event.stopPropagation();
      if(delay) return;

      delay = true;
      setTimeout(function(){delay = false}, 200);
      // let wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;

      let i = 0;

      let a = document.getElementsByTagName('section');
      if(wheelDistance() < 0) {
        for(i = 0 ; i < a.length ; i++) {
          let t = a[i].getClientRects()[0].top;
          if(t >= 10) break;
        }
      }
      else {
        for(i = a.length-1 ; i >= 0 ; i--) {
          let t = a[i].getClientRects()[0].top;
          if(t < -10) break;
        }
      }
      if(i >= 0 && i < a.length) {
        $('html,body').animate({
          scrollTop: a[i].offsetTop
        });
      }
    // console.log(event);
    $(document).on('scroll', console.log(wheelDistance()));
  });
});
