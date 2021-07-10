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

$('.your-element').on('swipe', function(event, slick, direction){
  console.log(direction);
  // left
});
 
// On edge hit
$('.your-element').on('edge', function(event, slick, direction){
  console.log('edge was hit')
});
 
// On before slide change
$('.your-element').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  console.log(nextSlide);
});
