$(document).ready(function() {
  // MOUSEWHEEL SCROLL TO ANCHOR
  $('#fullpage').fullpage({
    anchors:['first', 'second', 'third']
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

  window.addEventListener('scroll', console.log('Wheel!'));

  let body = document.querySelector('body');
  console.log(body.classList);

  function changeIndicator() {
    if (body.classList.contains('fp-viewing-first')) {
      $('#nav-indicator').css('top', "0%");
    } else if (body.classList.contains('fp-viewing-second')) {
      $('#nav-indicator').css('top', "33%");
    } else if (body.classList.contains('fp-viewing-third')) {
      $('#nav-indicator').css('top', "66%");
    } else {
      $('#nav-indicator').css('height', "100%");
    }
  }

  let fullPage = document.querySelector('#fullpage');
  let fullPagePosition = fullPage.style.transform;
  fullPage.addEventListener('transitionend', () => {
    console.log('Change!');
    changeIndicator();
  });
});
