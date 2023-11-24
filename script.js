const $counters = document.querySelectorAll('.counter');

$counters.forEach(($counter) => {
    $counter.innerText = '0';
    const updateCounter = () => {
        const target = Number($counter.getAttribute('data-target'));
        const count = Number($counter.innerText);
        const increment = target / 200;
        if (count < target) {
            $counter.innerText = `${Math.ceil(count + increment)}`;
            setTimeout(updateCounter, 20);
        } else {
            $counter.innerText = target;

            // Dodaj efekt konfetti i emotki twarzy z konfetii po osiągnięciu 1000
            if (target >= 1000) {
                celebrate();
            }
        }
    };
    updateCounter();
});

function celebrate() {
    const confettiSettings = { target: 'my-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    // Dodaj emotki twarzy z konfetii
    const celebrationContainer = document.querySelector('.containersub');
    celebrationContainer.innerHTML += '<div class="emoji">🎉😊🎉</div>';
};

$(document).ready(function() {
    $(window).scroll(function() {
      if(this.scrollY > 20) {
        $('.navbar').addClass("sticky");
      } else {
        $('.navbar').removeClass("sticky");
      }
      if(this.scrollY > 500) {
        $('.scroll-up-btn').addClass("show");
      } else {
        $('.scroll-up-btn').removeClass("show");
      }
    })
  
    $('.scroll-up-btn').click(function() {
      $('html').animate({scrollTop: 0});
    })
    
    $('.menu-btn').click(function() {
      $('.navbar .menu').toggleClass("active");
      $('.menu-btn i').toggleClass("active");
    })
  
    var typed = new Typed('.typing', {
      strings: [
        "łatwy w użyciu",
        "stworzony z miłości",
        "fajny",
        "uniwersalny",
        "wielo funkcyjny",
        "nowoczesny",
      ],
      typeSpeed: 120,
      backSpeed: 80,
      loop: true,
    })
  
    // this is really cool
    // but you should vote Mikuni first
  
    $('.carousel').owlCarousel({
      margin: 20,
      loop: true,
      autoplayTimeOut: 2000,
      autoplayHoverPause: true,
      responsive: {
        0:{
          items: 1,
          nav: false
        },
        600:{
          items: 2,
          nav: false
        },
        1000:{
          items: 3,
          nav: false
        }
      }
    });
  
  });
  
  
