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

