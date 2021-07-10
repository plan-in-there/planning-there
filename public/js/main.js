document.addEventListener("DOMContentLoaded", (event) => {

  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {     
      card.classList.toggle('card-active');
      card.classList.toggle('category-icons')

    })
  })

  document.querySelectorAll('.join-event').forEach(like => {
    like.addEventListener('click',() => {
      like.classList.toggle('join');
      like.classList.toggle('delete')
    })
  })

})

window.onload = () => {

$('.slider').on('swipe', function(event, slick, direction){
  console.log(direction);
  // left
});
 
// On edge hit
$('.slider').on('edge', function(event, slick, direction){
  console.log('edge was hit')
});
 
// On before slide change
$('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  console.log(nextSlide);
});

(function($) {
  $(document).ready(function() {
      $('.slider-hero').slick({
          dots: true,
          infinite: true,
          cssEase: 'linear',
          swipe: false,
      });
  });

})( jQuery );

$('.responsive').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

}
