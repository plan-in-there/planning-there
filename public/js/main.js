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

  

  setInterval(() => {
    const elements = location.href.split('/')
    const chatId = elements[elements.length - 1]
  
    .then(result =>  console.log(this.chatId))
  }, 3000)

  button.addEventListener('click', () => {
   
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

